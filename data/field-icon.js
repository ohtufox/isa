(function(fieldIcon, undefined) {
    const STATUS_FLAGS = {
        'TARGET_UNDETERMINED': 'neutral',
        undefined: 'neutral',
        'No info available': 'neutral',
        'Secure': 'good',
        'Insecure': 'bad',
        'Broken state': 'bad'
    };
    let icons;
    let httpStatus = "";
    let preferences;

    // Initialize fieldIcon with data inside an object
    // data.icon(.bad|.eyeclosed|.eyeopen): source of the icon.
    // data.httpStatus: "HTTP"|"HTTPS", if the page itself is secure
    // data.preferences: map of addon settings
    fieldIcon.init = function(data) {
        icons = data.icon;
        httpStatus = data.httpStatus;
        preferences = data.preferences;
    }

    // Add icon to password field
    // element: password field
    // payload: 
    fieldIcon.add = function(element, payload) {
        let imgi = document.createElement("img");
        checkPreferences();
        recursiveZIndex(element, imgi);
        addPanelListener(element, imgi);
        let securityStatus = checkSecurityStatus(element, payload, imgi);
        processSecurityStatus(element, imgi, securityStatus);
    }

    function requestUnsecurePanel() {
            self.port.emit('info', 'unsecure-panel');
    }

    function recursiveZIndex(field, icon) {
        let element = field;
        while (element !== document.body) {
            let zInd = document.defaultView.getComputedStyle(element, null).zIndex;
            if (zInd !== "auto" && zInd !== "") {
                // NOTE: getComputerStyle() converts large enough numeric values to lossy e-notation, which is quite bad.
                // (see http://jsfiddle.net/8yX85/2/ )
                if (parseFloat(zInd) < 10000000) {
                    icon.style.zIndex = parseFloat(zInd);
                } else {
                    icon.style.zIndex = parseFloat(zInd) + 10000;
                }
                return;
            }
            element = element.parentNode;
        }
    }

    // Override icons with custom icons from preferences.
    function checkPreferences() {
        if (preferences.enableCustomIcons) {
            if (preferences.iconWarning != undefined) {
                icons.bad = preferences.iconWarning;
            }
            if (preferences.iconShow != undefined) {
                icons.eyeclosed = preferences.iconShow;
                icons.eyeopen = preferences.iconShow;
            }
        }

    }

    function checkSecurityStatus(element, payload, imgi) {
        if (httpStatus == "HTTPS") {
            if (payload.checkTarget) {
                return STATUS_FLAGS[payload.state];
            } else {
                console.log('Warning! Test settings in use, target page will not be checked!');
                return 'good';
            }
        } else {
            return 'bad';
        }
    }

    function processSecurityStatus(element, imgi, status) {
        switch (status) {
            case undefined:
                console.log('securityStatus completely undefined, something is wrong.');
            case 'neutral':
                if (preferences.disableUndetermined) {
                    break;
                }
            case 'good':
                if (preferences.passwordPeek) {
                    addPeekingEye(element, imgi);
                    positionIcon(element, imgi);
                    addResizeListener(element, imgi);
                }
                break;
            case 'bad':
                addWarningIcon(element, imgi);
                positionIcon(element, imgi);
                addResizeListener(element, imgi);
        }
    }

    function positionIcon(element, imgi) {
        imgi.id = 'isa-field-icon ' + element.id;
        imgi.style.position = 'absolute';

        let _body = document.getElementsByTagName('body')[0];
        _body.appendChild(imgi);

        let rect = element.getBoundingClientRect();
        let height = rect.bottom - rect.top;
        // If the page is scrolled when its loaded we need to take into account the offset
        // XXX: What happens if the page is scrolled but password field has fixed position?
        imgi.style.left = window.pageXOffset + rect.right - height + 'px';
        imgi.style.top = window.pageYOffset + rect.top + 'px';

        let size = height;
        imgi.style.width = size + 'px';
    }

    function addResizeListener(element, imgi) {
        window.addEventListener('resize', function(e) {
            let rect = element.getBoundingClientRect();
            let height = rect.bottom - rect.top;
            imgi.style.left = window.pageXOffset + rect.right - height + 'px';
            imgi.style.top = window.pageYOffset + rect.top + 'px';
        });
    }

    function addPanelListener(element, imgi) {
        imgi.addEventListener('mousedown', function(e) {
            if (httpStatus !== "HTTPS") {
                imgi.className = "anchorclass";
                e.preventDefault();
                requestUnsecurePanel();
            }
        });
    }

    function addWarningIcon(element, imgi) {
        imgi.style.visibility = 'hidden';
        imgi.title = 'form is unsecure, click icon for more info';
        imgi.setAttribute('src', icons.bad);
        displayOnFocus(element, imgi);
        let previousElement = previousField(element);
        if (previousElement !== undefined) {
            displayOnFocus(previousElement, imgi);
        }
    }

    function displayOnFocus(element, target) {
        element.addEventListener('focus', function(e) {
            target.style.visibility = "visible";
        });

        element.addEventListener('blur', function(e) {
            target.style.visibility = "hidden";
        });

        if (document.activeElement === element) {
            target.style.visibility = "visible";
        }
    }

    function addPeekingEye(element, imgi) {
        if (preferences.passwordPeek) {
            imgi.title = 'show password';
            imgi.setAttribute('src', icons.eyeclosed);
            imgi.style.visibility = 'hidden';
            displayOnFocus(element, imgi);
            addEyeAnimation(imgi);
            showPwd.addMouseDownPeekListener(imgi, element);
        }
    }

    function addEyeAnimation(element) {
        element.addEventListener('mousedown', function(e) {
            element.setAttribute('src', icons.eyeopen);
        });

        element.addEventListener('mouseup', function(e) {
            element.setAttribute('src', icons.eyeclosed);
        });
        element.addEventListener('mouseleave', function(e) {
            element.setAttribute('src', icons.eyeclosed);
        });
    }

    function previousField(element) {
        let fields = document.getElementsByTagName("input");
        for (let i = 0; i < fields.length; i++) {
            if (fields[i] === element && i > 0) {
                if (element.form === fields[i - 1].form) {
                    return fields[i - 1];
                }
            }
        }
    }

}(window.fieldIcon = window.fieldIcon || {}));

(function(fieldIcon, undefined){
    let icons;
    let httpStatus = "";
    let preferences;

    fieldIcon.init = function(data) {
        icons = data.icon;
        httpStatus = data.httpStatus;
        preferences = data.preferences;
    }
    
    fieldIcon.requestUnsecurePanel = function() {
        if(settingsChecker.httpsPageExists()) {
            self.port.emit('info', 'unsecure-panel-with-redirect');
        } else {
            self.port.emit('info', 'unsecure-panel');
        }
    }

    function recursiveZIndex(field, icon) {
        let element = field;
        while (element !== document.body) {
            let zInd = document.defaultView.getComputedStyle(element,null).zIndex;
            if (zInd !== "auto" && zInd !== "") {
                // THANK YOU JAVASCRIPT.. http://jsfiddle.net/8yX85/2/
                // Yes. This would still break if there are elements
                // with z-index 10000001 and 100000003 where second one doesnt have
                // password field and is on top of the first one.
                if (parseFloat(zInd) < 10000000) {
                    icon.style.zIndex = parseFloat(zInd);
                } else {
                    icon.style.zIndex = parseFloat(zInd)+10000;
                }
                return;
            }
            element = element.parentNode;
        }
    }

    fieldIcon.add = function(element) {
        if(preferences.iconWarning != undefined) {
            icons.bad = preferences.iconWarning;
        }
        if(preferences.iconShow != undefined) {
            icons.eyeclosed = preferences.iconShow;
            icons.eyeopen = preferences.iconShow;
        }

        let imgi=document.createElement("img");
        recursiveZIndex(element, imgi);

        addPanelListener(element, imgi);
        if (httpStatus == "HTTPS") {
            // Secure site, display clickable eye icon.
            if(preferences.passwordPeek) {
                addPeekingEye(element, imgi);
            }
        } else {
            addWarningIcon(element, imgi);
        }

        imgi.id = 'isa-field-icon ' + element.id;
        imgi.style.position = 'absolute';

        let _body = document.getElementsByTagName('body') [0];
        _body.appendChild(imgi);

        let rect = element.getBoundingClientRect();
        let height = rect.bottom - rect.top;
        // If the page is scrolled when its loaded we need to take into account the offset
        imgi.style.left = window.pageXOffset + rect.right-height + 'px';
        imgi.style.top = window.pageYOffset + rect.top + 'px';
        
        let size = height;
        imgi.style.width = size + 'px';

        window.addEventListener('resize', function(e) {
            let rect = element.getBoundingClientRect();
            let height = rect.bottom - rect.top;
            imgi.style.left = window.pageXOffset + rect.right-height + 'px';
            imgi.style.top = window.pageYOffset + rect.top + 'px';
        });
    }
    
    function addPanelListener(element, imgi) {
        imgi.addEventListener('mousedown', function(e) {
            if(httpStatus !== "HTTPS") {
                imgi.className = "anchorclass";
                e.preventDefault();
                fieldIcon.requestUnsecurePanel();
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
        imgi.setAttribute('src', icons.eyeclosed);
        imgi.style.visibility = 'hidden';
        displayOnFocus(element, imgi);
        addEyeAnimation(imgi);
        showPwd.addMouseDownPeekListener(imgi, element);
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
                if (element.form === fields[i-1].form) {
                    return fields[i-1];
                }
            }
        }
    }

}(window.fieldIcon = window.fieldIcon || {}));

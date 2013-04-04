(function(fieldIcon, undefined){
    let icons;
    let httpStatus = "";
    let preferences;

    fieldIcon.init = function(data) {
        icons = data.icon;
        httpStatus = data.httpStatus;
        preferences = data.preferences;
    }

    fieldIcon.displayOnFocus = function(element, target) {
        element.addEventListener('focus', function(e) {
            target.style.visibility = "visible";
        });

        element.addEventListener('blur', function(e) {
            target.style.visibility = "hidden";
        });
    }

    function insertAfter(referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    fieldIcon.closePanel = function() {
        setTimeout(function() {
            self.port.emit('close-panel');
        }, 3000);        
    }

    fieldIcon.add = function(element, time) {
        let imgi=document.createElement("img");
        imgi.style.position = 'absolute';

        let _body = document.getElementsByTagName('body') [0];
        _body.appendChild(imgi);

        if (httpStatus == "HTTPS") {
            // Secure site, display clickable eye icon.
            if(preferences.passwordPeek) {
                displayPeekingEye(element, imgi);
            }
        } else {
            // Unsecure site, display warning icon.
            imgi.setAttribute('src', icons.bad);
            // ADD INFOPANEL LISTENER HERE
            imgi.className += " anchorclass";
            imgi.addEventListener('click', function(e) { 
                if(httpStatus == "HTTPS" && element.value.length >0) {            
                    settingsChecker.isPasswordPeekedBefore(element, time);
                    //closePanel();
                } 
                if(httpStatus !== "HTTPS") {
                    self.port.emit('info', 'This is insecure form.');
                    fieldIcon.closePanel();                
                }
                element.focus();
            });
        }

        // Position the icon
        let rect = element.getBoundingClientRect();
        let height = rect.bottom - rect.top;
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

    function displayPeekingEye(element, imgi) {
        imgi.setAttribute('src', icons.eyeclosed);
        imgi.style.visibility = 'hidden';
        fieldIcon.displayOnFocus(element, imgi);
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

}(window.fieldIcon = window.fieldIcon || {}));

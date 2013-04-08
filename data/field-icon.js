(function(fieldIcon, undefined){
    let icons;
    let httpStatus = "";
    let preferences;

    fieldIcon.init = function(data) {
        icons = data.icon;
        httpStatus = data.httpStatus;
        preferences = data.preferences;
    }

    fieldIcon.closePanel = function() {
        setTimeout(function() {
            self.port.emit('close-panel');
        }, 3000);        
    }

    fieldIcon.add = function(element) {
        let imgi=document.createElement("img");

        addPanelListener(element, imgi);
        if (httpStatus == "HTTPS") {
            // Secure site, display clickable eye icon.
            if(preferences.passwordPeek) {
                addPeekingEye(element, imgi);
            }
        } else {
            addWarningIcon(element, imgi);
        }

        imgi.id = 'isa-field-icon';
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
            imgi.addEventListener('click', function(e) { 
                if(httpStatus !== "HTTPS") {
                    imgi.className = "anchorclass";
                    e.preventDefault();
                    self.port.emit('info', 'This is insecure form.');
                    fieldIcon.closePanel();                
                }
            });
    }

   function addWarningIcon(element, imgi) {
            imgi.setAttribute('src', icons.bad);
   }

   function  displayOnFocus(element, target) {
        element.addEventListener('focus', function(e) {
            target.style.visibility = "visible";
        });

        element.addEventListener('blur', function(e) {
            target.style.visibility = "hidden";
        });
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

}(window.fieldIcon = window.fieldIcon || {}));

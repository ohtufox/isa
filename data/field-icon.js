(function(fieldIcon, undefined){
    let sitestatus = "";

    fieldIcon.init = function(status) {
        sitestatus = status;
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
        imgi.setAttribute('src', sitestatus.eye);
        imgi.style.position = 'absolute';

        let _body = document.getElementsByTagName('body') [0];
        _body.appendChild(imgi);

        if (sitestatus.httpstatus == "HTTPS") {
            // Secure site, display clickable eye icon.
            imgi.setAttribute('src', sitestatus.eye);
            imgi.style.visibility = "hidden";
            fieldIcon.displayOnFocus(element, imgi);
            showPwd.addMouseDownPeekListener(imgi, element);
        } else {
            // Unsecure site, display warning icon.
            imgi.setAttribute('src', sitestatus.bad);
            // ADD INFOPANEL LISTENER HERE
            imgi.className += " anchorclass";
            imgi.addEventListener('click', function(e) { 
                if(sitestatus.httpstatus == "HTTPS" && element.value.length >0) {            
                    settingsChecker.isPasswordPeekedBefore(element, time);
                    //closePanel();
                } 
                if(sitestatus.httpstatus !== "HTTPS") {
                    self.port.emit('info', 'This is insecure form.');
                    fieldIcon.closePanel();                
                }
                element.focus();
            });
        }

        // Position the icon
        let rect = element.getBoundingClientRect();
        let height = rect.bottom - rect.top;
        imgi.style.left = rect.right-height + 'px';
        imgi.style.top = rect.top + 'px';
        
        let size = height;
        imgi.style.width = size + 'px';


        window.addEventListener('resize', function(e) {
            let rect = element.getBoundingClientRect();
            let height = rect.bottom - rect.top;
            imgi.style.left = rect.right-height + 'px';
            imgi.style.top = rect.top + 'px';
        });
    }

}(window.fieldIcon = window.fieldIcon || {}));

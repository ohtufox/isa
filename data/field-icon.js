(function(fieldIcon, undefined){
    let icons;
    let httpStatus = "";
    let preferences;

    fieldIcon.init = function(data) {
        icons = data.icon;
        httpStatus = data.httpStatus;
        preferences = data.preferences;
    }

    fieldIcon.add = function(element, time) {
        element.style.cssText = "background-size: auto 100%, auto;";
        if (httpStatus == "HTTPS") {
            element.style.backgroundImage = "url(" + icons.good + ")";            
        } else {
            element.style.backgroundImage = "url(" + icons.bad + ")";            
        }
        element.style.paddingLeft = "0px";
        element.style.backgroundPosition = "100% 50%, 100% 50%";
        element.style.backgroundRepeat = "no-repeat";

        element.addEventListener('click', function(e) { 
            if(httpStatus == "HTTPS" && element.value.length > 0) {            
                element.className += " anchorclass";
                settingsChecker.isPasswordPeekedBefore(element, time);
                //closePanel();
            } 
            if(httpStatus !== "HTTPS") {
                element.className += " anchorclass";
                self.port.emit('info', 'This is insecure form.');
                fieldIcon.closePanel();                
            }
            element.focus();
        });
    }
    
    fieldIcon.closePanel = function() {
        setTimeout(function() {
            self.port.emit('close-panel');
        }, 3000);        
    }

}(window.fieldIcon = window.fieldIcon || {}));

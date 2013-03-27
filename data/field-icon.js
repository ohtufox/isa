(function(fieldIcon, undefined){
    let sitestatus = "";

    fieldIcon.init = function(status) {
        sitestatus = status;
    }

    fieldIcon.add = function(element, time) {
        element.style.cssText = "background-size: auto 100%, auto;";
        if (sitestatus.httpstatus == "HTTPS") {
            element.style.backgroundImage = "url(" + sitestatus.good + ")";            
        } else {
            element.style.backgroundImage = "url(" + sitestatus.bad + ")";            
        }
        element.style.paddingLeft = "0px";
        element.style.backgroundPosition = "100% 50%, 100% 50%";
        element.style.backgroundRepeat = "no-repeat";

        element.addEventListener('click', function(e) { 
            if(sitestatus.httpstatus == "HTTPS" && element.value.length >0) {            
                element.className += " anchorclass";
                settingsChecker.isPasswordPeekedBefore(element, time);
                closePanel();
            } 
            if(sitestatus.httpstatus !== "HTTPS") {
                element.className += " anchorclass";
                self.port.emit('info', 'This is insecure form.');
                closePanel();                
            }
            element.focus();
        });
    }
    
    function closePanel() {
        setTimeout(function() {
            self.port.emit('close-panel');
        }, 3000);        
    }

}(window.fieldIcon = window.fieldIcon || {}));

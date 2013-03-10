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
            if(element.value.length>0) {
                settingsChecker.isPasswordPeekedBefore(element, time);
                element.focus();
            }    
        });
		
        element.addEventListener('mouseover', function(e) {
            showPwd.showTooltip(element, 'click to show password');			
        });
    }

}(window.fieldIcon = window.fieldIcon || {}));

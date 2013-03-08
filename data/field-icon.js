(function(fieldIcon, undefined){
    let sitestatus = "";

    self.port.on("status", function(status) {
        sitestatus = status;
    });

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
            showPwd.peekPassword(element, time);
            element.focus();
        });
    }

}(window.fieldIcon = window.fieldIcon || {}));

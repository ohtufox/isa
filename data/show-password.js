(function(showPwd, finder, undefined){
    self.port.on("ready", function() {
        showPwd.fixPage(3000);
    });

    let sitestatus = "";

    self.port.on("status", function(status) {
        sitestatus = status;
    });

    showPwd.peekPassword = function(element, time) {
		if(element.value.length >0) {
			showPassword(element);
			setTimeout(hidePassword, time, element);		
		}		
	};
	
    showPwd.fixPage = function(time) {
        let passwordFields = finder.findPasswordFields();
        for(let i = 0; i < passwordFields.length; i++) {
            showPwd.fixElement(passwordFields[i], time);
        }
    };

    showPwd.fixElement = function(element, time) {
        addIcon(element, time);
    }

    function addIcon(element, time) {
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

    function showPassword(element){
            element.type = 'text';
    }
    
    function hidePassword(element){
            element.type = 'password';
    }

}(window.showPwd = window.showPwd || {}, fieldFinder));

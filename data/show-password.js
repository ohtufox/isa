(function(showPwd, finder, icon, undefined){
    showPwd.peekPassword = function(element, time) {
        if(element.value.length >0) {
            showPassword(element);
            setTimeout(hidePassword, time, element);		
        }		
    };
	
    showPwd.fixPage = function(status, time) {
        fieldIcon.init(status);
        let passwordFields = finder.findPasswordFields();
        for(let i = 0; i < passwordFields.length; i++) {
            showPwd.fixElement(passwordFields[i], time);
        }
    };

    showPwd.fixElement = function(element, time) {
        // XXX: Page with multiple password fields creates multiple calls with one fixElement() call?
        icon.add(element, time);
    };

    showPwd.showTooltip = function(element, msg) {
        if(element.value.length >0) {
            element.title = msg;
        }
    };

    showPwd.addMouseDownPeekListener = function(element, target) {
        element.addEventListener('mousedown', function(e) {
            showPassword(target);
            e.preventDefault();
        });

        element.addEventListener('mouseup', function(e) {
            hidePassword(target);
            e.preventDefault();
        });
        element.addEventListener('mouseleave', function(e) {
            hidePassword(target);
        });

        element.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    };

    function showPassword(element){	
	    element.type = 'text';
    }
	
    function hidePassword(element){
        element.type = 'password';
    }

}(window.showPwd = window.showPwd || {}, fieldFinder, fieldIcon));

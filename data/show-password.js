(function(showPwd, finder, icon, undefined){
    showPwd.peekPassword = function(element) {
        if(element.value.length >0) {
            showPassword(element);
        }		
    };
	
    showPwd.fixPage = function(status) {
        let passwordFields = finder.findPasswordFields();
        for(let i = 0; i < passwordFields.length; i++) {
            showPwd.fixElement(passwordFields[i]);
        }
    };

    showPwd.fixElement = function(element) {
        // XXX: Page with multiple password fields creates multiple calls with one fixElement() call?
        icon.add(element);
    };

    showPwd.showTooltip = function(element, msg) {
        if(element.value.length >0) {
            element.title = msg;
        }
    };

    showPwd.addMouseDownPeekListener = function(element, target) {
        element.addEventListener('mousedown', function(e) {
            e.preventDefault();
            settingsChecker.isPasswordPeekedBefore(target, element);
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

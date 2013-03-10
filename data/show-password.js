
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
        icon.add(element, time);
    };

    showPwd.isPasswordPeekedBefore = function(element, time) {
        let msg = "clicking will show password in cleartext for 3 secs";
        self.port.emit('request-storage-status');
        self.port.on('storage-status', function(status) {
            if(element.value.length >0 && !status) {
                self.port.emit('info', msg);
                self.port.emit('used');	
            } else {
                showPwd.peekPassword(element, time);
            }
        });	
    };

    showPwd.showTooltip = function(element, msg) {
        if(element.value.length >0) {
            element.title = msg;
        }
    };

    function showPassword(element){		
	    element.type = 'text';
    }
	
    function hidePassword(element){
        element.type = 'password';
    }

}(window.showPwd = window.showPwd || {}, fieldFinder, fieldIcon));

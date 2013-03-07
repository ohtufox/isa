
(function(showPwd, finder, icon, undefined){
    showPwd.peekPassword = function(element, time) {
        if(element.value.length >0) {
<<<<<<< HEAD
            showPassword(element);
            setTimeout(hidePassword, time, element);		
        }		
=======
		    showPassword(element);
		    setTimeout(hidePassword, time, element);		
	    }		
>>>>>>> some formatting
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
        element.addEventListener('click', function(e) {
            //showPwd.peekPassword(element, time);
		    isThisDoneBefore(element, time);
        });
    };

    showPwd.showTooltip = function(element, msg) {
        if(element.value.length >0) {
            element.title = msg;
        }
    };

    function showPassword(element){	
	    element.type = 'text';
	
    function hidePassword(element){
        element.type = 'password';
    }
	
    function isThisDoneBefore(element, time) {
        let msg = "clicking this will show password in cleartext for 3 secs";
        self.port.emit('isUsed', msg);
        self.port.on('storage-status', function(status) {
            console.log("viesti saatu storagelta:");
            console.log(status);
            self.port.emit('used', msg);

            if(!status) {
                console.log("event for the first time");
				
                self.port.emit('used', msg);	
            }
			
            else {
                console.log("event happened before");
                showPwd.peekPassword(element, time);
            }
        });	
    }
		
    
}(window.showPwd = window.showPwd || {}, fieldFinder, fieldIcon));

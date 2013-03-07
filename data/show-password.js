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
	
	function showTooltip(element, msg) {
		self.port.emit('isUsed', msg);
		self.port.on('storage-status', function(status) {
			console.log("viesti saatu storagelta:");
			console.log(status);
			if(!status) {
				console.log("event for the first time");
				element.title = "!!!!"+msg;
				self.port.emit('used', msg);	
			}
			
			else {
				console.log("event happened before");
				element.title = msg;	
			}
		});
	}
	
}(window.showPwd = window.showPwd || {}, fieldFinder));

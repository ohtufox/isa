(function(settingsChecker, undefined) {
    let ignore = false;
    
    settingsChecker.pwdHasBeenPeekedBefore = function() {
        ignore = true;
    };
    
    settingsChecker.isPasswordPeekedBefore = function(element, time) {
        if(!ignore) {
            requestStorageStatus();
            readStorageStatus(element, time);
        } else {
            showPwd.peekPassword(element, time);
        }      	
    };

    function requestStorageStatus() {
        self.port.emit('request-storage-status');
    }
    
    function readStorageStatus(element, time) {
        self.port.on('storage-status', function(status) {
            if(element.value.length >0 && !status) {
                sendInfoToPanel();                
            } else {
                showPwd.peekPassword(element, time);				
            }
        });
    }
    
    function sendInfoToPanel() {
        self.port.emit('info', 'Clicking icon again will show password in cleartext for 3 seconds.');
        self.port.emit('used');
    }
        
} (window.settingsChecker = window.settingsChecker || {}));
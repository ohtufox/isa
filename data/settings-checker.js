(function(settingsChecker, undefined) {
    let ignore = false;
    let field = '';

    settingsChecker.pwdHasBeenPeekedBefore = function() {
        ignore = true;
    };
    
    settingsChecker.isPasswordPeekedBefore = function(element, time) {
        if(!ignore) {
            field = element;
            requestStorageStatus();
            readStorageStatus(time);
        } else {
            showPwd.peekPassword(element, time);
        }      	
    };

    function requestStorageStatus() {
        self.port.emit('request-storage-status');
    }
    
    function readStorageStatus(time) {
        self.port.on('storage-status', function(status) {
            if(!status) {
                sendInfoToPanel();                
            } else {
                showPwd.peekPassword(field, time);				
            }
        });
    }
    

    function sendInfoToPanel() {
        self.port.emit('info', 'Clicking icon again will show password in cleartext for 3 seconds.');
        self.port.emit('used');
    }
        
} (window.settingsChecker = window.settingsChecker || {}));
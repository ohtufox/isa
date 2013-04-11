(function(settingsChecker, undefined) {
    let ignore = false;
    let field = '';

    settingsChecker.pwdHasBeenPeekedBefore = function() {
        ignore = true;
    };
    
    settingsChecker.isPasswordPeekedBefore = function(element, imgi) {
        if(!ignore) {
            requestStorageStatus();
            readStorageStatus(element, imgi);
            ignore = true;
        } else {
            showPwd.peekPassword(element);
        }      	
    };

    function requestStorageStatus() {
        self.port.emit('request-storage-status');
    }
    
    function readStorageStatus(element, imgi) {
        self.port.on('storage-status', function(status) {
            if(!status) {
                // TODO: Add some function that opens panels and adds anchorclass before sending to prevent repetition?
                imgi.className = "anchorclass";
                notifyAboutCleartext();
            }
        });
    }

    function notifyAboutCleartext() {
        self.port.emit('info', 'secure-panel');
        self.port.emit('used');
    }
        
} (window.settingsChecker = window.settingsChecker || {}));

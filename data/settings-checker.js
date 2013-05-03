(function(settingsChecker, undefined) {
    let peekedBefore = false;
    let field = '';
    let httpsPageFound = false;


    settingsChecker.checkHttpsPage = function() {
        self.port.on('https-page-exists', function() {
            httpsPageFound = true;
        });
    };

    settingsChecker.httpsPageExists = function() {
        return httpsPageFound;
    };

    settingsChecker.pwdHasBeenPeekedBefore = function() {
        peekedBefore = true;
    };

    settingsChecker.isPasswordPeekedBefore = function(element, imgi) {
        if (!peekedBefore) {
            imgi.className = "anchorclass";
            notifyAboutCleartext();
            peekedBefore = true;
        } else {
            showPwd.peekPassword(element);
        }
    };

    function notifyAboutCleartext() {
        self.port.emit('info', 'secure-panel');
        self.port.emit('used');
    }

}(window.settingsChecker = window.settingsChecker || {}));

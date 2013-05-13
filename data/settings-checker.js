(function(settingsChecker, undefined) {
    let peekedBefore = false;
    let field = '';

    settingsChecker.pwdHasBeenPeekedBefore = function() {
        peekedBefore = true;
    };

    settingsChecker.isPasswordPeekedBefore = function(element, imgi) {
        if (!peekedBefore) {
            imgi.className = "anchorclass";
            notifyAboutCleartext();
            peekedBefore = true;
            return false;
        }
        return true;
    };

    function notifyAboutCleartext() {
        self.port.emit('info', 'secure-panel');
        self.port.emit('used');
    }

}(window.settingsChecker = window.settingsChecker || {}));

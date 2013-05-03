self.port.on("data", function(data) {
    if (data.httpStatus === 'HTTP' && fieldFinder.findPasswordFields().length > 0) {
        settingsChecker.checkHttpsPage();
    }

    if (data.preferences.passwordPeekedBefore) {
        settingsChecker.pwdHasBeenPeekedBefore();
    }

    showPwd.listenForStates();
    intelligentSecurityAdvisor.init(data);
});

self.port.on("data", function(data) {
    if (data.httpStatus === 'HTTP' && fieldFinder.findPasswordFields().length > 0) {
        settingsChecker.checkHttpsPage();
    }

    if (data.preferences.passwordPeekedBefore) {
        settingsChecker.pwdHasBeenPeekedBefore();
    }

    //showPwd.listenForStates();
    fixPage.listenForStates();
    intelligentSecurityAdvisor.init(data);
});

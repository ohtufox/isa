self.port.on("data", function(data) {
    if (data.httpStatus === 'HTTP' && fieldFinder.findPasswordFields().length > 0) {
        settingsChecker.checkHttpsPage();
    }

    if (data.passwordPeekedBefore) {
        settingsChecker.pwdHasBeenPeekedBefore();
    }

    intelligentSecurityAdvisor.init(data);
});

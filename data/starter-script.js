self.port.on("data", function(data) {
    if (data.passwordPeekedBefore) {
        settingsChecker.pwdHasBeenPeekedBefore();
    }

    intelligentSecurityAdvisor.init(data);
});

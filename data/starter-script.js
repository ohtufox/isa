self.port.on("data", function(data) {
    settingsChecker.checkHttpsPage();
    intelligentSecurityAdvisor.init(data);
});


self.port.on("data", function(data) {
    if(data.httpStatus==='HTTP'&&fieldFinder.findPasswordFields().length>0) {
        settingsChecker.checkHttpsPage();
    }
    intelligentSecurityAdvisor.init(data);
});


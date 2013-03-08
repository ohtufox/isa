self.port.on("status", function(status) {
    intelligentSecurityAdvisor.init(status);
});


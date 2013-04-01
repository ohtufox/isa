self.port.on("data", function(data) {
    intelligentSecurityAdvisor.init(data);
});


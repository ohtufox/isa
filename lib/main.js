var tabs = require("tabs");
var self = require("self");
var infoPanel = require("info-panel.js");

tabs.on('ready', function(tab) {
    var worker = tabs.activeTab.attach({		
        contentScriptFile: [self.data.url("field-finder.js"),
                            self.data.url("show-password.js"),
                            self.data.url("intelligent-security-advisor.js"),
                            self.data.url("starter-script.js")]
    });
		
	worker.port.on('info', function(msg) {
        console.log("main console log: "+msg);
		infoPanel.showPanel(msg);
    });
});


var tabs = require("tabs");
var self = require("self");

tabs.on('ready', function(tab) {
    tabs.activeTab.attach({		
        contentScriptFile: [self.data.url("field-finder.js"),
                            self.data.url("show-password.js"),
                            self.data.url("my-script.js")]
    });
});

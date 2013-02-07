let tabs = require("tabs");
let self = require("self");
let infoPanel = require("info-panel.js");
let widget = require("https-widget.js");

tabs.on('ready', function(tab) {
    tabs.activeTab.attach({
        contentScriptFile: [self.data.url("field-finder.js"),
                           self.data.url("show-password.js"),
                           self.data.url("my-script.js"),
                           self.data.url("add-icon.js")]
    });

    widget.widgetPrint();
});

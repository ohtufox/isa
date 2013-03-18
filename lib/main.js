let tabs = require("tabs");
let self = require("self");
//let widget = require("https-widget.js");
let https = require("https-checker.js");
let infoPanel = require("info-panel.js");
let widget = require("https-widget.js");


//https.isSecure();
tabs.on('ready', function(tab) {
    worker = tabs.activeTab

    worker = tabs.activeTab.attach({
        contentScriptFile: [self.data.url("field-finder.js"),
                           self.data.url("field-icon.js"),
                           self.data.url("show-password.js"),
                           self.data.url("intelligent-security-advisor.js"),
                           self.data.url("starter-script.js")]
    });
    https.activateHttpResponseEventListener();
    //var status = https.isSecure();
    //widget.widgetPrint(status);

    let status = new Object();
    status.good = self.data.url("icons/checkmark_32.png");
    status.bad = self.data.url("icons/warning_32.png");
    status.httpstatus = checker.isSecure(tabs.activeTab.url);

    worker.port.emit("status", status);

    widget.widgetPrint();
});


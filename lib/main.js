let tabs = require("tabs");
let self = require("self");
let infoPanel = require("info-panel.js");
let widget = require("https-widget.js");
let checker = require("https-checker.js");
let storeUsed = require("store-things.js");

tabs.on('ready', function(tab) {
   let worker = tab.attach({
        contentScriptFile: [self.data.url("field-finder.js"),
                           self.data.url("field-icon.js"),
                           self.data.url("show-password.js"),
                           self.data.url("intelligent-security-advisor.js"),
                           self.data.url("starter-script.js")]
    });

    let status = new Object();
    status.good = self.data.url("icons/checkmark_32.png");
    status.bad = self.data.url("icons/warning_32.png");
    status.httpstatus = checker.isSecure(tab.url);

    worker.port.emit("status", status);

    widget.widgetPrint(tab);
	storeUsed.messaging(worker);
});

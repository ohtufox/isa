let tabs = require("tabs");
let self = require("self");
let infoPanel = require("info-panel.js");
let widget = require("https-widget.js");
let checker = require("https-checker.js");
let storeUsedStatus = require("store-settings.js");

tabs.on('ready', function(tab) {
    let worker = tab.attach({		
        contentScriptFile: [self.data.url("field-finder.js"),
                           self.data.url("field-icon.js"),
                           self.data.url("show-password.js"),
                           self.data.url("intelligent-security-advisor.js"),
                           self.data.url("starter-script.js"),
                           self.data.url("settings-checker.js")]
    });

    let data = new Object();
    data.icon = new Object();
    data.preferences = new Object();
    data.icon.good = self.data.url("icons/checkmark_32.png");
    data.icon.bad = self.data.url("icons/warning_32.png");
    data.icon.eye = self.data.url("icons/eye_32.png");
    data.httpStatus = checker.isSecure(tab.url);
    data.preferences.passwordPeek = require('sdk/simple-prefs').prefs['passwordPeek'];
    worker.port.emit("data", data);
    
    storeUsedStatus.messaging(worker);    
    infoPanel.initPanel(worker);
});

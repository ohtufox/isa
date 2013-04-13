let tabs = require("tabs");
let testHelper = require("test-helper.js");
let self = require("self");
let infoPanel = require("info-panel.js");
let widget = require("https-widget.js");
let checker = require("https-checker.js");
let storeUsedStatus = require("store-settings.js");
let widgets = require("widget");

let options = {};
options.id = 'isa.settingsmenu';
options.label = 'Settings';
options.image = "http://www.mozilla.org/favicon.ico";
options.onCommand = function (){
    let url = self.data.url('html/settings.html');
        tabs.open({
                    url: url
                });
};
options.loadReason = "install";
let tbb = require("toolbarbutton").ToolbarButton(options);
widgets.Widget({
    id: "mozilla-link",
    label: "Testataan",
    contentURL: "http://www.mozilla.org/favicon.ico",
    onClick: logPrefs
});
 if (options.loadReason == "install") {
         tbb.moveTo({
                   toolbarID: "nav-bar",
                   forceMove: false // only move from palette
                 });
           }
function logPrefs() {
    let url = self.data.url('html/settings.html');
    tabs.open({
        url: url
    });
}

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
    data.icon.eyeopen = self.data.url("icons/eye_open_16.png");
    data.icon.eyeclosed = self.data.url("icons/eye_closed_16.png");
    data.httpStatus = checker.isSecure(tab.url);
    data.preferences.passwordPeek = require('sdk/simple-prefs').prefs['passwordPeek'];
    worker.port.emit("data", data);
    
    storeUsedStatus.messaging(worker);    
    infoPanel.initPanel(worker);
});

// var persist = Components.classes['@mozilla.org/embedding/browser/nsWebBrowserPersist;1'].createInstance(Components.interfaces.nsIWebBrowserPersist);

let tabs = require("tabs");
let self = require("self");
let infoPanel = require("info-panel.js");
let widget = require("https-widget.js");
let checker = require("https-checker.js");
let storeUsedStatus = require("store-settings.js");
let utils = require("window/utils"); // sdk/window/utils

let listener = require("https-progresslistener.js");

// Todo: Find the window or tab or something else that this shall be added to.
//https://addons.mozilla.org/en-US/developers/docs/sdk/1.14/dev-guide/guides/events.html

let window = utils.getMostRecentBrowserWindow();
let browser = window.gBrowser;

browser.addEventListener(listener); // Error here

//let xulwindow = utils.getXULWindow(window);

this.addEventListener(listener);
console.log("added");

tabs.on('ready', function(tab) {
    let worker = tab.attach({		
        contentScriptFile: [self.data.url("field-finder.js"),
                           self.data.url("field-icon.js"),
                           self.data.url("show-password.js"),
                           self.data.url("intelligent-security-advisor.js"),
                           self.data.url("starter-script.js"),
                           self.data.url("settings-checker.js")]
    });

    let status = new Object();
    status.good = self.data.url("icons/checkmark_32.png");
    status.bad = self.data.url("icons/warning_32.png");
    status.httpstatus = checker.isSecure(tab.url);
    worker.port.emit("status", status);
    
    storeUsedStatus.messaging(worker);    
    infoPanel.initPanel(worker);
});

let tabs = require('tabs');
let self = require('self');
let infoPanel = require('info-panel.js');
let widget = require('https-widget.js');
let checker = require('https-checker.js');
let storeSettings = require("store-settings.js");
let widgets = require('widget');
let settingsMenu = require('settings-menu');
let utils = require("window/utils");
let redirect = require("redirect.js");
let nodes = require("window-node.js");

let targetState = "nil";
let pwFieldMapping;

settingsMenu.createButton();

let targetChecker = require('target-checker');

tabs.on('ready', function(tab) {
    let worker = tab.attach({		
        contentScriptFile: [self.data.url('field-finder.js'),
                           self.data.url('field-icon.js'),
                           self.data.url('show-password.js'),
                           self.data.url('intelligent-security-advisor.js'),
                           self.data.url('starter-script.js'),
                           self.data.url('settings-checker.js')]
    });

    redirect.init(tab, worker);

    pwFieldMapping = new Object();

    let data = new Object();
    data.icon = new Object();
    data.preferences = new Object();
    data.icon.good = self.data.url('icons/checkmark_32.png');
    data.icon.bad = self.data.url('icons/warning_32.png');
    data.icon.eyeopen = self.data.url('icons/eye_open_16.png');
    data.icon.eyeclosed = self.data.url('icons/eye_closed_16.png');

    //checkTarget(worker);
    targetChecker.setWorker(worker);

    let window = utils.getMostRecentBrowserWindow();
    data.httpStatus = checker.isSecure(window);

    data.preferences.passwordPeek = require('sdk/simple-prefs').prefs['passwordPeek'];
    data.preferences.disableUndetermined = require('sdk/simple-prefs').prefs['disableUndetermined'];
    data.preferences.enableCustomIcons = require('sdk/simple-prefs').prefs['enableCustomIcons'];
    data.preferences.iconWarning = require('sdk/simple-prefs').prefs['iconWarning'];
    data.preferences.iconShow = require('sdk/simple-prefs').prefs['iconShow'];
    worker.port.emit('data', data);
    
    storeSettings.messaging(worker);    
    infoPanel.initPanel(worker);

});

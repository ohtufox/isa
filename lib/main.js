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
let targetState = "";
let worker;
let targetChecker = require('target-checker');


settingsMenu.createButton();

tabs.on('ready', function(tab) {
    worker = tab.attach({
        contentScriptFile: [self.data.url('field-finder.js'),
            self.data.url('field-icon.js'),
            self.data.url('show-password.js'),
            self.data.url('fix-page.js'),
            self.data.url('intelligent-security-advisor.js'),
            self.data.url('settings-checker.js'),
            self.data.url('starter-script.js')]
    });

    let window = utils.getMostRecentBrowserWindow();
    let pageState = checker.isSecure(window);

    fieldCheck();
    redirect.init(tab, worker);
    initData(pageState);
    storeSettings.messaging(worker);
    infoPanel.initPanel(worker);
});

function fieldCheck() {
    worker.port.on("fieldcheck", function(formAction) {
        console.log("let's check action: " + formAction);

        if (formAction != "") {
            let listener = targetChecker.createListener(callbackFunc);
            targetChecker.checkTarget(formAction, listener);
        } else {
            callbackFunc("TARGET_UNDETERMINED");
        }
    });
}

function initData(pageState) {
    let data = new Object();
    data.icon = new Object();
    data.preferences = new Object();

    data.icon.good = self.data.url('icons/checkmark_32.png');
    data.icon.bad = self.data.url('icons/warning_32.png');
    data.icon.eyeopen = self.data.url('icons/eye_open_16.png');
    data.icon.eyeclosed = self.data.url('icons/eye_closed_16.png');
    data.httpStatus = pageState;

    data.passwordPeekedBefore = storeSettings.pwdPeekedBefore();
    data.preferences.passwordPeek = require('sdk/simple-prefs').prefs['passwordPeek'];
    data.preferences.disableUndetermined = require('sdk/simple-prefs').prefs['disableUndetermined'];
    data.preferences.enableCustomIcons = require('sdk/simple-prefs').prefs['enableCustomIcons'];
    data.preferences.iconWarning = require('sdk/simple-prefs').prefs['iconWarning'];
    data.preferences.iconShow = require('sdk/simple-prefs').prefs['iconShow'];
    data.preferences.checkTarget = true;
    worker.port.emit('data', data);
}

// Executed when request is finished

function callbackFunc(state, requestURI) {
    console.log('The target page,' + requestURI + ' is ' + state + "\n");
    worker.port.emit('fieldchecked', state);
}

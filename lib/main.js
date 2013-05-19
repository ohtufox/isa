let tabs = require('tabs');
let self = require('self');
let infoPanel = require('info-panel.js');
let checker = require('https-checker.js');
let storePwdPeekedStatus = require("password-peeked-storage.js");
let settingsMenu = require('settings-menu');
let utils = require("window/utils");
let redirect = require("redirect.js");
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
    if(pageState === 'HTTP') {
        redirect.init(tab, worker);
    }
    initData(pageState);
    storePwdPeekedStatus.messaging(worker);
    infoPanel.initPanel(worker);
});

function fieldCheck() {
    worker.port.on("fieldcheck", function(formAction, queue) {
        console.log("let's check action: " + formAction);

        if (formAction != "") {
            console.log('formi on!');
            let listener = targetChecker.createListener(new function(s, r) {
                worker.port.emit(queue + 'fieldchecked', s);
            });
            console.log('Listener asetettu');
            targetChecker.checkTarget(formAction, listener);
            console.log('kohde tarkistettu');
        } else {
            callbackFunc("TARGET_UNDETERMINED", "", queue);
        }
    });
}

function initData(pageState) {
    let data = new Object();
    data.icon = require('theme').getSelectedTheme();
    data.preferences = new Object();

    data.httpStatus = pageState;

    data.passwordPeekedBefore = storePwdPeekedStatus.pwdPeekedBefore();
    data.preferences.passwordPeek = require('sdk/simple-prefs').prefs['passwordPeek'];
    data.preferences.disableUndetermined = require('sdk/simple-prefs').prefs['disableUndetermined'];
    data.preferences.enableCustomIcons = require('sdk/simple-prefs').prefs['enableCustomIcons'];
    data.preferences.iconWarning = require('sdk/simple-prefs').prefs['iconWarning'];
    data.preferences.iconShow = require('sdk/simple-prefs').prefs['iconShow'];
    data.preferences.checkTarget = true;
    worker.port.emit('data', data);
}

// Executed when request is finished

function callbackFunc(state, requestURI, queue) {
    console.log('Tarkistettu, mitähän täältä tulee....');
    console.log('The target page,' + requestURI + ' is ' + state + "\n");
    worker.port.emit(queue + 'fieldchecked', state);
}

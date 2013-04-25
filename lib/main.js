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

settingsMenu.createButton();
let themes = [
    {
        good: self.data.url('icons/checkmark_32.png'),
        bad: self.data.url('icons/warning_32.png'),
        eyeopen: self.data.url('icons/eye_open_16.png'),
        eyeclosed: self.data.url('icons/eye_closed_16.png')
    },
    {
        good: self.data.url('icons/information_32.png'),
        bad: self.data.url('icons/forbidden_32.png'),
        eyeopen: self.data.url('icons/checkmark_32.png'),
        eyeclosed: self.data.url('icons/warning_old_32.png')
    }    
];

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

    let data = new Object();
    let themeIndex = require('sdk/simple-prefs').prefs['theme'];
    data.icon = themes[themeIndex];
    data.preferences = new Object();

    let window = utils.getMostRecentBrowserWindow();
    data.httpStatus = checker.isSecure(window); //CHANGE

    data.preferences.passwordPeek = require('sdk/simple-prefs').prefs['passwordPeek'];
    data.preferences.iconWarning = require('sdk/simple-prefs').prefs['iconWarning'];
    data.preferences.iconShow = require('sdk/simple-prefs').prefs['iconShow'];
    worker.port.emit('data', data);
    
    storeSettings.messaging(worker);    
    infoPanel.initPanel(worker);

});

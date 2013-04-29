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
let worker;

settingsMenu.createButton();

let targetChecker = require('target-checker');

tabs.on('ready', function(tab) {
    worker = tab.attach({		
        contentScriptFile: [self.data.url('field-finder.js'),
                           self.data.url('field-icon.js'),
                           self.data.url('show-password.js'),
                           self.data.url('intelligent-security-advisor.js'),
                           self.data.url('starter-script.js'),
                           self.data.url('settings-checker.js')]
    });

      worker.port.on("fieldcheck", function(formAction) {

       console.log("let's check action: " +formAction.action);
       
       if (formAction != "") {
          targetChecker.createListener(callbackFunc); // set our callbackfunction, its the global thing defined here
          targetChecker.checkTarget(formAction.action);
       } else {
          callbackFunc("TARGET_UNDETERMINED");
       }
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

//    checkTarget(worker);

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

// Executed when request is finished
function callbackFunc(state, requestURI) {
  // url contains the whole html of a page
  console.log('The target page,' +requestURI +' is ' +state +"\n"); 
  // the address should be mapped to a field, but the address is sometimes different on i.e. linkedin etc :/
  targetState = state;
  console.log("worker: " +worker);
  worker.port.emit('fieldchecked', state);
  console.log("hi we are finished");
}

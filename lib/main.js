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

	let window = utils.getMostRecentBrowserWindow();
	let pageState = checker.isSecure(window);

	worker.port.on("fieldcheck", function(data) {
		console.log("let's check action: " +data.action);
     	 
		if (data.action != "") {
			let listener = targetChecker.createListener(callbackFunc);
			targetChecker.checkTarget(data, listener);
		} else {
			callbackFunc("TARGET_UNDETERMINED");
		}	
	});

    redirect.init(tab, worker);

    let data = new Object();
    data.icon = new Object();
    data.preferences = new Object();
    data.icon.good = self.data.url('icons/checkmark_32.png');
    data.icon.bad = self.data.url('icons/warning_32.png');
    data.icon.eyeopen = self.data.url('icons/eye_open_16.png');
    data.icon.eyeclosed = self.data.url('icons/eye_closed_16.png');

    data.httpStatus = pageState;

    data.preferences.passwordPeek = require('sdk/simple-prefs').prefs['passwordPeek'];
    data.preferences.iconWarning = require('sdk/simple-prefs').prefs['iconWarning'];
    worker.port.emit('data', data);
    
    storeSettings.messaging(worker);
    infoPanel.initPanel(worker);

});

// Executed when request is finished
function callbackFunc(state, requestURI, indexNumber) {
  console.log('The target page,' +requestURI +' is ' +state +"\n");
  let data = new Object();
  data.state = state;
  data.index = indexNumber;
  worker.port.emit('fieldchecked', data);
}

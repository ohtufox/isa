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

settingsMenu.createButton();

let targetChecker = require('target-checker');
//targetChecker.checkTarget('http://www.cs.helsinki.fi');

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
    data.icon = new Object();
    data.preferences = new Object();
    data.icon.good = self.data.url('icons/checkmark_32.png');
    data.icon.bad = self.data.url('icons/warning_32.png');
    data.icon.eyeopen = self.data.url('icons/eye_open_16.png');
    data.icon.eyeclosed = self.data.url('icons/eye_closed_16.png');

    checkTarget(worker);

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
function callbackFunc(state) {
  // url contains the whole html of a page
  console.log('The target page is ' +state +"\n");  
  targetState = state;
}

function checkTarget(worker) {
    var target = "";

    let elements = nodes.getFields("input");

	console.log("etsi password tästä" +elements);
	console.log("etsi password tästä" +elements.length);

	// Fetch multiple pw fields 
	for ( var i = 0; i < elements.length; ++i) {
		console.log(elements[i].type);
		if (elements[i].type === 'password') {
			var target = elements[i].form.action;
			console.log("elementsin sisältö" +target);
			targetChecker.createListener(callbackFunc);
			// create target checker object for each target address and give it the/some field id too.
			// have each object do the query
			// when the query is finished, the callback function is executed
			// NOTE: since the elements[] contains the pw fields we do have a checker-field mapping :)
			// when the query is finished the callback function can draw the icon. would this be ok? Or at least tell the icon-painter through a port-emit.

// ...aaaand go over the special cases again: iframes etc too.
		}		
	}
/*
    worker.port.on("target-address", function(text) {
	var table = text;
	
	

       console.log("the first target address is: " +text[0]);
       target = text;
       
       if (target != "") {
          targetChecker.createListener(callbackFunc); // set our callbackfunction
          targetChecker.checkTarget(target);
       } else {
          callbackFunc("TARGET_UNDETERMINED");
       }
    });
*/
}

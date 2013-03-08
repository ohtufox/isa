let tabs = require("tabs");
let self = require("self");
//let widget = require("https-widget.js");
let https = require("https-checker.js");


//https.isSecure();
tabs.on('ready', function(tab) {
    tabs.activeTab.attach({		
        contentScriptFile: [self.data.url("field-finder.js"),
                            self.data.url("show-password.js"),
                            self.data.url("intelligent-security-advisor.js"),
                            self.data.url("starter-script.js")]
    });
    https.activateHttpResponseEventListener();
    //var status = https.isSecure();
    //widget.widgetPrint(status);
});


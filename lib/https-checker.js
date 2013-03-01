exports.isSecure = isSecure;

// Check whether the provided address contains 'https' or not. Examples:
// http://code.google.com/p/runnersbox/source/browse/trunk/app/chrome/content/main.js?r=48
// http://code.google.com/p/widgeon/source/browse/trunk/jetpack/lib/media-type.js?r=38

function isSecure(address) {

    //if ((secInfo.securityState & Ci.nsIWebProgressListener.STATE_IS_SECURE) == Ci.nsIWebProgressListener.STATE_IS_SECURE)

    /*
    let {Cc, Ci} = require("chrome");
	let mediator = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator);
    */

    //const Ci = Components.interfaces;
    const {Cc, Ci, Cu} = require("chrome");
    var events = require("sdk/system/events");
    //let flag = Ci.nsIWebProgressListener.STATE_STOP

    var channel = Ci.nsIChannel;
    var states = Ci.nsIWebProgressListener; //.getService(Ci.nsIWebProgressListener);
//    var secInfo = channel.securityInfo;

    // Listen to some event (https://developer.mozilla.org/en/docs/Observer_Notifications)
    events.on("http-on-modify-request", function (event) {
       var channel = event.subject.QueryInterface(Ci.nsIHttpChannel);
       var address = event.subject.URI.spec;

       var secInfo = channel.securityInfo;
       console.log('Value of securityInfo: ' +secInfo);
       console.log('Value of address: ' +address);
    });

    events.on("http-on-examine-response", function (event) {
       var channel = event.subject.QueryInterface(Ci.nsIHttpChannel);
       var secInfo = channel.securityInfo;
       console.log('Security change: ldskfjlkgjflkgjflkgjlkfdgjdlfkgjlfkdjgkldj ' +secInfo);
       console.log('Value of response address: ' +address);
    });

    console.log('\n\n\n' +'State is secure: ' +states.STATE_IS_SECURE +'\n\n\n'); // Only returns value of flag.
    console.log('Value of channel: ' +channel);
    

    if (address != undefined) {

    if (address.match(/^https/)) {
       msg = 'HTTPS';
    } else {
       msg = 'HTTP';
    }

    return msg;
    }
};

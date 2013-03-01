exports.isSecure = isSecure;

// Check whether the provided address contains 'https' or not.
// http://code.google.com/p/runnersbox/source/browse/trunk/app/chrome/content/main.js?r=48

function isSecure(address) {

    //if ((secInfo.securityState & Ci.nsIWebProgressListener.STATE_IS_SECURE) == Ci.nsIWebProgressListener.STATE_IS_SECURE)

    /*
    let {Cc, Ci} = require("chrome");
	let mediator = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator);
    */

    //const Ci = Components.interfaces;
    const {Cc, Ci, Cu} = require("chrome");
    //let flag = Ci.nsIWebProgressListener.STATE_STOP

    var states = Ci.nsIWebProgressListener; //.getService(Ci.nsIWebProgressListener);

    console.log('\n\n\n' +'State is secure: ' +states.STATE_IS_SECURE +'\n\n\n'); // Only returns value of flag.
    console.log('Value of security: ' +states.onSecurityChange());

    if (address != undefined) {

    // Interesting : http://code.google.com/p/widgeon/source/browse/trunk/jetpack/lib/media-type.js?r=38
    let uriLoader = Cc['@mozilla.org/uriloader;1'].getService(Ci.nsIURILoader);
    console.log('');

    if (address != undefined) {

    let msg = 'Uriloader is: ' +uriLoader;

    if (address.match(/^https/)) {
       msg = 'HTTPS';
    } else {
       msg = 'HTTP';
    }

    return msg;
    }
};

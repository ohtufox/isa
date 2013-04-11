exports.myListener = myListener;

const {Cc, Ci, Cu} = require("chrome");
const STATE_START = Ci.nsIWebProgressListener.STATE_START;
const STATE_STOP = Ci.nsIWebProgressListener.STATE_STOP;

let {XPCOMUtils} = Cu.import("resource://gre/modules/XPCOMUtils.jsm");

let myListener = {
    QueryInterface: XPCOMUtils.generateQI(["nsIWebProgressListener",
                                           "nsISupportsWeakReference"]),
 
    onStateChange: function(aWebProgress, aRequest, aFlag, aStatus) {},
    onLocationChange: function(aProgress, aRequest, aURI) {},
    onProgressChange: function(aWebProgress, aRequest, curSelf, maxSelf, curTot, maxTot) {},
    onStatusChange: function(aWebProgress, aRequest, aStatus, aMessage) {
       console.log("STATUS CHANGED!!");
    },
    onSecurityChange: function(aWebProgress, aRequest, aState) {
       console.log("SECURITY CHANGED!!");
    }
}

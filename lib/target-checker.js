exports.checkTarget = checkTarget;
exports.createListener = createListener;

const {
    Cc, Ci, Cu, Cr, components
} = require("chrome");

// Default values
const STATE_IS_SECURE = "Secure";
const STATE_IS_INSECURE = "Insecure";
const STATE_IS_BROKEN = "Broken state";
const NO_INFO = "No info available";


function createListener(callbackFunc, id) {
    return new StreamListener(callbackFunc, id);
}

function checkTarget(target, listener) {
    let uri = ioService.newURI(target, null, null);

    listener.requestURI = target;

    // get a channel for that nsIURI
    let gChannel = ioService.newChannelFromURI(uri);
    listener.gChannel = gChannel;
    gChannel.notificationCallbacks = listener;
    gChannel.asyncOpen(listener, null);
}

function checkSecurity(gChannel) {
    let secInfo = gChannel.securityInfo;
    let state = "";

    // Determine state of connection
    if (secInfo instanceof Ci.nsITransportSecurityInfo) {
        state = processSecurityState(secInfo);
    } else {
        state = NO_INFO;
    }
    return state;
}

// Define streamlistener BEFORE calling new StreamListener();
StreamListener.prototype = {
    requestURI: "",

    onStartRequest: function(aRequest, aContext) {},
    onDataAvailable: function(aRequest, aContext, aStream, aSourceOffset, aLength) {},

    onStopRequest: function(aRequest, aContext, aStatus) {
        if (components.isSuccessCode(aStatus)) {
            let state = checkSecurity(this.gChannel);
            this.mCallbackFunc(state, this.requestURI, this.queueId);
        } else {
            this.mCallbackFunc("TARGET_UNDETERMINED", this.requestURI, this.queueId);
        }
    },

    onChannelRedirect: function(aOldChannel, aNewChannel, aFlags) {},
    getInterface: function(aIID) {},
    onProgress: function(aRequest, aContext, aProgress, aProgressMax) {},
    onStatus: function(aRequest, aContext, aStatus, aStatusArg) {},
    onRedirect: function(aOldChannel, aNewChannel) {},
    QueryInterface: function(aIID) {}
};


// the IO service
let ioService = Cc["@mozilla.org/network/io-service;1"]
    .getService(Ci.nsIIOService);

// Set the callback function
function StreamListener(callbackFunc, id) {
    this.mCallbackFunc = callbackFunc;
    this.queueId = id;
}

// Define the security state
function processSecurityState(secInfo) {
    secInfo.QueryInterface(Ci.nsITransportSecurityInfo);
    let state = NO_INFO;

    state = securityState(secInfo);
    return state;
}

// Check security state flags
function securityState(secInfo) {

    if ((secInfo.securityState & Ci.nsIWebProgressListener.STATE_IS_SECURE) == Ci.nsIWebProgressListener.STATE_IS_SECURE) {
        return STATE_IS_SECURE;
    } else if ((secInfo.securityState & Ci.nsIWebProgressListener.STATE_IS_INSECURE) == Ci.nsIWebProgressListener.STATE_IS_INSECURE) {
        return STATE_IS_INSECURE;
    } else if ((secInfo.securityState & Ci.nsIWebProgressListener.STATE_IS_BROKEN) == Ci.nsIWebProgressListener.STATE_IS_BROKEN) {
        console.log("State is broken since: " + secInfo.shortSecurityDescription +
            "\n" + " and the error message is " + secInfo.errorMessage + "\n");
        return STATE_IS_BROKEN;
    }
};

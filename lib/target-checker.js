exports.checkTarget = checkTarget;

const {Cc, Ci, Cu, Cr, components} = require("chrome");

// Default values
let STATE_IS_SECURE = "Secure";
let STATE_IS_INSECURE = "Insecure";
let STATE_IS_BROKEN = "Broken state";
let NO_INFO = "No info available";

function checkTarget(url) {
   // CHANGE TO USE URL
   var uri = ioService.newURI("https://www.github.com", null, null);
                               
   // get a channel for that nsIURI
   gChannel = ioService.newChannelFromURI(uri);

   // get a listener
   var listener = new StreamListener(callbackFunc);
                                 
   gChannel.notificationCallbacks = listener;
   gChannel.asyncOpen(listener, null);
}

// Executed when request is finished
function callbackFunc(url) {
  // url contains the whole html of a page
  console.log('asdfjee' + url + "\n");  
}

function checkSecurity() {

   let secInfo = gChannel.securityInfo;
   console.log('secinfo is: ' +secInfo);

  // Determine state of connection
  // SEND MESSAGE TO OTHERS ABOUT THE STATE HERE!
  if (secInfo instanceof Ci.nsITransportSecurityInfo) {
		let state = processSecurityState(secInfo);
            console.log("The flag says: " +state);
  } else {
		console.log("Setting state: " + state);
		let state = NO_INFO;
		console.log("State is: " +state);
  }
}

// Define streamlistener BEFORE calling new StreamListener();
StreamListener.prototype = {
    mData: "",

    onStartRequest: function (aRequest, aContext) { },
    onDataAvailable: function (aRequest, aContext, aStream, aSourceOffset, aLength) { },

    onStopRequest: function (aRequest, aContext, aStatus) {
        if (components.isSuccessCode(aStatus)) {
            checkSecurity();
            this.mCallbackFunc(this.mData);
        } else {
            this.mCallbackFunc(null);
        }

        gChannel = null;
        console.log('stop request');
    },

    onChannelRedirect: function (aOldChannel, aNewChannel, aFlags) { },
    getInterface: function (aIID) { },
    onProgress : function (aRequest, aContext, aProgress, aProgressMax) { },
    onStatus : function (aRequest, aContext, aStatus, aStatusArg) { },
    onRedirect : function (aOldChannel, aNewChannel) { },
    QueryInterface : function(aIID) { }
};

   let gChannel;
  
   // the IO service
   let ioService = Cc["@mozilla.org/network/io-service;1"]
                             .getService(Ci.nsIIOService);

// Set the callback function
function StreamListener(callbackFunc) {
    console.log("set callbackfunc");
    this.mCallbackFunc = callbackFunc;
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
        } else if ((secInfo.securityState & Ci.nsIWebProgressListener.STATE_IS_INSECURE) == Ci.nsIWebProgressListener.STATE_IS_INSECURE){
		return STATE_IS_INSECURE;
	} else if ((secInfo.securityState & Ci.nsIWebProgressListener.STATE_IS_BROKEN) == Ci.nsIWebProgressListener.STATE_IS_BROKEN) {
		console.log("State is broken since: " + secInfo.shortSecurityDescription +
        			"\n" + " and the error message is " + secInfo.errorMessage + "\n");
        	return STATE_IS_BROKEN;
	}
};

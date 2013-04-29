exports.checkTarget = checkTarget;
exports.createListener = createListener;

const {Cc, Ci, Cu, Cr, components} = require("chrome");

// Default values
let STATE_IS_SECURE = "Secure";
let STATE_IS_INSECURE = "Insecure";
let STATE_IS_BROKEN = "Broken state";
let NO_INFO = "No info available";

let gChannel;

function createListener(callbackFunc) {
   return new StreamListener(callbackFunc);
}

function checkTarget(data, listener) {
   let uri = ioService.newURI(data.action, null, null);

   listener.indexNumber = data.index;
   listener.requestURI = data.action;
                               
   // get a channel for that nsIURI
   gChannel = ioService.newChannelFromURI(uri);
   gChannel.notificationCallbacks = listener;
   gChannel.asyncOpen(listener, null);
}

function checkSecurity() {

   let secInfo = gChannel.securityInfo;
   let state = "";

  // Determine state of connection
  if (secInfo instanceof Ci.nsITransportSecurityInfo) {
		state = processSecurityState(secInfo);
            console.log("The flag says: " +state);
  } else {
		console.log("Setting state: " + state);
		state = NO_INFO;
		console.log("State is: " +state);
  }
  return state;
}

// Define streamlistener BEFORE calling new StreamListener();
StreamListener.prototype = {
    requestURI: "", indexNumber: "",

    onStartRequest: function (aRequest, aContext) { },
    onDataAvailable: function (aRequest, aContext, aStream, aSourceOffset, aLength) { },

    onStopRequest: function (aRequest, aContext, aStatus) {
		console.log("status: " +aStatus);
        if (components.isSuccessCode(aStatus)) {
            let state = checkSecurity();
		console.log("these are the stored values: " +this.requestURI + " " +this.indexNumber);
            this.mCallbackFunc(state, this.requestURI, this.indexNumber);
		console.log("callback finished");
        } else {
            this.mCallbackFunc("TARGET_UNDETERMINED", this.requestURI, this.indexNumber);
        }

        //gChannel = null;

	  state = "";
	  this.requestURI = "";
    },

    onChannelRedirect: function (aOldChannel, aNewChannel, aFlags) { },
    getInterface: function (aIID) { },
    onProgress : function (aRequest, aContext, aProgress, aProgressMax) { },
    onStatus : function (aRequest, aContext, aStatus, aStatusArg) { },
    onRedirect : function (aOldChannel, aNewChannel) { },
    QueryInterface : function(aIID) { }
};

  
   // the IO service
   let ioService = Cc["@mozilla.org/network/io-service;1"]
                             .getService(Ci.nsIIOService);

// Set the callback function
function StreamListener(callbackFunc) {
    console.log("set callbackfunc");
    this.mCallbackFunc = callbackFunc;
    console.log(this.mCallbackFunc);
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

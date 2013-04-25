exports.setWorker = setWorker;
//exports.createListener = createListener;

const {Cc, Ci, Cu, Cr, components} = require("chrome");

// Default values
let STATE_IS_SECURE = "secure";
let STATE_IS_INSECURE = "insecure";
let STATE_IS_BROKEN = "broken";

// Custom flags
let NO_INFO = "no_info"; // The channel does not have a securityInfo object.
let UNDETERMINED = "undetermined" // The form action did not contain an URL.

let listener;
let gChannel;
let worker;

function createListener(callbackFunc) {
   listener = new StreamListener(callbackFunc);
}

// Set the worker listening to pw.
function setWorker(worker) {
	this.worker = worker;

   worker.port.on("fieldcheck", function(formAction) {

       //console.log("let's check action: " +formAction);
       
       if (formAction != "") {
          createListener(callbackFunc); // set our callbackfunction, its the global thing defined here.
          checkTarget(formAction);
       } else {
          callbackFunc(UNDETERMINED);
       }
  });
}



function checkTarget(url) {
   var uri = ioService.newURI(url, null, null);
                               
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
		console.log("There was no securityinfo available from channel to process with flags.");
		state = NO_INFO;
		console.log("Setting state to: " +state);
  }
  return state;
}

// Define streamlistener BEFORE calling new StreamListener();
StreamListener.prototype = {
    requestURI: "",

    onStartRequest: function (aRequest, aContext) { requestURI = aRequest.name; console.log("starting request to " +requestURI); },
    onDataAvailable: function (aRequest, aContext, aStream, aSourceOffset, aLength) { },

    onStopRequest: function (aRequest, aContext, aStatus) {
		console.log("status: " +aStatus);
        if (components.isSuccessCode(aStatus)) {
            let state = checkSecurity();
            this.mCallbackFunc(state, requestURI);
        } else {
            this.mCallbackFunc(null, null);
        }

        //gChannel = null;

	  state = "";
	  requestURI = "";
        console.log('stop request');
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

// Executed when request is finished
function callbackFunc(state, requestURI) {
  // url contains the whole html of a page
  console.log('The target page, ' +requestURI +' is ' +state +"\n"); 
  // the address should be mapped to a field, but the address is sometimes different on i.e. linkedin etc :/
  worker.port.emit('fieldchecked', state);
  console.log("finish!!");
}

exports.checkTarget = checkTarget;

const {Cc, Ci, Cu, Cr, components} = require("chrome");
let https = require('https-checker-old');

// Default values
let STATE_IS_SECURE = "Secure";
let STATE_IS_INSECURE = "Insecure";
let STATE_IS_BROKEN = "Broken state";
let NO_INFO = "No info available";


function checkTarget(url) {
   https.activateHttpResponseEventListener();
   console.log('asdf, channel on: ' +gChannel);
   //checkSecurity();
}

// Executed when request is finished
function callbackFunc(url) {
  // url contains the whole html of a page
  console.log('asdfjee' + url + "\n");  
}

function checkSecurity() {
    console.log("check the security");

   // ask for the http channel
   //gChannel = this.QueryInterface(Ci.nsIHttpChannel);
   //gChannel = listener.getInterface(Ci.nsIHttpChannel);

   console.log("what we have when httpchannel was asked for: " +gChannel);
   console.log("uri: " +gChannel.URI);
   console.log("owner: " +gChannel.owner);
   console.log("orig uri: " +gChannel.originalURI);
   console.log("notificationcallbacks: " +gChannel.notificationCallbacks);

    // ota security info
   let secInfo = gChannel.securityInfo;

   console.log('secinfo is: ' +secInfo);

  // Print channel info
  if (secInfo instanceof Ci.nsITransportSecurityInfo) {
		processSecurityState(secInfo);
        } else {
		console.log("Setting state: " + state);
		let state = NO_INFO;
		console.log("State is: " +state);
        }
}

// Define streamlistener BEFORE calling new StreamListener();
StreamListener.prototype = {
    mData: "",

    onStartRequest: function (aRequest, aContext) {
        console.log('startRequest');
        this.mData = "";
    },

    onDataAvailable: function (aRequest, aContext, aStream, aSourceOffset, aLength) {
        let scriptableInputStream =
            Cc["@mozilla.org/scriptableinputstream;1"]
            .createInstance(Ci.nsIScriptableInputStream);
        scriptableInputStream.init(aStream);

        this.mData += scriptableInputStream.read(aLength);
        console.log('data available');
    },

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

    onChannelRedirect: function (aOldChannel, aNewChannel, aFlags) {
        console.log('channel redirect');
        gChannel = aNewChannel;
    },

    getInterface: function (aIID) {
       console.log('get interface');
        try {
            return this.QueryInterface(aIID); // is what QI down there refers to..
        } catch (e) {
            throw Cr.NS_NOINTERFACE;
        }
    },

    onProgress : function (aRequest, aContext, aProgress, aProgressMax) { console.log('on progress'); },
    onStatus : function (aRequest, aContext, aStatus, aStatusArg) { console.log('on status'); },

    onRedirect : function (aOldChannel, aNewChannel) { console.log('on redirect'); },

    QueryInterface : function(aIID) {
        console.log("queryinterface: " +aIID);
        console.log("the id for httpchannel: " +Ci.nsIHttpChannel);

        if (aIID.equals(Ci.nsISupports) ||
                aIID.equals(Ci.nsIInterfaceRequestor) ||
                aIID.equals(Ci.nsIChannelEventSink) ||
                aIID.equals(Ci.nsIProgressEventSink) ||
                aIID.equals(Ci.nsIHttpEventSink) ||
                aIID.equals(Ci.nsIHttpChannel) || // added
                aIID.equals(Ci.nsIStreamListener))
            return this;

        throw Cr.NS_NOINTERFACE;
    }
};


   var gChannel;
  
  // init the channel
   
   // the IO service
   var ioService = Cc["@mozilla.org/network/io-service;1"]
                             .getService(Ci.nsIIOService);
                              
   // create an nsIURI
   var uri = ioService.newURI('http://cs.helsinki.fi', null, null);
                               
   // get a channel for that nsIURI
   gChannel = ioService.newChannelFromURI(uri);
                                
   // get an listener
   var listener = new StreamListener(callbackFunc);
                                 
   gChannel.notificationCallbacks = listener;
   console.log("open channel");
   gChannel.asyncOpen(listener, null);

function StreamListener(callbackFunc) {
    console.log("set callbackfunc");
    this.mCallbackFunc = callbackFunc;
}

function processSecurityState(secInfo) {
	secInfo.QueryInterface(Ci.nsITransportSecurityInfo);
	let state = NO_INFO;
	state = securityState(secInfo);
}

// Check security state flags
function securityState(secInfo) {
      console.log("hi from sec state");
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


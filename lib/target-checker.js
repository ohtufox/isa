exports.checkTarget = checkTarget;
function checkTarget(url) {
console.log('asdf');
}
function callbackFunc(url) {
console.log('asdfjee' + url);
}
const {Cc, Ci, Cu, components} = require("chrome");
/*
let gChannel; 
let listener = new StreamListener(function() {console.log('joku toimii');});
function checkTarget(url) {
    console.log('päästiin checktargettiin');
    createChannel(url);
    gChannel.notificationCallbacks = listener;
    console.log('seuraavana avaus' + gChannel);
    gChannel.asyncOpen(listener, null);
    console.log('seuraavana lopetus');
}

function sendRequest() {

}

function createChannel(url) {
    let ioService = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
    let uri = ioService.newURI(url, null, null);
    console.log(uri);
    gChannel = ioService.newChannelFromURI(uri);
}
*/
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
                                 gChannel.asyncOpen(listener, null);
function StreamListener(aCallbackFunc) {
    this.mCallbackFunc = aCallbackFunc;
}

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
    },

    onStopRequest: function (aRequest, aContext, aStatus) {
        if (components.isSuccessCode(aStatus)) {
            this.mCallbackFunc(this.mData);
        } else {
            this.mCallbackFunc(null);
        }

        gChannel = null;
    },

    onChannelRedirect: function (aOldChannel, aNewChannel, aFlags) {
        gChannel = aNewChannel;
    },

    getInterface: function (aIID) {
        try {
            return this.QueryInterface(aIID);
        } catch (e) {
            throw Cr.NS_NOINTERFACE;
        }
    },

    onProgress : function (aRequest, aContext, aProgress, aProgressMax) { },
    onStatus : function (aRequest, aContext, aStatus, aStatusArg) { },

    onRedirect : function (aOldChannel, aNewChannel) { },

    QueryInterface : function(aIID) {
        if (aIID.equals(Ci.nsISupports) ||
                aIID.equals(Ci.nsIInterfaceRequestor) ||
                aIID.equals(Ci.nsIChannelEventSink) ||
                aIID.equals(Ci.nsIProgressEventSink) ||
                aIID.equals(Ci.nsIHttpEventSink) ||
                aIID.equals(Ci.nsIStreamListener))
            return this;

        throw Cr.NS_NOINTERFACE;
    }
};


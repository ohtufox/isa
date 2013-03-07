exports.isSecure = isSecure;

let widget = require("https-widget.js");

// Check if a connection is secure by listening to HTTP-response events that contain SSL info.
function isSecure() {

   const {Cc, Ci, Cu} = require("chrome");
    let events = require("sdk/system/events"); // Listen to events from Firefox (observer notifications)

    // Catch the HTTP request coming from the address bar.
    
    // Event: Incoming HTTP(S) response.
    //events.on("http-on-examine-cached-response", function (event) {
    //events.on("http-on-examine-response", function (event) {
    //events.on("http-on-opening-request", function (event) {
    
//    events.on("http-on-examine-merged-response", function (event) {
//       httpEvent(Ci, event);   
//    });
    
    events.on("http-on-modify-request", function (event) {    
       httpEvent(Ci, event);   
    });

    
};

// Handle event
function httpEvent(Ci, event) {
let state = "";

let channel = event.subject.QueryInterface(Ci.nsIHttpChannel);
       let secInfo = channel.securityInfo;
       console.log('Security change: ' +secInfo);
       console.log("Channel name: " + channel.name + "\n");
       //console.log("Channel uri: " +event.subject.URI.spec);

       // Print channel info
       if (secInfo instanceof Ci.nsITransportSecurityInfo) {
        console.log("name: " + channel.name + "\n");
        secInfo.QueryInterface(Ci.nsITransportSecurityInfo);
        
        state = securityState(secInfo, Ci);
        console.log("\tSecurity state: " + state);
        widget.widgetPrint(state);   
       }
       else {
        console.log("\n\n\n\n" +"Setting state: "  +state + "\n\n\n\n");
        state = "No security info available."
        console.log("\tNo security info available for this channel\n");
        widget.widgetPrint(state);
       }

      // Print SSL certificate details
      if (secInfo instanceof Ci.nsISSLStatusProvider) {
        let cert = secInfo.QueryInterface(Ci.nsISSLStatusProvider).SSLStatus.QueryInterface(Ci.nsISSLStatus).serverCert;
        certInfo(cert, Ci);
      }
}

// Check security state flags
function securityState(secInfo, Ci) {
     
        if ((secInfo.securityState & Ci.nsIWebProgressListener.STATE_IS_SECURE) == Ci.nsIWebProgressListener.STATE_IS_SECURE) {
            return "Secure";
}

        else if ((secInfo.securityState & Ci.nsIWebProgressListener.STATE_IS_INSECURE) == Ci.nsIWebProgressListener.STATE_IS_INSECURE){
            return "Insecure";}

        else if ((secInfo.securityState & Ci.nsIWebProgressListener.STATE_IS_BROKEN) == Ci.nsIWebProgressListener.STATE_IS_BROKEN) {
            console.log("State is broken since: " + secInfo.shortSecurityDescription +
                        "\n" + " and the error message is " +secInfo.errorMessage + "\n");
            return "State is broken.";
        }
};

// Print certificate info
function certInfo(cert, Ci) {    

        console.log("\nCertificate Info:\n");

        let verificationResult = cert.verifyForUsage(Ci.nsIX509Cert.CERT_USAGE_SSLServer);
        console.log("\tStatus: ");

        switch (verificationResult) {
            case Ci.nsIX509Cert.VERIFIED_OK:
                console.log("OK");
                break;
            case Ci.nsIX509Cert.NOT_VERIFIED_UNKNOWN:
                console.log("not verfied/unknown");
                break;
            case Ci.nsIX509Cert.CERT_REVOKED:
                console.log("revoked");
                break;
            case Ci.nsIX509Cert.CERT_EXPIRED:
                console.log("expired");
                break;
            case Ci.nsIX509Cert.CERT_NOT_TRUSTED:
                console.log("not trusted");
                break;
            case Ci.nsIX509Cert.ISSUER_NOT_TRUSTED:
                console.log("issuer not trusted");
                break;
            case Ci.nsIX509Cert.ISSUER_UNKNOWN:
                console.log("issuer unknown");
                break;
            case Ci.nsIX509Cert.INVALID_CA:
                console.log("invalid CA");
                break;
            default:
                console.log("unexpected failure");
                break;
        }
        console.log("\n");

        console.log("\tCommon name (CN) = " + cert.commonName + "\n");
        console.log("\tOrganization = " + cert.organization + "\n");
        console.log("\tIssuer = " + cert.issuerOrganization + "\n");
        console.log("\tSHA1 fingerprint = " + cert.sha1Fingerprint + "\n");

        let validity = cert.validity.QueryInterface(Ci.nsIX509CertValidity);
        console.log("\tValid from " + validity.notBeforeGMT + "\n");
        console.log("\tValid until " + validity.notAfterGMT + "\n");

};

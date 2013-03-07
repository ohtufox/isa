exports.isSecure = isSecure;

// Check whether the provided address contains 'https' or not. Examples:
// http://code.google.com/p/runnersbox/source/browse/trunk/app/chrome/content/main.js?r=48
// http://code.google.com/p/widgeon/source/browse/trunk/jetpack/lib/media-type.js?r=38

function isSecure(address) {
    const {Cc, Ci, Cu} = require("chrome");
    let events = require("sdk/system/events"); // Listen to events from Firefox (observer notifications)

    // The https-code:
    // Event: Incoming HTTP(S) response.
    events.on("http-on-examine-response", function (event) {
       let channel = event.subject.QueryInterface(Ci.nsIHttpChannel);
       let secInfo = channel.securityInfo;
       console.log('Security change: ' +secInfo);
       console.log('Value of response address: ' +address);

       // Print channel info
       if (secInfo instanceof Ci.nsITransportSecurityInfo) {
        console.log("name: " + channel.name + "\n");
        secInfo.QueryInterface(Ci.nsITransportSecurityInfo);

        console.log("\tSecurity state: " + securityState(secInfo, Ci));       
       }
       else {
        console.log("\tNo security info available for this channel\n");
       }

      // Print SSL certificate details
      if (secInfo instanceof Ci.nsISSLStatusProvider) {
        certInfo(secInfo, Ci);        
    }
    
    });

    if (address != undefined) {

    if (address.match(/^https/)) {
       msg = 'HTTPS';
    } else {
       msg = 'HTTP';
    }

    return msg;
    }
};

// 
function securityState(secInfo, Ci) {
     // Check security state flags
        if ((secInfo.securityState & Ci.nsIWebProgressListener.STATE_IS_SECURE) == Ci.nsIWebProgressListener.STATE_IS_SECURE)
            console.log("secure\n");

        else if ((secInfo.securityState & Ci.nsIWebProgressListener.STATE_IS_INSECURE) == Ci.nsIWebProgressListener.STATE_IS_INSECURE)
            console.log("insecure\n");

        else if ((secInfo.securityState & Ci.nsIWebProgressListener.STATE_IS_BROKEN) == Ci.nsIWebProgressListener.STATE_IS_BROKEN)
            console.log("unknown\n");

        console.log("\tSecurity description: " + secInfo.shortSecurityDescription + "\n");
        console.log("\tSecurity error message: " + secInfo.errorMessage + "\n");
    
};

function certInfo(secInfo, Ci) {
    let cert = secInfo.QueryInterface(Ci.nsISSLStatusProvider).
        SSLStatus.QueryInterface(Ci.nsISSLStatus).serverCert;

        console.log("\nCertificate Status:\n");

        let verificationResult = cert.verifyForUsage(Ci.nsIX509Cert.CERT_USAGE_SSLServer);
        console.log("\tVerification: ");

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
        console.log("\tOrganisation = " + cert.organization + "\n");
        console.log("\tIssuer = " + cert.issuerOrganization + "\n");
        console.log("\tSHA1 fingerprint = " + cert.sha1Fingerprint + "\n");

        let validity = cert.validity.QueryInterface(Ci.nsIX509CertValidity);
        console.log("\tValid from " + validity.notBeforeGMT + "\n");
        console.log("\tValid until " + validity.notAfterGMT + "\n");
};

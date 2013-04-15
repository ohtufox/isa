exports.isSecure = isSecure;

const {Cc, Ci, Cu} = require("chrome");
const nsISSLStatusProvider = Ci.nsISSLStatusProvider;
const nsISSLStatus = Ci.nsISSLStatus;

// Check if SSLStatus exists. It only exists on secure pages.
function isSecure(window) {
    
    let gBrowser = window.gBrowser;
    let ui = gBrowser.securityUI;
    let statusProvider = ui.QueryInterface(nsISSLStatusProvider);
    let sslStatus;

    if (statusProvider) {
       sslStatus = statusProvider.SSLStatus;
    }

    if (sslStatus) {
       console.log("HTTPS");
       //printInfo(sslStatus);
       return 'HTTPS';
    } else {
       console.log("HTTP");
       return 'HTTP';
    }
};

function printInfo(sslStatus) {

  if (sslStatus.isDomainMismatch) {
     console.log("Domain mismatch");
  }

  if (sslStatus.isNotValidAtThisTime) {
    console.log("Certificate not valid.");
  }

  // Untrusted: sstStatus.isUntrusted
  // Self signed: sslStatus.serverCert.isSelfSigned
}

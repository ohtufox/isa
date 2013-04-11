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
       //printInfo(sslStatus, ui);
       return 'HTTPS';
    } else {
       console.log("HTTP");
       return 'HTTP';
    }
};

function printInfo(sslStatus, ui) {
  sslStatus = sslStatus.QueryInterface(nsISSLStatus);
  
  console.log("Status: " +sslStatus);
  console.log("State (SECURE = 2): " +ui.state);
  console.log("Certificate: " +sslStatus.serverCert);
  console.log("Issuername: " +sslStatus.serverCert.issuerOrganization);
  console.log("Algorithm: " +sslStatus.cipherName);
  console.log("Encryption strength: " +sslStatus.secretKeyLength);
}

exports.isSecure = isSecure;

const {
    Cc, Ci, Cu
} = require("chrome");
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
        return 'HTTPS';
    } else {
        return 'HTTP';
    }
};

exports.activateHttpResponseEventListener = activateHttpResponseEventListener;

const {Cc, Ci, Cu} = require("chrome");
let widget = require("https-widget.js");

// Default values
let STATE_IS_SECURE = "Secure";
let STATE_IS_INSECURE = "Insecure";
let STATE_IS_BROKEN = "Broken state";
let NO_INFO = "No info available";

// Cert table
let table = createCertStates();

// Check if a connection is secure by listening to HTTP-response events that contain SSL info.
function activateHttpResponseEventListener() {
	
	let events = require("sdk/system/events"); // Listen to events from Firefox (observer notifications)

	events.on("http-on-examine-response", function (event) {
        	httpEvent(event);
	});
};

// Handle event
function httpEvent(event) {
	let channel = event.subject.QueryInterface(Ci.nsIHttpChannel);
	let secInfo = channel.securityInfo;
	console.log("\n" +"Name: " + channel.name);

	// Print channel info
	if (secInfo instanceof Ci.nsITransportSecurityInfo) {
		processSecurityState(secInfo);
        } else {
		console.log("Setting state: " + state);
		let state = NO_INFO;
		console.log(state);
		widget.widgetPrint(state);
        }

        // Print SSL certificate details
	if (secInfo instanceof Ci.nsISSLStatusProvider) {
		let cert = secInfo.QueryInterface(Ci.nsISSLStatusProvider).SSLStatus.QueryInterface(Ci.nsISSLStatus).serverCert;
		certInfo(cert);
        }
}

// Update the state to widget.
function processSecurityState(secInfo) {
	secInfo.QueryInterface(Ci.nsITransportSecurityInfo);
	let state = securityState(secInfo);
	console.log("Security state: " + state);
	widget.widgetPrint(state);
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

// Print certificate info
function certInfo(cert) {

	console.log("\nCertificate Info:\n");
	let verificationResult = cert.verifyForUsage(Ci.nsIX509Cert.CERT_USAGE_SSLServer);
	console.log("Status: ");

	console.log("Verificationresult: " +table[verificationResult]);

	console.log("\n");
	console.log("\tCommon name (CN) = " + cert.commonName + "\n");
	console.log("\tOrganization = " + cert.organization + "\n");
        console.log("\tIssuer = " + cert.issuerOrganization + "\n");
        console.log("\tSHA1 fingerprint = " + cert.sha1Fingerprint + "\n");
        let validity = cert.validity.QueryInterface(Ci.nsIX509CertValidity);
        console.log("\tValid from " + validity.notBeforeGMT + "\n");
        console.log("\tValid until " + validity.notAfterGMT + "\n");
};

// Create a table with certificate states
function createCertStates() {
	let table = new Object();
	table[Ci.nsIX509Cert.VERIFIED_OK] = 'OK';
	table[Ci.nsIX509Cert.NOT_VERIFIED_UNKNOWN] = 'unverified certificate';
	table[Ci.nsIX509Cert.CERT_REVOKED] = 'revoked certificate';
	table[Ci.nsIX509Cert.CERT_EXPIRED] = 'expired certificate';
	table[Ci.nsIX509Cert.CERT_NOT_TRUSTED] = 'untrusted certificate';
	table[Ci.nsIX509Cert.ISSUER_NOT_TRUSTED] = 'untrusted issuer';
	table[Ci.nsIX509Cert.ISSUER_UNKNOWN] = 'unknown issuer';
	table[Ci.nsIX509Cert.INVALID_CA] = 'invalid CA';
	table['default'] = 'unexpected failure'; // Miten toteuttaa?

	return table;
}

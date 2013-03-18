exports.getHtmlFolder = getHtmlFolder;
exports.addCertificate = addCertificate;

const HTML_FOLDER = '/tests/html';

function getHtmlFolder(testModuleUri) {
	let rootFolder = getRootFolder(testModuleUri);
	let htmlFolder = rootFolder + HTML_FOLDER;
	return htmlFolder;	
}

function getRootFolder(moduleUri) {
	let testHelperUri = moduleUri;
	let testFolderPattern = '/tests/';
	let rootFolderLeftovers = testHelperUri.substr(testHelperUri.lastIndexOf(testFolderPattern));
	let rootFolder = testHelperUri.replace(rootFolderLeftovers, '');
	return rootFolder;
}

function addCertificate (testUrl) {
Request({
  url: testUrl,
  onComplete: function(response)
  {
    let status = null;
    try
    {
      status = response.status;
    } catch(e) {}

    if (!status)
    {
      // There was a connection error, probably a bad certificate
      let {Cc, Ci} = require("chrome");

      let badCerts = Cc["@mozilla.org/security/recentbadcerts;1"]
                       .getService(Ci.nsIRecentBadCertsService);
      let status = badCerts.getRecentBadCert(host + ":" + port);
      if (status)
      {
        let overrideService = Cc["@mozilla.org/security/certoverride;1"]
                                .getService(Ci.nsICertOverrideService);
        overrideService.rememberValidityOverride(host, port, status.serverCert,
                                Ci.nsICertOverrideService.ERROR_UNTRUSTED, false);

        // Override added, now you should re-do the request
      }
    }
  }
});

} 

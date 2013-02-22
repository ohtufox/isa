let https = require("https-checker.js");
let tabs = require("sdk/tabs"); // Get tabs

exports["detect https from URL"] = function(assert) {

      // Go to http website
      let insecureUrl = 'google.com';
      tabs.open(insecureUrl);

      // Get site state
      let connectionState = https.isSecure(tabs.activeTab.url);
      assert.assertEqual(connectionState, "Insecure connection");
      tabs.activeTab.close;
}

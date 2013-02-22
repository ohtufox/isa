let https = require("https-checker.js");
let tabs = require("sdk/tabs"); // Get tabs
let browser = require("sdk/deprecated/tab-browser");

exports.http = function(assert) {
  assert.waitUntilDone();
    let url = "data:text/html";
    require("sdk/deprecated/tab-browser").addTab(
      url,
      {
        onLoad: function(e) {
          assert.assertEqual(tabs.activeTab.url, url);
          let connectionState = https.isSecure(tabs.activeTab.url);
          assert.assertEqual(connectionState, "Insecure connection");
          assert.done();
        }
      }
    );
};

exports.https = function(assert) {
  assert.waitUntilDone();
    let url = "https://github.com/";
    require("sdk/deprecated/tab-browser").addTab(
      url,
      {
        onLoad: function(e) {
          assert.assertEqual(tabs.activeTab.url, url);
          let connectionState = https.isSecure(tabs.activeTab.url);
          assert.assertEqual(connectionState, "Secure connection");
          assert.done();
        }
      }
    );
};



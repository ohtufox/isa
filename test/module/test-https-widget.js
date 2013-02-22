let https = require("https-checker.js");
let tabs = require("sdk/tabs"); // Get tabs
let browser = require("sdk/deprecated/tab-browser");


exports.http = function(assert) {
  assert.waitUntilDone();
    let url = "http://www.cs.helsinki.fi/home/";
    require("sdk/deprecated/tab-browser").addTab(
      url,
      {
        onLoad: function(e) {
          assert.assertEqual(tabs.activeTab.url, url);
          let connectionState = https.isSecure(tabs.activeTab.url);
          assert.assertEqual(connectionState, "HTTP");
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
          assert.assertEqual(connectionState, "HTTPS");
          assert.done();
        }
      }
    );
};


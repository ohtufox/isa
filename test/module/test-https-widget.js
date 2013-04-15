let https = require('https-checker.js');
let tabs = require('sdk/tabs');
let browser = require('sdk/tabs/utils');
let testHelper = require('test-helper');
let utils = require("window/utils");

let HTTP_URL = testHelper.getHtmlFolder(module.uri) + '/test.html';

exports.http = function(assert) {
       assert.waitUntilDone();
       let url = HTTP_URL;

       let tab = tabs.open(url);
       tabs.on('ready', function(tab) {
       assert.assertEqual(tabs.activeTab.url, url);

       let window = utils.getMostRecentBrowserWindow();       
       let connectionState = https.isSecure(window);
       assert.assertEqual(connectionState, 'HTTP');
       assert.done();
    });
};

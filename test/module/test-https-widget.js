let https = require('https-checker.js');
let tabs = require('sdk/tabs');
let browser = require('sdk/tabs/utils');
let testHelper = require('test-helper');
let utils = require("window/utils");

let HTTP_URL = testHelper.getHtmlFolder(module.uri) + '/test.html';
let HTTPS_URL = 'https://www.eff.org/';
/*
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
*/
exports.https = function(assert) {
       assert.waitUntilDone();
       let url2 = HTTPS_URL;

       console.log("testing https");
       let tab = tabs.open(url2);
       
       tabs.on('ready', function(tab) {
       console.log("site ready, asserting");
       assert.assertEqual(tab.url, url2);
       console.log("assertion complete " +tab.url);

       let window = utils.getMostRecentBrowserWindow();       
       let connectionState = https.isSecure(window);
       assert.assertEqual(connectionState, 'HTTPS');
       assert.done();
    });
};


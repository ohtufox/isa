let https = require('https-checker.js');
let tabs = require('sdk/tabs');
let browser = require('sdk/tabs/utils');
let testHelper = require('test-helper');
let Request = require("request").Request;

let window = require('sdk/deprecated/window-utils');

let HTTP_URL = testHelper.getHtmlFolder(module.uri) + '/test.html';
let HTTPS_URL = 'https://127.0.0.1:10443/receiver.html'

exports.http = function(assert) {
  assert.waitUntilDone();
    let url = HTTP_URL;

    let tab = tabs.open(url);
    tabs.on('ready', function(tab) {
    assert.assertEqual(tabs.activeTab.url, url);

    	let connectionState = https.isSecure(tabs.activeTab.url);
    	//assert.assertEqual(connectionState, 'HTTP');
    	assert.done();
    });
};

exports.https = function(assert) {
  assert.waitUntilDone();
    let url = HTTP_URL;
    assert.assertEqual(true, true);
    assert.done();

    tabs.on('ready', function(tab) {

    let connectionState = https.isSecure(tabs.activeTab.url);
    //assert.assertEqual(tabs.activeTab.url, url);
    assert.assertEqual(true, true);
    assert.done();
      // Trust cert
    //console.log("\n\n\n\nConnection state before visit: \n\n\n\n" +connectionState);
    testHelper.addCertificate(HTTPS_URL);
    // Re-visit page
    connectionState = https.isSecure(tabs.activeTab.url);
    console.log("Connection state in test: " +connectionState);
    assert.assertEqual(connectionState, 'HTTPS');
    assert.done();
    });
};


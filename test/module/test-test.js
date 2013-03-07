'use strict';

// Testing for working tests.
exports.testTesting1 = function(test) {
    test.waitUntilDone();
    const url = 'data:text/html;charset=utf-8,<html><head><title>foo</title></head></html>';
    const titleToCheck = 'foo';
    require('sdk/deprecated/tab-browser').addTab(url, 
        {
            onLoad: function(e) {
                checkUrlTitle(test, url, titleToCheck);
            }
        }
    );
};

exports.testTesting2 = function(test) {
    test.waitUntilDone();
    let testHelper = require('test-helper');
    const url = testHelper.getHtmlFolder(module.uri) + '/test.html';
    const titleToCheck = 'Testisivu';
    require('sdk/deprecated/tab-browser').addTab(url,
        {
            onLoad: function(e) {
                checkUrlTitle(test, url, titleToCheck);
            }
        }
    );
};

function checkUrlTitle(test, url, title) {
    let tabs = require('sdk/tabs');
    test.assert(tabs.activeTab);
    test.assertEqual(tabs.activeTab.url, url);
    test.assertEqual(tabs.activeTab.title, title);
    test.done();
}

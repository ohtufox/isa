'use strict';

// Testing for working tests.
exports.testTesting1 = function(test) {
  test.waitUntilDone();
    let tabs = require('sdk/tabs');

    let url = 'data:text/html;charset=utf-8,<html><head><title>foo</title></head></html>';
    require('sdk/deprecated/tab-browser').addTab(
      url,
      {
        onLoad: function(e) {
          test.assert(tabs.activeTab);
          test.assertEqual(tabs.activeTab.url, url);
          test.assertEqual(tabs.activeTab.title, 'foo');
          test.done();
        }
      }
    );
};

exports.testTesting2 = function(test) {
  test.waitUntilDone();
    let tabs = require('sdk/tabs');
    let testHelper = require('test-helper');
    const url = testHelper.getHtmlFolder(module.uri) + '/test.html';
    require('sdk/deprecated/tab-browser').addTab(
      url,
      {
        onLoad: function(e) {
          test.assert(tabs.activeTab);
          test.assertEqual(tabs.activeTab.url, url);
          test.assertEqual(tabs.activeTab.title, "Testisivu");
          test.done();
        }
      }
    );
};

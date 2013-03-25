'use strict';

exports['Tests testHelpers url creation functionality'] = function(assert) {
    assert.waitUntilDone();
    let tabs = require('sdk/tabs');
    let testHelper = require('test-helper');
    const url = testHelper.getHtmlFolder(module.uri) + '/test.html';
    const titleToCheck = 'Testisivu';
    tabs.open({
        url: url,
        onReady: function (tab) {
            console.log('Testisivu ladattu... ' + tab.title + tab.url);
            assert.assertEqual(tab.url, url);
            assert.assertEqual(tab.title, titleToCheck);
            assert.done();
        }
    });
};

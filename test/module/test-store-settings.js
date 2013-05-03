/*
let storage = require("store-settings");
let testHelper = require('test-helper');
let tabs = require('sdk/tabs');
let script = 'self.port.on("test-send-request", function() {' + 'self.port.emit("request-storage-status");});' + 'self.port.on("storage-status", function(status) {self.port.emit("test-requested-status", status);});' + 'self.port.on("test-change-used", function() {' + 'self.port.emit("used");});' + '';

exports['test settings status is false first time'] = function(assert) {
    assert.waitUntilDone();
    let url = testHelper.getHtmlFolder(module.uri) + '/test.html';
    tabs.open(url);
    tabs.on('ready', function(tab) {
        let worker = tab.attach({
            contentScript: script
        });

        storage.messaging(worker);

        worker.port.emit('test-send-request');
        worker.port.on("test-requested-status", function(status) {
            assert.assert(!status);
            assert.done();
        });
    });
}


exports['test settings status is true after first time'] = function(assert) {
    assert.waitUntilDone();
    let url = testHelper.getHtmlFolder(module.uri) + '/test.html';
    tabs.open(url);
    tabs.on('ready', function(tab) {
        let worker = tab.attach({
            contentScript: script
        });

        storage.messaging(worker);
        worker.port.emit('test-change-used');
        worker.port.emit('test-send-request');
        worker.port.on("test-requested-status", function(status) {
            assert.assert(status);
            assert.done();
        });
    });
}
*/

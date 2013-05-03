/*
let fieldFinder = require("field-finder");

exports.findPasswordFieldsTest1 = function(test) {
    test.waitUntilDone();
    let url = 'test.html';
    let tabs = require("sdk/tabs");
    require("sdk/deprecated/tab-browser").addTab(
        url, {
        onLoad: function(e) {
            test.assert(tabs.activeTab);

        }

    });
};

let tabs = require('sdk/tabs');
tabs.on('open', function(tab) {
    tab.on('ready', function(tab) {
        console.log(tab.url);
    });
});

exports["test fieldFinder findPasswordFields1"] = function(assert) {
    assert.equal(fieldFinder.findPasswordFields(), null, "Tests that without page there is no password fields.");
}
exports["test fieldFinder findPasswordFields2"] = function(test) {
    test.waitUntilDone();
    tabs.open("http://www.example.com");
    let fields = fieldFinder.findPasswordFields();
    let fieldCount = fields.length;
    console.log('kenttiä: ' + fields);

}

require("test").run(exports);
*/

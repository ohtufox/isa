let infopanel = require("info-panel");
let testHelper = require('test-helper');
let tabs = require('sdk/tabs');
let panel = require('panel');
let script = 'self.port.on("test-send-message-to-panel", function() {'
            +'self.port.emit("info", "test");});'
            +'self.port.on("msg", function(msg) {self.port.emit("test-got-message", msg);});'
            
exports["test info-panel opens"] = function(assert) {
    //assert.waitUntilDone();
    assert.waitUntilDone();
    let url = testHelper.getHtmlFolder(module.uri) + '/test.html';
    tabs.open(url);
    tabs.on('ready', function(tab) {
        let worker = tab.attach({		
            contentScript: script
        });
        
        infopanel.initPanel(worker);
        worker.port.emit('test-send-message-to-panel');
        worker.port.on("test-got-message", function(message) {
            //assert.assertEquals("test", message);
            console.log(message);
            assert.pass("");
            assert.done();
        });
    });
    
};

require("test").run(exports);

// exports["test info-panel opens"] = function(assert) {
	// let newPanel = infopanel.showPanel("test");
	// if(newPanel instanceof panel.Panel) {
		// assert.pass("panel open");
	// } 
	// else {
		// assert.fail("panel not open");
	// }	
// };

//require("test").run(exports);

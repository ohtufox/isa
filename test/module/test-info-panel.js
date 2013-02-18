var infopanel = require("info-panel");
var panel = require('panel');

exports["test info panel opens"] = function(assert) {
	let newPanel = infopanel.showPanel();
	if(newPanel instanceof panel.Panel) {
		assert.pass("panel open");
	} 
	else {
		assert.fail("panel not open");
	}	
};

require("test").run(exports);

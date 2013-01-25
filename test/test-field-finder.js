var fieldFinder = require("field-finder");

exports["test fieldFinder findPasswordFields"] = function(assert) {
	assert.equal(fieldFinder.findPasswordFields(), null, "Tests that without page there is no password fields.");	
}

require("test").run(exports);

exports.findPasswordFields = findPasswordFields;

function findPasswordFields() {
	let {Cc, Ci} = require("chrome");
	let mediator = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator);
	let doc = mediator.getMostRecentWindow("navigator:browser").document;
	let fields = doc.href;
	console.log('HELLO: ' + doc.href);
	return fields;
}

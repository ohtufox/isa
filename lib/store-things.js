exports.messaging = messaging;
var ss = require("simple-storage");

ss.storage.usedBefore = false;

function messaging(worker) {
	worker.port.on('used', function() {
		ss.storage.usedBefore = true;
	});
	
	worker.port.on('ask-if-used', function() {
		worker.port.emit('storage-status', ss.storage.usedBefore);
	}); 
}
exports.messaging = messaging;
var ss = require("simple-storage");

ss.storage.usedBefore = false;

function messaging(worker) {
	worker.port.on('used', function(msg) {
		console.log('saatu viesti used');
		ss.storage.usedBefore = true;
	});
	
	worker.port.on('isUsed', function(data) {
		console.log('saatu viesti isUsed, lähetetään status');
		worker.port.emit('storage-status', ss.storage.usedBefore);
	}); 
}
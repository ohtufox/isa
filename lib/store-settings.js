exports.messaging = messaging;
exports.pwdPeekedBefore = pwdPeekedBefore;

let ss = require("simple-storage");
ss.storage.pwdPeekUsedBefore = false;

function pwdPeekedBefore() {
    return ss.storage.pwdPeekUsedBefore;
}

function messaging(worker) {
    worker.port.on('used', function() {
        ss.storage.pwdPeekUsedBefore = true;
    });

    worker.port.on('request-storage-status', function() {
        worker.port.emit('storage-status', ss.storage.pwdPeekUsedBefore);
    });
}

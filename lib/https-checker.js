exports.isSecure = isSecure;

// Check whether the provided address contains 'https' or not.
function isSecure(address) {
    if (address != undefined) {
        let msg;
        if (address.match(/^https/)) {
            msg = 'HTTPS';
        } else {
            msg = 'HTTP';
        }
        return msg;
    }
};

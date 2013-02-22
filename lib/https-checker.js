exports.isSecure = isSecure;

// Check whether the provided address contains 'https' or not.
function isSecure(address) {

    if (address != undefined) {

    let msg = "";

    if (address.match(/^https/)) {
       msg = "Secure connection";
    } else {
       msg = "Insecure connection";
    }

    return msg;
    }
};

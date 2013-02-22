exports.isSecure = isSecure;

// Check whether the provided address contains 'https' or not.
function isSecure(address) {

    // Interesting : http://code.google.com/p/widgeon/source/browse/trunk/jetpack/lib/media-type.js?r=38
    let uriLoader = Cc['@mozilla.org/uriloader;1'].getService(Ci.nsIURILoader);
    console.log('');

    if (address != undefined) {

    let msg = 'Uriloader is: ' +uriLoader;

    if (address.match(/^https/)) {
       msg = 'HTTPS';
    } else {
       msg = 'HTTP';
    }

    return msg;
    }
};

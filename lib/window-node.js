exports.getElement = getElement;
exports.getFields = getFields;

let {Cc,Ci} = require("chrome");
function getDom() {
    try {
        let dom = Cc['@mozilla.org/appshell/window-mediator;1']
            .getService(Ci.nsIWindowMediator)
            .getMostRecentWindow('navigator:browser')
            .gBrowser.contentWindow.document;
 
        return dom;
 
    } catch(e) {
        console.log(e);
    }
}

function getElement(selector) {
    let dom = getDom();
    return dom.querySelector(selector);
}


function getFields(selector) {
    let dom = getDom();
    return dom.getElementsByTagName(selector);
}

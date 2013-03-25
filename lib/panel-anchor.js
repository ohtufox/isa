exports.getWindowNode = getWindowNode;

let {Cc,Ci} = require("chrome");
function getWindowNode(selector) {
    try {
        let dom = Cc['@mozilla.org/appshell/window-mediator;1']
            .getService(Ci.nsIWindowMediator)
            .getMostRecentWindow('navigator:browser')
            .gBrowser.contentWindow.document;
 
        return dom.querySelector(selector);
 
    } catch(e) {
        console.log(e);
    }
}


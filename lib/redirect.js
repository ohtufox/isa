exports.init = init;

const XMLHttpRequest = require("xhr").XMLHttpRequest;
const req = new XMLHttpRequest();

let tab = '';
let httpsUrl = '';

function init(currentTab, worker) {
    tab = currentTab;
    if (!tab.url.match(/^https/)) {
        httpsUrl = resolveHttpsUrl(tab.url);
        sendHttpRequestToHttpsUrl();
    }
}

function resolveHttpsUrl(url) {
    return url.replace("http", "https");       
}

function sendHttpRequestToHttpsUrl() {
    console.log(httpsUrl, tab.url);
    req.onreadystatechange = redirectToUrl;
    req.open("HEAD", httpsUrl, true);
    req.send('');    
}

function redirectToUrl() {
    console.log(req.readyState + " "+req.status );
    if(req.readyState == 4) {
        if(req.status == 200) {
            console.log("headers: "+ req.getAllResponseHeaders());
            console.log("old url: "+tab.url+", new url: "+httpsUrl);
            tab.url = httpsUrl;    
        } else {
            console.log("no bonus: "+req.status);
        }
    }    
}

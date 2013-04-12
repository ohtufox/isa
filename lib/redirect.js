exports.init = init;
exports.redirectToHttpsPage = redirectToHttpsPage;

const XMLHttpRequest = require("xhr").XMLHttpRequest;
const req = new XMLHttpRequest();

let redirectWorker = '';
let tab = '';
let httpsUrl = '';


function init(currentTab, worker) {
    tab = currentTab;
    redirectWorker = worker; 
    prepareRedirect();
}

function prepareRedirect() {
    if (!tab.url.match(/^https|^about/)) {
        httpsUrl = resolveHttpsUrl(tab.url);
        sendHttpRequestToHttpsUrl();
    }
}

function resolveHttpsUrl(url) {
    return url.replace("http", "https");       
}

function sendHttpRequestToHttpsUrl() {
    console.log(httpsUrl, tab.url);
    req.onreadystatechange = checkIfHttpsPageExists;
    req.open("HEAD", httpsUrl, true);
    req.send('');    
}

function checkIfHttpsPageExists() {
    console.log(req.readyState + " "+req.status );
    if(req.readyState == 4) {
        if(req.status == 200) {
            console.log("headers: "+ req.getAllResponseHeaders());
            console.log("old url: "+tab.url+", new url: "+httpsUrl);
            redirectWorker.port.emit('https-page-exists');

            if (require("sdk/simple-prefs").prefs.SSLRedirect) {
                redirectToHttpsPage();                
            } 
        } else {
            console.log("no bonus: "+req.status);
        }
    }    
}

function redirectToHttpsPage() {
    tab.url = httpsUrl;
}
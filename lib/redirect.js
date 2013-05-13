exports.init = init;
exports.httpsPageExists = httpsPageExists;
exports.redirectToHttpsPage = redirectToHttpsPage;

const XMLHttpRequest = require("xhr").XMLHttpRequest;
const req = new XMLHttpRequest();

const notifications = require("sdk/notifications");
const self = require('self');
const selector = require('window-node.js');
let redirectWorker = '';
let tab = '';
let httpsUrl = '';
let httpsPage = false;

function httpsPageExists() {
    return httpsPage;
}

function init(currentTab, worker) {
    redirectWorker = worker;
    tab = currentTab;
    let hasPwdFields = lookForPwdFields(selector.getFields('input'));
    if (!tab.url.match(/^https|^about/) && hasPwdFields) {
        httpsUrl = resolveHttpsUrl(tab.url);
        sendRequestToHttpsUrl();
    }
}

function resolveHttpsUrl(url) {
    return url.replace("http", "https");
}

function sendRequestToHttpsUrl() {
    console.log(httpsUrl, tab.url);
    req.onreadystatechange = httpsPageResponse;
    req.open("HEAD", httpsUrl, true);
    req.send('');
}

function httpsPageResponse() {
    if (req.readyState !== 4) {
        return;
    }
    if (req.status == 200) {
        console.log("old url: " + tab.url + ", new url: " + httpsUrl);
        httpsPage = true;
        if (require("sdk/simple-prefs").prefs.SSLRedirect) {
            redirectToHttpsPage();
        }
    } else {
        httpsPage = false;
        console.log("no https page: " + req.status);
    }
}

function redirectToHttpsPage() {
    tab.url = httpsUrl;
    tab.onOpen = redirectNotification();
}

function redirectNotification() {
    var myIconURL = self.data.url("icons/information_32.png");
    notifications.notify({
        title: "Redirected",
        text: "'You have been redirected to secure version of this site",
        iconURL: myIconURL,
    });
}

function lookForPwdFields(fields) {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i].type === 'password') return true;
    }
    return false;
}

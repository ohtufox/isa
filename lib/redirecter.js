exports.init = init;

function init(tab, worker) {
    tabInUse = tab;
    if (!tab.url.match(/^https/)) {
        let newUrl = resolveUrl(tab.url);
        worker.port.on('redirect', function() {
            tab.url = newUrl;
        });
    }	
}


function resolveUrl(url) {
    return url.replace("http", "https");
}

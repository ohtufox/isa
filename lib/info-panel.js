exports.initPanel = initPanel;
exports.showPanel = showPanel;
exports.createPanel = createPanel;

let panels = require('panel');
let panelAnchor = require('window-node.js');
let data = require("self").data;
let redirect = require("redirect.js");

function initPanel(worker) {
    worker.port.on('info', function(contentUrl) {
        if (contentUrl === 'unsecure-panel' && redirect.httpsPageExists()) {
            let panel = createPanel(217, 160, contentUrl);
            panel.on("show", function() {
                panel.port.emit('add-redirect-dialog');
            });
        } else {
            let panel = createPanel(217, 138, contentUrl);
        }
        showPanel(panel);
    });

    worker.port.on('close-panel', function() {
        panel.hide();
    });
}

function createPanel(panelWidth, panelHeight, contentUrl) {
    panel = panels.Panel({
        width: panelWidth,
        height: panelHeight,
        focus: false,
        contentURL: data.url('html/' + contentUrl + '.html'),
        contentScriptFile: data.url('redirect-dialog.js')
    });

    return panel;
}


function showPanel(panel) {
    panel.port.on('request-redirect', function() {
        redirect.redirectToHttpsPage();
        panel.hide();
    });

    let anchor = panelAnchor.getElement(".anchorclass");
    if (anchor !== null) {
        anchor.className = "";
    }

    panel.show(anchor);
}

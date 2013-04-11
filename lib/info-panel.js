exports.initPanel = initPanel;
exports.showPanel = showPanel;
exports.createPanel = createPanel;

let panels = require('panel');
let panelAnchor = require('panel-anchor.js');
let data = require("self").data;

function initPanel(worker) {
    worker.port.on('info', function(contentUrl) {
        let panel = createPanel(217, 138, contentUrl);
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
        contentURL: data.url("html/"+contentUrl+".html")
    });
    
    return panel;
}


function showPanel(panel) {
    let anchor = panelAnchor.getWindowNode(".anchorclass");
    if (anchor !== null) {
        anchor.className = "";
    }
	
    panel.show(anchor);
    console.log("panel shown");
}



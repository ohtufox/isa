exports.initPanel = initPanel;
exports.showPanel = showPanel;
exports.createPanel = createPanel;

let panels = require('panel');
let panelAnchor = require('panel-anchor.js');
let data = require("self").data;

function initPanel(worker) {
    worker.port.on('info', function(msg) {
        let infoPanel = createPanel(220, 120);
        showPanel(infoPanel, msg);
    });
    
    worker.port.on('close-panel', function() {
        infoPanel.hide();
    });
}

function createPanel(panelWidth, panelHeight) {
	infoPanel = panels.Panel({
		width: panelWidth,
		height: panelHeight,
                focus: false,
		contentURL: data.url("html/infobox.html"),
		contentScriptFile: data.url("show-info-on-panel.js")
	});
    
    return infoPanel;
}


function showPanel(infoPanel, msg) {
    infoPanel.on('show', function() {
        infoPanel.port.emit("msg", msg);
    });
    
    let anchor = panelAnchor.getWindowNode(".anchorclass");
    anchor.className = "";
	
    return infoPanel.show(anchor);
}



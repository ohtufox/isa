exports.initPanel = initPanel;
exports.showPanel = showPanel;

let panels = require('panel');
let panelAnchor = require('panel-anchor.js');
let data = require("self").data;
let infoPanel = '';

function initPanel(worker) {
    worker.port.on('info', function(msg) {
        showPanel(msg);
    });
    
    worker.port.on('close-panel', function() {
        infoPanel.hide();
    });
}

function showPanel(msg) {
	infoPanel = panels.Panel({
		width: 220,
		height: 120,
		contentURL: data.url("html/infobox.html"),
		contentScriptFile: data.url("show-info-on-panel.js"),
		onShow: function() {
			infoPanel.port.emit("msg", msg);
		}
	});
    
    let anchor = panelAnchor.getWindowNode(".anchorclass");
    console.log("anchor: "+anchor);
	
    return infoPanel.show(anchor);
}



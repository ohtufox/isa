exports.showPanel = showPanel;
var panels = require('panel');
var data = require("self").data;

function showPanel(msg) {
	let infoPanel = panels.Panel({
		width: 220,
		height: 220,
		contentURL: data.url("html/infobox.html"),
		contentScriptFile: data.url("show-info-on-panel.js"),
		onShow: function() {
			infoPanel.port.emit("msg", msg);
		}
	});
	
	return infoPanel.show();
}

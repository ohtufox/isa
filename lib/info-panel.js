exports.showPanel = showPanel;
let panels = require('panel');
let data = require("self").data;

function showPanel(msg) {
	let infoPanel = panels.Panel({
		width: 220,
		height: 120,
		contentURL: data.url("html/infobox.html"),
		contentScriptFile: data.url("show-info-on-panel.js"),
		onShow: function() {
			infoPanel.port.emit("msg", msg);
		}
	});
	
	return infoPanel.show();
}

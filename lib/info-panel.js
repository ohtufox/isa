exports.showPanel = showPanel;
var panels = require('panel');

function showPanel() {
	let infoPanel = panels.Panel({
		width: 220,
		height: 220,
		onShow: function() {
			console.log("panel is open");
		}
	});
	
	return infoPanel.show();
}

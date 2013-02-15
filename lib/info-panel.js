exports.showPanel = showPanel;
var panels = require('panel');

// var infoPanel = panels.Panel({
	// width: 220,
	// height: 220,
	// onShow: function() {
		// console.log("panel is open");
	// }
// });

function showPanel() {
	var infoPanel = panels.Panel({
		width: 220,
		height: 220,
		onShow: function() {
			console.log("panel is open");
		}
	});
	
	infoPanel.show();
}
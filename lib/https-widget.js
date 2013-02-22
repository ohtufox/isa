exports.widgetPrint = widgetPrint;

var https = require("https-checker.js");
var tab = require("tabs");
var panel = require("info-panel.js");

// Widget that holds HTTPS-info.
var widget = require("sdk/widget").Widget({
  id: "https-widget",
  label: "Https-widget",
  content: " ",
  width: 100
});

function widgetPrint() {

  var connectionState = https.isSecure(tab.activeTab.url);
  var view = widget.getView(tab.activeTab.window);

  if (!view) return;

  // Update widget displayed text:
  view.content = connectionState;
  panel.showPanel(connectionState);
}


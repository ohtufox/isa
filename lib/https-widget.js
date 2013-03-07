exports.widgetPrint = widgetPrint;

//let https = require("https-checker.js");
let tab = require("tabs");
let panel = require("info-panel.js");

// Widget that holds HTTPS-info.
let widget = require("sdk/widget").Widget({
  id: "https-widget",
  label: "Https-widget",
  content: " ",
  width: 100
});

function widgetPrint(status) {
  console.log("Status in widget: " +status);
  //let connectionState = https.isSecure(tab.activeTab.url);
  let view = widget.getView(tab.activeTab.window);

  if (!view) return;

  // Update widget displayed text:
  view.content = status;
  //panel.showPanel(status);
}

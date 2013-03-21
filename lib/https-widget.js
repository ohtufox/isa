exports.widgetPrint = widgetPrint;

let https = require("https-checker.js");
let tab = require("tabs");
let panel = require("info-panel.js");

// Widget that holds HTTPS-info.
let widget = require("sdk/widget").Widget({
  id: "https-widget",
  label: "Https-widget",
  content: " ",
  width: 100
});

function widgetPrint(current) {
  let connectionState = https.isSecure(current.url);
  let view = widget.getView(current.window);

  if (!view) return;

  // Update widget displayed text:
  view.content = connectionState;
  if (current == tab.activeTab) {
      panel.showPanel(connectionState);
  }
}


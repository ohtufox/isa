exports.createButton = showSettingsToolbarButton;

let tabs = require('tabs');
let data = require('self').data;
let toolbarButton = require('toolbarbutton');

const settingsPage = data.url('html/settings.html');
const isaIcon = 'http://www.mozilla.org/favicon.ico';

function showSettingsToolbarButton() {
    let options = {};
    options.id = 'isa.settingsmenu';
    options.label = 'Settings';
    options.image = isaIcon;
    options.onCommand = openSettingsPage;
    let settingsButton = toolbarButton.ToolbarButton(options);
    settingsButton.moveTo({
        toolbarID: 'nav-bar',
        forceMove: false
    });
}
function openSettingsPage(){
    tabs.open({
        url: settingsPage
    });
}

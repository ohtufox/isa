exports.createButton = showSettingsToolbarButton;

let tabs = require('tabs');
let data = require('self').data;
let toolbarButton = require('toolbarbutton');
let preferences = require('sdk/simple-prefs');

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
        url: settingsPage,
        onReady: settingsPageReadyFunction
    });
}

function settingsPageReadyFunction(tab) {
    let workerOptions = {
        contentScriptFile: [data.url('html/settings.js'),
                            data.url('html/init-settings.js')]
    };
    let worker = tab.attach(workerOptions);
    let settings = loadStoredSettings();
    worker.port.emit('settings', settings);
    worker.port.on('settings', storeSettings);
}

function loadStoredSettings(){
    let settings = {};
    settings.passwordPeek = preferences.prefs['passwordPeek'];
    return settings;
}

function storeSettings(settings) {
    for(let setting in settings) {
        preferences.prefs[setting] = settings[setting];
    }
}
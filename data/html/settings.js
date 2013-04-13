const SETTING_ELEMENTS = {
    passwordPeek : document.getElementById('passwordPeek')
};
const ELEMENT_HANDLERS = {
    checkbox : handleCheckbox
};

self.port.on('settings', function(settings) {
    applySettingsToPage(settings);
});

function applySettingsToPage(settings) {
    for(let setting in settings){
       let element = SETTING_ELEMENTS[setting];
       let value = settings[setting];
       ELEMENT_HANDLERS[element.type](element, value);
    }
}
function handleCheckbox(element, value) {
    element.checked = value;
}

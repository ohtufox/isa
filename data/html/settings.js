(function(settingsMenu, undefined) {
    const SETTING_ELEMENTS = {
        passwordPeek : document.getElementById('passwordPeek')
    };
    const ELEMENT_HANDLERS = {
        checkbox : handleCheckbox
    };
    const VALUE_COLLECTORS = {
        checkbox : getCheckboxValue
    };

    settingsMenu.applySettingsToPage = function(settings) {
        for(let setting in settings){
            let element = SETTING_ELEMENTS[setting];
            let value = settings[setting];
            ELEMENT_HANDLERS[element.type](element, value);
        }
        fixSubmit();
    };
    
    function fixSubmit() {
        let submitButton = document.getElementById('settingsSubmit');
        submitButton.onclick = submitForm;
    }
    
    function submitForm() {
        let settings = collectSettings();
        self.port.emit('settings', settings);
        return false;
    }
    
    function collectSettings() {
        let settings = {};
        for(let setting in SETTING_ELEMENTS) {
            let element = SETTING_ELEMENTS[setting];
            let value = VALUE_COLLECTORS[element.type](element);
            settings[setting] = value;            
        }
        return settings;
    }

    function handleCheckbox(element, value) {
        element.checked = value;
    }

    function getCheckboxValue(element) {
        return element.checked;
    }
}(window.settingsMenu = window.settingsMenu || {}));

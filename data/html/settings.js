(function(settingsMenu, undefined) {
    const SETTING_ELEMENTS = {
        passwordPeek: document.getElementById('passwordPeek'),
        disableUndetermined: document.getElementById('disableUndetermined'),
        enableCustomIcons: document.getElementById('enableCustomIcons'),
        iconWarning: document.getElementById('iconWarning'),
        iconShow: document.getElementById('iconShow'),
        theme: document.getElementById('themeSelection')
    };
    const ELEMENT_HANDLERS = {
        checkbox: handleCheckbox,
        file: handleFile,
        'select-one': handleSelect
    };
    const VALUE_COLLECTORS = {
        checkbox: getCheckboxValue,
        file: getFileContents,
        'select-one': getSelect
    };

    settingsMenu.applySettingsToPage = function(settings) {
        for (let setting in settings) {
            let element = SETTING_ELEMENTS[setting]; // input element
            let value = settings[setting]; // getterin palauttama data
            ELEMENT_HANDLERS[element.type](element, value); // mitä datalla tehdään?
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
        for (let setting in SETTING_ELEMENTS) {
            let element = SETTING_ELEMENTS[setting];
            let value = VALUE_COLLECTORS[element.type](element); // getterin palauttama data
            settings[setting] = value; // palauttaa sen arvona
        }
        return settings;
    }

    function handleCheckbox(element, value) {
        element.checked = value;
    }
    function handleSelect(element, value) {
        element.value = value;
    }

    function getCheckboxValue(element) {
        return element.checked;
    }

    function getSelect(element) {
        return element.value;
    }

    function handleFile(element, value) {
        var span = document.createElement('span');
        span.innerHTML = ['<img class="thumb" src="', value,
                '" title="', "icon", '"/>'
        ].join('');
        document.getElementById(element.name + 'List').insertBefore(span, null);
    }

    let iconWarning = document.getElementById('iconWarning');
    iconWarning.onchange = function(e) {
        uploadFile(iconWarning);
    };
    let iconShow = document.getElementById('iconShow');
    iconShow.onchange = function(e) {
        uploadFile(iconShow);
    };

    let customIcons = document.getElementById('customIcons');
    let themeSection = document.getElementById('theme');
    let enableCustomIcons = document.getElementById('enableCustomIcons');
    customIcons.hidden = !enableCustomIcons.checked;
    themeSection.hidden = enableCustomIcons.checked;

    enableCustomIcons.onchange = function(e) {
        customIcons.hidden = !enableCustomIcons.checked;
        themeSection.hidden = enableCustomIcons.checked;
    };

    function getFileContents(element) {
        return element.data;
    }

    function uploadFile(element) {
        var files = element.files; // FileList object
        let out = document.getElementById(element.name + "List");

        for (var i = 0, f; f = files[i]; i++) {
            if (f.size > 1000000) {
                out.innerHTML = "file must be under 1MB";
                element.data = undefined;
                continue;
            } else if (!f.type.match('image.*')) {
                out.innerHTML = "file must be an image";
                element.data = undefined;
                continue;
            }
            let reader = new FileReader();
            reader.onload = (function(theFile) {
                return function(e) {
                    // Render thumbnail.
                    let span = document.createElement('span');
                    span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'
                    ].join('');
                    if (out.childNodes.length > 0) {
                        out.removeChild(out.childNodes[0]);
                    }
                    out.appendChild(span, null);
                    element.data = e.target.result;
                };
            })(f);
            reader.readAsDataURL(f);
        }
    }

}(window.settingsMenu = window.settingsMenu ||  {}));

(function(settingsMenu, undefined) {
    const SETTING_ELEMENTS = {
        passwordPeek : document.getElementById('passwordPeek'),
        iconWarning : document.getElementById('iconWarning'),
        iconShow : document.getElementById('iconShow')
    };
    const ELEMENT_HANDLERS = {
        checkbox : handleCheckbox,
        file : handleFile
    };
    const VALUE_COLLECTORS = {
        checkbox : getCheckboxValue,
        file : getFileContents
    };

    settingsMenu.applySettingsToPage = function(settings) {
        for(let setting in settings){
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
        for(let setting in SETTING_ELEMENTS) {
            let element = SETTING_ELEMENTS[setting];
            let value = VALUE_COLLECTORS[element.type](element); // getterin palauttama data
            settings[setting] = value; // palauttaa sen arvona
        }
        return settings;
    }

    function handleCheckbox(element, value) {
        element.checked = value;
    }

    function getCheckboxValue(element) {
        return element.checked;
    }

    function handleFile(element, value) {
              var span = document.createElement('span');
              span.innerHTML = ['<img class="thumb" src="', value,
                                '" title="', "icon", '"/>'].join('');
              document.getElementById(element.name + 'List').insertBefore(span, null);
    }

    let iconWarning = document.getElementById('iconWarning');
    iconWarning.onchange = function(e){
        uploadFile(iconWarning);
    };
    let iconShow = document.getElementById('iconShow');
    iconShow.onchange = function(e){
        uploadFile(iconShow);
    };

    function getFileContents(element) {
        return element.data;
    }
    
    function uploadFile(element) {
        var files = element.files; // FileList object
        let out = document.getElementById(element.name+"List");

        for (var i = 0, f; f = files[i]; i++) {
          if (f.size > 1000000) {
              out.innerHTML = "file must be under 1MB";
              continue;
          } else if (!f.type.match('image.*')) {
            out.innerHTML = "file must be an image";
            continue;
          }
         let reader = new FileReader();
         reader.onload = (function(theFile) {
            return function(e) {
              // Render thumbnail.
              let span = document.createElement('span');
              span.innerHTML = ['<img class="thumb" src="', e.target.result,
                                '" title="', escape(theFile.name), '"/>'].join('');
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

}(window.settingsMenu = window.settingsMenu || {}));

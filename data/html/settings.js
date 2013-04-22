(function(settingsMenu, undefined) {
    const SETTING_ELEMENTS = {
        passwordPeek : document.getElementById('passwordPeek'),
        iconWarning : document.getElementById('iconWarning'),
        showIcons : document.getElementById('showIcons')
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
              document.getElementById('iconWarningList').insertBefore(span, null);
    }

    function getFileContents(element) {
        var files = element.files; // FileList object

        for (var i = 0, f; f = files[i]; i++) {
          if (f.size > 1000000) {
              // We probably don't want bunch of 6GB images.
              continue;
          }
          if (!f.type.match('image.*')) {
            continue;
          }
          var reader = new FileReader();
         reader.onload = (function(theFile) {
            return function(e) {
            //e.target.result // tätä voi suoraan käyttää src sisällä
              // Render thumbnail.
              var span = document.createElement('span');
              span.innerHTML = ['<img class="thumb" src="', e.target.result,
                                '" title="', escape(theFile.name), '"/>'].join('');

              var out = document.getElementById('iconWarningList');
              if (out.childNodes.length > 0) {
                out.removeChild(out.childNodes[0]);
              }
              out.appendChild(span, null);

            };
          })(f);
          reader.readAsDataURL(f);
        while (reader.readyState !== 2) {
            // TODO: find a way to block until read is complete..
            alert("uploading image..");
        }
        return reader.result;
        }
    }

}(window.settingsMenu = window.settingsMenu || {}));

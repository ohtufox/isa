(function(fixPage, finder, icon, undefined) {
    fixPage.fixPage = function(status) {
        let passwordFields = finder.findPasswordFields();
        for (let i = 0; i < passwordFields.length; i++) {
            if (status.httpStatus !== "HTTP") {
                fixPage.checkTarget(passwordFields[i], i);
            } else {
                icon.add(passwordFields[i], null);
            }
        }
    };
    
    fixPage.checkTarget = function(element, index) {
        payload = new Object();
        if (element.form == undefined) {
            // password field outside a form.
            return;
        } else {
            payload.action = element.form.action;
        }
        payload.index = index;
        console.log("SEND: " + JSON.stringify(payload));
        self.port.emit('fieldcheck', payload);
    };

    fixPage.listenForStates = function() {
        self.port.on('fieldchecked', function(payload) {
            console.log("RECV: " + JSON.stringify(payload));
            let passwordFields = finder.findPasswordFields();
            icon.add(passwordFields[payload.index], payload);
        });
    };

} (window.fixPage = window.fixPage || {}, fieldFinder, fieldIcon));
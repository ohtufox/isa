(function(fixPage, finder, icon, undefined) {
    fixPage.fixPage = function(status, payload) {
        let passwordFields = finder.findPasswordFields();
        for (let i = 0; i < passwordFields.length; i++) {
            if (status.httpStatus !== "HTTP") {
                fixPage.checkTarget(passwordFields[i], payload);
            } else {
                icon.add(passwordFields[i], payload);
            }
        }
    };
    
    fixPage.checkTarget = function(element, payload) {
        if(!payload.checkTarget) {
            icon.add(element, payload);
            return;
        } else if (element.form == undefined) {
            // password field outside a form.
            return;
        } 

        payload.action = element.form.action;

        self.port.once('fieldchecked', function(enrichedPayload) {
            console.log("RECV: " + JSON.stringify(enrichedPayload));
            let passwordFields = finder.findPasswordFields();
            icon.add(element, enrichedPayload);
        });
        console.log("SEND: " + JSON.stringify(payload));
        self.port.emit('fieldcheck', payload);
    };

} (window.fixPage = window.fixPage || {}, fieldFinder, fieldIcon));

(function(fixPage, finder, icon, undefined) {
    let queue = 0;
    fixPage.fixPage = function(data, payload) {
        icon.init(data);
        let passwordFields = finder.findPasswordFields();
        for (let i = 0; i < passwordFields.length; i++) {
            if (data.httpStatus !== "HTTP") {
                fixPage.checkTarget(passwordFields[i], payload);
            } else {
                icon.add(passwordFields[i], payload);
            }
        }
    };

    fixPage.checkTarget = function(element, payload) {
        console.log('About to check target, payload.checkTarget=' + payload.checkTarget);
        if (payload.checkTarget && element.form != undefined) {
            createTargetCheck(element, payload);
        } else if (!payload.checkTarget) {
            console.log('Test mode');
            icon.add(element, payload);
        } else {
            console.log('Unknown mode');
        }
    };

    function createTargetCheck(element, payload) {
        queue++;
        console.log('About to create target check request and listener for the result.');
        console.log('Payload action set to form action');
        self.port.once(queue + 'fieldchecked' + queue, function(state) {
            console.log('Once in a lifetime!');
            payload.state = state;
            icon.add(element, payload);
        });
        console.log("Sending target check JSON: " + JSON.stringify(payload));
        let formAction = element.form.action;
        self.port.emit('fieldcheck', formAction, queue);
    }

}(window.fixPage = window.fixPage || {}, fieldFinder, fieldIcon));

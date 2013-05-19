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
        if (payload.checkTarget && element.form != undefined) {
            createTargetCheck(element, payload, ++queue);
        } else if (!payload.checkTarget) {
            console.log('Test mode');
            icon.add(element, payload);
        } else {
            console.log('Unknown mode');
        }
    };

    function createTargetCheck(element, payload, queue) {
        self.port.once(queue + 'fieldchecked', function(state) {
            payload.state = state;
            icon.add(element, payload);
        });
        let request = {formAction: element.form.action, queue: queue};
        self.port.emit('fieldcheck', request);
    }

}(window.fixPage = window.fixPage || {}, fieldFinder, fieldIcon));

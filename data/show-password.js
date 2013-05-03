(function(showPwd, finder, icon, undefined) {
    showPwd.peekPassword = function(element) {
        if (element.value.length > 0) {
            showPassword(element);
        }
    };

    showPwd.fixPage = function(status) {
        let passwordFields = finder.findPasswordFields();
        for (let i = 0; i < passwordFields.length; i++) {
            if (status.httpStatus !== "HTTP") {
                showPwd.checkTarget(passwordFields[i], i);
            } else {
                icon.add(passwordFields[i], null);
            }
        }
    };


    showPwd.checkTarget = function(element, index) {
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

    showPwd.listenForStates = function() {
        self.port.on('fieldchecked', function(payload) {
            console.log("RECV: " + JSON.stringify(payload));
            let passwordFields = finder.findPasswordFields();
            icon.add(passwordFields[payload.index], payload);
        });
    };

    showPwd.showTooltip = function(element, msg) {
        if (element.value.length > 0) {
            element.title = msg;
        }
    };

    showPwd.addMouseDownPeekListener = function(element, target) {
        element.addEventListener('mousedown', function(e) {
            e.preventDefault();
            settingsChecker.isPasswordPeekedBefore(target, element);
        });

        element.addEventListener('mouseup', function(e) {
            hidePassword(target);
            e.preventDefault();
        });
        element.addEventListener('mouseleave', function(e) {
            hidePassword(target);
        });

        element.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    };

    function showPassword(element) {
        element.type = 'text';
    }

    function hidePassword(element) {
        element.type = 'password';
    }

}(window.showPwd = window.showPwd || {}, fieldFinder, fieldIcon));

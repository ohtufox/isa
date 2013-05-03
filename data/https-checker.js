(function(httpsChecker, undefined) {

    httpsChecker.fieldIsSecure = function(fieldElement) {
        let parentForm = getParentForm(fieldElement);
        let isSecure = httpsChecker.formIsSecure(parentForm);
        return isSecure;
    };

    httpsChecker.formIsSecure = function(formElement) {
        if (!elementIsValidForm(formElement)) {
            return false;
        }
        let formAction = getAction(formElement);
        let isSecure = actionIsSecure(formAction);
        return isSecure;
    };

    function elementIsValidForm(element) {
        if (element != null && element.nodeName === 'FORM') {
            return true;
        } else {
            return false;
        }
    }

    function getAction(form) {
        let action = form.action;
        return action;
    }

    function actionIsSecure(action) {
        let actionStart = action.substring(0, 5);
        if (actionStart === 'https') {
            return true;
        } else {
            return false;
        }
    }

    function getParentForm(fieldElement) {
        let form = fieldElement.form;
        return form;
    }

}(window.httpsChecker = window.httpsChecker || {}));

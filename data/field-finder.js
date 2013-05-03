(function(fieldFinder, undefined) {

    fieldFinder.findPasswordFields = function() {
        let inputElements = findInputFields();
        let passwordFields = getPasswordFieldsFromInputs(inputElements);
        return passwordFields;
    };

    function getPasswordFieldsFromInputs(inputElements) {
        let inputElementCount = inputElements.length;
        let passwordFields = new Array();
        for (let i = 0; i < inputElementCount; i++) {
            addPasswordField(passwordFields, inputElements[i]);
        }
        return passwordFields;
    }

    function addPasswordField(array, candidate) {
        if (candidate.type === 'password') {
            array.push(candidate);
        }
    }

    function findInputFields() {
        let inputFields = document.getElementsByTagName('input');
        return inputFields;
    }

}(window.fieldFinder = window.fieldFinder || {}));

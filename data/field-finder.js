(function(fieldFinder, undefined) {
    fieldFinder.findPasswordFields = function() {
        var inputElements = findInputFields();
        var passwordFields = getPasswordFieldsFromInputs(inputElements);
        return passwordFields;
    };

    function getPasswordFieldsFromInputs(inputElements) {
        var inputElementCount = inputElements.length;
        var passwordFields = new Array();
        for(var i = 0; i < inputElementCount; i++) {
            if(inputElements[i].type === 'password') {
                var element = inputElements[i];
                passwordFields.push(element);
            }
        }
        return passwordFields;
    }

    function findInputFields() {
        var inputFields = document.getElementsByTagName('input');
        return inputFields;
    } 

}(window.fieldFinder = window.fieldFinder || {}));

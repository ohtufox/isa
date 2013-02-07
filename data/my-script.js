let passwordFields = fieldFinder.findPasswordFields();

for (let i = 0; i < passwordFields.length; i++) {
    let element = passwordFields[i];
    element.addEventListener('click', function(e) {
         showPassword(element);
    });
}

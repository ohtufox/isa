test('Insecure form security test', function() {
    let form = document.getElementById('insecureForm1');
    ok(httpsChecker.formIsSecure(form) === false, 'Passed!');
});

test('Insecure password field security test', function() {
    let passwordField = document.getElementById('insecurePassword1');
    ok(httpsChecker.fieldIsSecure(passwordField) === false, 'Passed!');
});

test('Secure form security test', function() {
    let form = document.getElementById('secureForm1');
    ok(httpsChecker.formIsSecure(form) === true, 'Passed!');
});

test('Secure password field security test', function() {
    let passwordField = document.getElementById('securePassword1');
    ok(httpsChecker.fieldIsSecure(passwordField) === true, 'Passed!');
});

test('Formless password field security test', function() {
    let passwordField = document.getElementById('formlessPassword1');
    ok(httpsChecker.fieldIsSecure(passwordField) === false, 'Passed!');
});

test('Standard password field count test', function() {
    let passwordFields = fieldFinder.findPasswordFields();
    let passwordFieldCount = passwordFields.length;
    ok(passwordFieldCount >= 1, 'Passed!');
});

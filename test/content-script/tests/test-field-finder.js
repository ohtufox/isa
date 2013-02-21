let passwordFields = fieldFinder.findPasswordFields();
let passwordFieldCount = passwordFields.length;

test( "Standard password field count test", function() {
   ok( passwordFieldCount >= 1, "Passed!" );
});

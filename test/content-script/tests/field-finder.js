let passwordFields = fieldFinder.findPasswordFields();
let passwordFieldCount = passwordFields.length;
test( "password field count test", function() {
   ok( passwordFieldCount === 1, "Passed!" );
});

let passwordFields = fieldFinder.findPasswordFields();
let passwordFieldCount = passwordFields.length;

test( "Standard password field find test", function() {
   ok( passwordFieldCount == 1, "Passed!" );
});


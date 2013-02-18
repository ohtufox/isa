let passwordFields = fieldFinder.findPasswordFields();
let passwordFieldCount = passwordFields.length;
<<<<<<< HEAD:test/content-script/tests/test-field-finder.js

test( "Standard password field find test", function() {
   ok( passwordFieldCount == 1, "Passed!" );
});
=======
test( "Standard password field count test", function() {
   ok( passwordFieldCount >= 1, "Passed!" );
});
test( "JavaScript created password field count test", function() {
   ok( passwordFieldCount === 3, "Passed!" );
});
>>>>>>> JavaScript generated field finder test.:test/content-script/tests/field-finder.js


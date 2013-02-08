var inputFields = document.getElementsByTagName('input');
var element = inputFields[0];

test( "show password in text", function() {
	showPwd.peekPassword(element);
	ok( element.type === "text", "input is text" );
});

asyncTest("after 3sec hide password", function() {
	showPwd.peekPassword(element);
 
	setTimeout(function() {
    ok( element.type === "password", "after 3001ms input is password" );
    start();
  }, 3001);
});
var inputFields = document.getElementsByTagName('input');
var element = inputFields[0];

test( "show password in text", function() {
	showPwd.peekPassword(element);
	ok( element.type === "text", "input is changed to text" );
});

asyncTest("after peek hide password", function() {
	showPwd.setPeekTime(10);
	showPwd.peekPassword(element);
	setTimeout(function() {
    ok( element.type === "password", "after given time input is password" );
    start();
  }, 11);
});
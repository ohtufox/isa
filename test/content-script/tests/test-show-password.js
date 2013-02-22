const TEST_PEEK_TIME = 10;
const TEST_PEEK_TIME_INCREMENT = 1;

test( 'show password in text', function() {
	let element = document.getElementById('pwdfield1');
	ok( element.type === 'password', 'at first input is shown as password' );
	showPwd.peekPassword(element, TEST_PEEK_TIME);
	ok( element.type === 'text', 'input is changed to text' );
});

asyncTest('after peek hide password', function() {
	let element = document.getElementById('pwdfield2');
	ok( element.type === 'password', 'at first input is shown as password' );
	showPwd.peekPassword(element, TEST_PEEK_TIME);
	ok( element.type === 'text', 'input is changed to text' );
	setTimeout(function() {
        ok( element.type === 'password', 'after given time input is changed back to password' );
        start();
    }, TEST_PEEK_TIME + TEST_PEEK_TIME_INCREMENT);
});

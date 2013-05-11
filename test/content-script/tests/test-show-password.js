const TEST_PEEK_TIME = 10;
const TEST_PEEK_TIME_INCREMENT = 1;

test('show password in text', function() {
    let element = document.getElementById('pwdfield1');
    element.value = 'password';
    ok(element.type === 'password', 'at first input is shown as password');
    showPwd.peekPassword(element, TEST_PEEK_TIME);
    ok(element.type === 'text', 'input is changed to text');
});

test('after peek hide password', function() {
    let element = document.getElementById('pwdfield2');
    element.value = 'password';
    ok(element.type === 'password', 'at first input is shown as password');
    showPwd.peekPassword(element);
    ok(element.type === 'text', 'input is changed to text');
});

test('do not show password on cleartext if field is empty', function() {
    let element = document.getElementById('pwdfield3');
    element.value = '';
    ok(element.type === 'password', 'at first input is shown as password');
    showPwd.peekPassword(element);
    ok(element.type === 'password', 'input is not changed to text if field is empty');
});

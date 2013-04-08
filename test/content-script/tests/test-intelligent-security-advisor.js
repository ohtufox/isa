let status = new Object();
status.good = "../../data/icons/checkmark_32.png";
status.bad = "../../data/icons/warning_32.png";
status.httpstatus = "HTTPS";
intelligentSecurityAdvisor.init(status);
settingsChecker.pwdHasBeenPeekedBefore();

test( 'Standard password click peek test', function() {
    let testElement = document.getElementById('password1');
    ok( testElement.type === 'password', 'Element is originally of the type of password' );
    $('#password1').click();
    ok( testElement.type === 'text', 'After a click element is of the type of text' );
});


asyncTest( 'JavaScript generated password field click peek test', function() {
    let container = document.getElementById('passwordFieldContainer');
    container.innerHTML += '<input value="bar" id="password4" type="password"/>';
    let testElement = document.getElementById('password4');
    ok( testElement.type === 'password', 'Element is originally of the type of password' );
    setTimeout(function() {
        $('#password4').click();
        ok( testElement.type === 'text', 'After a click element is of the type of text' );
        start();
    }, 50);
});

asyncTest( 'JavaScript changed password field click peek test', function() {
    let container = document.getElementById('passwordFieldContainer');
    container.innerHTML += '<input value="foo" id="password5" type="text"/>';
    let testElement = document.getElementById('password5');
    ok( testElement.type === 'text', 'Element is originally of the type of text' );
    testElement.type = 'password';
    ok( testElement.type === 'password', 'Element is mutated to the type of password' );
    setTimeout(function() {
        $('#password5').click();
        ok( testElement.type === 'text', 'After a click element is of the type of text' );
        start();
    }, 50);
});


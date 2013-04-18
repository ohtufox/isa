let data = new Object();
data.icon = new Object();
data.preferences = new Object();
data.icon.good = "../../data/icons/checkmark_32.png";
data.icon.bad = "../../data/icons/warning_32.png";
data.icon.eyeopen = "../../data/icons/eye_open_16.png";
data.icon.eyeclosed = "../../data/icons/eye_closed_16.png";
data.httpStatus = "HTTPS";
data.preferences.passwordPeek = true;


intelligentSecurityAdvisor.init(data);
settingsChecker.pwdHasBeenPeekedBefore();

function mouseDown(element) {
    if(element !== null) {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("mousedown", true, true, window,
            0, 0, 0, 0, 0, false, false, false, false, 0, null);
        element.dispatchEvent(evt);
    }
}

test( 'Standard password click peek test', function() {
    let testElement = document.getElementById('password1');
    ok( testElement.type === 'password', 'Element is originally of the type of password' );
    let icon = document.getElementById('isa-field-icon password1');
    mouseDown(icon);
    ok( testElement.type === 'text', 'After a click element is of the type of text' );
});


asyncTest( 'JavaScript generated password field click peek test', function() {
    let container = document.getElementById('passwordFieldContainer');
    container.innerHTML += '<input value="bar" id="password4" type="password"/>';
    let testElement = document.getElementById('password4');
    ok( testElement.type === 'password', 'Element is originally of the type of password' );
    setTimeout(function() {
        let icon = document.getElementById('isa-field-icon password4');
        mouseDown(icon);
        ok( testElement.type === 'text', 'After a click element is of the type of text' );
        start();
    }, 50);
});
asyncTest( 'JavaScript generated password field click peek test 2', function() {
    let container = document.getElementById('passwordFieldContainer');
    container.innerHTML += '<div><div id="trojan"><input value="bar" id="password7" type="password"/></div></div>';
    let testElement = document.getElementById('password7');
    ok( testElement.type === 'password', 'Element is originally of the type of password' );
    setTimeout(function() {
        let icon = document.getElementById('isa-field-icon password7');
        mouseDown(icon);
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
        let icon = document.getElementById('isa-field-icon password5');
        mouseDown(icon);
        ok( testElement.type === 'text', 'After a click element is of the type of text' );
        start();
    }, 50);
});

asyncTest('JavaScript id changed password field click peek test', function() {
    let container = document.getElementById('passwordFieldContainer');
    container.innerHTML += '<input value="foo" id="password6" type="password"/>';
    let testElement = document.getElementById('password6');
    testElement.id = 'foobarPassword6';
    setTimeout(function() {
        let icon = document.getElementById('isa-field-icon foobarPassword6');
        mouseDown(icon);
        ok( testElement.type === 'text', 'After a click element is of the type of text' );
        start();
    }, 50);
});


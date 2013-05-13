const TIMEOUT = 2000;
let data = new Object();
data.icon = new Object();
data.preferences = new Object();
data.preferences.passwordPeek = false;
data.preferences.checkTarget = false;
data.passwordPeekedBefore = true;
data.icon.good = "../../data/icons/checkmark_32.png";
data.icon.bad = "../../data/icons/warning_32.png";
data.icon.eyeopen = "../../data/icons/eye_open_16.png";
data.icon.eyeclosed = "../../data/icons/eye_closed_16.png";
data.httpStatus = "HTTPS";

intelligentSecurityAdvisor.init(data);
settingsChecker.pwdHasBeenPeekedBefore();

function mouseDown(element) {
    if (element !== null) {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("mousedown", true, true, window,
            0, 0, 0, 0, 0, false, false, false, false, 0, null);
        element.dispatchEvent(evt);
    }
}

asyncTest('JavaScript generated password field click peek test', function() {
    let container = document.getElementById('passwordFieldContainer');
    container.innerHTML += '<input value="bar" id="password4" type="password"/>';
    let testElement = document.getElementById('password4');
    ok(testElement.type === 'password', 'Element is originally of the type of password');
    setTimeout(function() {
        let icon = document.getElementById('isa-field-icon password4');
        mouseDown(icon);
        ok(testElement.type === 'password', 'After a click element is of the type of password');
        start();
    }, TIMEOUT);
});

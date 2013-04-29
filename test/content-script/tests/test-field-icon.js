const TIMEOUT = 2000;
function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function initIconTest(httpstatus, peek) {
    let data = new Object();
    data.icon = new Object();
    data.preferences = new Object();
    data.icon.good = "../../data/icons/checkmark_32.png";
    data.icon.bad = "../../data/icons/warning_32.png";
    data.icon.eyeopen = "../../data/icons/eye_open_16.png";
    data.icon.eyeclosed = "../../data/icons/eye_closed_16.png";
    data.httpStatus = httpstatus;
    data.preferences.passwordPeek = peek;

    intelligentSecurityAdvisor.init(data);
}

initIconTest("HTTPS", true);

// http://stackoverflow.com/a/9208880
function mouseDown(element) {
    var evt = document.createEvent("MouseEvents");
    // type, canBubble, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget
    evt.initMouseEvent("mousedown", true, true, window,
            0, 0, 0, 0, 0, false, false, false, false, 0, null);
    element.dispatchEvent(evt);
}

function mouseUp(element) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("mouseup", true, true, window,
            0, 0, 0, 0, 0, false, false, false, false, 0, null);
    element.dispatchEvent(evt);
}

asyncTest( 'show password icon on HTTPS site', function() {
initIconTest("HTTPS", true);
    let element = document.getElementById('pwdfield1');
    fieldIcon.add(element);
    setTimeout(function() {
        let icon = document.getElementById('isa-field-icon pwdfield1');
        ok( icon.style.visibility == "hidden", 'icon is not visible when the password field does not have focus')
        element.focus();
        // XXX: Breaks if test is opened in non-focused tab
        //    ok( icon.style.visibility == "visible", 'icon is visible to the user when password field has focus')
        ok( endsWith(icon.src, 'eye_closed_16.png'), 'focused field has closed eye icon on secure site' );
        mouseDown(icon);
        //    ok( icon.style.visibility == "visible", 'icon is visible to user while icon is being clicked')
        ok( endsWith(icon.src, 'eye_open_16.png'), 'while the icon is being clicked an open eye icon is displayed' );
        mouseUp(icon);
        ok( endsWith(icon.src, 'eye_closed_16.png'), 'icon changes back to closed eye when mouse button is released' );
        start();
    }, TIMEOUT);
});

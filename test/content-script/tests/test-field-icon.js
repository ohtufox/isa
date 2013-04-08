function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function initIconTest(httpstatus, passwordPeek) {
    let data = new Object();
    data.preferences = new Object();
    data.preferences.passwordPeek = passwordPeek;
    data.icon = new Object();
    data.icon.good = "../../data/icons/checkmark_32.png";
    data.icon.bad = "../../data/icons/warning_32.png";
    data.httpStatus = httpstatus;
    fieldIcon.init(data);
}

test( 'show warning icon on HTTP site', function() {
        initIconTest("HTTP", true);
	let element = document.getElementById('pwdfield1');
	fieldIcon.add(element, 3000);
	ok( endsWith(element.style.backgroundImage, 'warning_32.png")'), 'password field has warning icon on non-http site' );
});

test( 'show checkmark icon on HTTPS site', function() {
        initIconTest("HTTPS", true);
	let element = document.getElementById('pwdfield1');
	fieldIcon.add(element, 3000);
	ok( endsWith(element.style.backgroundImage, 'checkmark_32.png")'), 'password field has warning icon on non-http site' );
});

function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function initIconTest(httpstatus) {
    let status = new Object();
    status.good = "../../data/icons/checkmark_32.png";
    status.bad = "../../data/icons/warning_32.png";
    status.httpstatus = httpstatus;
    fieldIcon.init(status);
}

test( 'show warning icon on HTTP site', function() {
        initIconTest("HTTP");
	let element = document.getElementById('pwdfield1');
	fieldIcon.add(element, 3000);
	ok( endsWith(element.style.backgroundImage, 'warning_32.png")'), 'password field has warning icon on non-http site' );
});

test( 'show checkmark icon on HTTPS site', function() {
        initIconTest("HTTPS");
	let element = document.getElementById('pwdfield1');
	fieldIcon.add(element, 3000);
	ok( endsWith(element.style.backgroundImage, 'checkmark_32.png")'), 'password field has warning icon on non-http site' );
});

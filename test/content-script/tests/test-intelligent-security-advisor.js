intelligentSecurityAdvisor.init();


test( 'Standard password click peek test', function() {
    let testElement = document.getElementById('password1');
    ok( testElement.type === 'password', 'Element is originally of the type of password' );
    $('#password1').click();
    ok( testElement.type === 'text', 'After a click element is of the type of text' );
});

test( 'JavaScript generated password field click peek test', function() {
intelligentSecurityAdvisor.init();
    let container = document.getElementById('passwordFieldContainer');
    container.innerHTML += 'i';
    console.log('new password field start');
    container.innerHTML += '<input id=\"password4\" type=\"password\"/>';
    console.log('new password field');
    let testElement = document.getElementById('password4');
    ok( testElement.type === 'password', 'Element is originally of the type of password' );
    console.log('click');
    $('#password4').click();
    ok( testElement.type === 'text', 'After a click element is of the type of text' );
});

intelligentSecurityAdvisor.init();


test( "Standard password click peek test", function() {
    let testElement = document.getElementById('password1');
    ok( testElement.type === "password", "Element is originally of the type of password" );
    $('#password1').click();
    ok( testElement.type === "text", "After a click element is of the type of text" );
});

test( "JavaScript generated password field click peek test", function() {
    let container = document.getElementById('passwordFieldContainer');
    container.innerHTML += '<input id=\"password4\" type=\"password\"/>';
    let testElement = document.getElementById('password4');
    ok( testElement.type === 'password', 'Element is originally of the type of password' );
    $('#password4').click();
    ok( testElement.type === 'text', 'After a click element is of the type of text' );
});

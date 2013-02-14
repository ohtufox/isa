intelligentSecurityAdvisor.init();


test( "Standard password doubleclick peek test", function() {
    let testElement = document.getElementById('password1');
    ok( testElement.type === "password", "Element is originally of the type of password" );
    $('#password1').click();
    ok( testElement.type === "text", "After a click element is of the type of text" );
});


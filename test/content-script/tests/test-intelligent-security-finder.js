intelligentSecurityAdviser.init();
let ELEMENT_1 = 'password1';

asyncTest( "Standard password doubleclick peek test", function() {
    let testElement = document.getElementById(ELEMENT_1);
    ok( testElement.type === "password", "Element is originally of type of password" );
    $('#' + ELEMENT_1).dblclick();
    ok( testElement.type === "text", "After a click element is of type of text" );
});


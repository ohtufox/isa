(function(showPwd, undefined) {
    // Display password if the field has text in it
    // element: password field
    showPwd.peekPassword = function(element) {
        // NOTE: No reason to export other than to use in tests..
        if (element.value.length > 0) {
            showPassword(element);
        }
    };

    // Add functionality to shgw password when mouse is pressed and hide it when button is released.
    // element: icon in which to add the clicking functionality
    // target:  password field that is peeked at
    showPwd.addMouseDownPeekListener = function(element, target) {
        element.addEventListener('mousedown', function(e) {
            e.preventDefault();
            if (settingsChecker.isPasswordPeekedBefore(target, element)) {
                showPwd.peekPassword(target);
            }
        });
        element.addEventListener('mouseup', function(e) {
            hidePassword(target);
            e.preventDefault();
        });
        element.addEventListener('mouseleave', function(e) {
            hidePassword(target);
        });

        element.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    };

    function showPassword(element) {
        element.type = 'text';
    }

    function hidePassword(element) {
        element.type = 'password';
    }

}(window.showPwd = window.showPwd || {}));

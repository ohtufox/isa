(function(showPwd, finder, icon, undefined) {
    showPwd.peekPassword = function(element) {
        // NOTE: No reason to export other than to use in tests..
        if (element.value.length > 0) {
            showPassword(element);
        }
    };

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

}(window.showPwd = window.showPwd || {}, fieldFinder, fieldIcon));

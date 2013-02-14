(function(showPwd, finder, undefined){

	showPwd.peekPassword = function(element, time) {
		showPassword(element);
		setTimeout(hidePassword, time, element);
	};
	
    showPwd.fixPage = function(time) {
        let passwordFields = finder.findPasswordFields();
        for(let i = 0; i < passwordFields.length; i++) {
            fixElement(passwordFields[i], time);
			sendInfo(passwordFields[i]);
        }
    };

    function fixElement(element, time) {
        element.addEventListener('click', function(e) {
			showPwd.peekPassword(element, time);
        });
    }

	function showPassword(element){
		element.type = 'text';
	}
	
	function hidePassword(element){
		element.type = 'password';
	}
	
	function sendInfo(element) {
		element.addEventListener('dblclick', function(e) {
			let msg = "click to show password";
			element.title = msg;
			self.port.emit('info', msg);
        });
	}
}(window.showPwd = window.showPwd || {}, fieldFinder));


(function(showPwd, finder, undefined){

	showPwd.peekPassword = function(element, time) {
		showPassword(element);
		setTimeout(hidePassword, time, element);
	};
	
    showPwd.fixPage = function(time) {
        let passwordFields = finder.findPasswordFields();
        for(let i = 0; i < passwordFields.length; i++) {
            fixElement(passwordFields[i], time);
			addInfo(passwordFields[i]);
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
	
	function addInfo(element) {
		element.addEventListener('dblclick', function(e) {
			sendInfo(element, "click to show password");
        });
	}
	
	function sendInfo(element, msg) {
		element.title = msg;
		self.port.emit('info', msg);
	}
	
}(window.showPwd = window.showPwd || {}, fieldFinder));



(function(showPwd, undefined){
	let peekTime = 3000;
	
	showPwd.setPeekTime = function(time) {
		peekTime = time;
	};

	showPwd.peekPassword = function(element) {
		showPassword(element);
		setTimeout(hidePassword, peekTime, element);
	};
	
	function showPassword(element){
		element.type = 'text';
	}
	
	function hidePassword(element){
		element.type = 'password';
	}
}(window.showPwd = window.showPwd || {}));


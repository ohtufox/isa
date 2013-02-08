
(function(showPwd, undefined){
	showPwd.peekPassword = function(element) {
		showPassword(element);
		setTimeout(hidePassword, 3000, element);
	};
	
	function showPassword(element){
		element.type = 'text';
	}
	
	function hidePassword(element){
		element.type = 'password';
	}
}(window.showPwd = window.showPwd || {}));


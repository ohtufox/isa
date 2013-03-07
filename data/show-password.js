(function(showPwd, finder, undefined){

    showPwd.peekPassword = function(element, time) {
		if(element.value.length >0) {
			showPassword(element);
			setTimeout(hidePassword, time, element);		
		}		
	};
	
    showPwd.fixPage = function(time) {
        let passwordFields = finder.findPasswordFields();
        for(let i = 0; i < passwordFields.length; i++) {
            showPwd.fixElement(passwordFields[i], time);
        }
    };

    showPwd.fixElement = function(element, time) {
        addIcon(element, time);
    }

    function addIcon(element, time) {
        element.style.cssText = "background-size: auto 100%, auto;";
        element.style.backgroundImage = "url(http://i.imgur.com/VAZE0IX.png)";
        element.style.paddingLeft = "0px";
        element.style.backgroundPosition = "100% 50%, 100% 50%";
        element.style.backgroundRepeat = "no-repeat";

        element.addEventListener('click', function(e) {
            showPwd.peekPassword(element, time);
            element.focus();
        });

    }

    function showPassword(element){
            element.type = 'text';
    }
    
    function hidePassword(element){
            element.type = 'password';
    }


}(window.showPwd = window.showPwd || {}, fieldFinder));

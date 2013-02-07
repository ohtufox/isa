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

    function fixElement(element, time) {
        addIcon(element, time);
    }

    function insertAfter(referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function addIcon(element, time) {
        let icon = document.createElement("input");
        icon.type = "button";
        icon.class = "isa-pwicon";

        icon.style.cssText = "background-size: auto 100%, auto;";
        icon.style.border = "none";
        icon.style.backgroundImage = "url(http://i.imgur.com/VAZE0IX.png)";
        icon.style.backgroundPosition = "center center";
        icon.style.backgroundRepeat = "no-repeat";
        icon.style.backgroundColor = "transparent";
        icon.style.cursor = "pointer";
        icon.style.position = "absolute";

        let height = element.offsetHeight;
        icon.style.width = height + "px";
        icon.style.height = height + "px";

        let right = element.offsetLeft + element.offsetWidth;
        let top = element.offsetTop;
        icon.style.top = top + "px";
        icon.style.left = right-height +"px";

        icon.addEventListener('click', function(e) {
            showPwd.peekPassword(element, time);
            element.focus();
        });

        insertAfter(element, icon);
    }

    function showPassword(element){
            element.type = 'text';
    }
    
    function hidePassword(element){
            element.type = 'password';
    }


}(window.showPwd = window.showPwd || {}, fieldFinder));

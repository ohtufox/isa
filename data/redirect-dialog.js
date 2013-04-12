self.port.on("add-redirect-dialog", function() {
    addDialogToPage();
});

function addDialogToPage() {
	let area = document.getElementById("infoarea");
	let element = document.createElement("p");
    element.addEventListener('click', function() {
        self.port.emit('request-redirect');
    });
	let node = document.createTextNode("click here to redirect to secure page");
	element.appendChild(node);	
	area.appendChild(element);
}
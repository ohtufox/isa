self.port.on("msg", function (msg) {
	console.log("this is content script. "+msg);
	addInfoToPage(msg);
});

function addInfoToPage(msg) {
	var area = document.getElementById("infoarea");
	var element = document.createElement("p");
	var node = document.createTextNode(msg);
	element.appendChild(node);	
	area.appendChild(element);
}
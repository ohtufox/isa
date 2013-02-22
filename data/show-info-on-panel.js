self.port.on("msg", function (msg) {
	console.log("this is content script. "+msg);
	addInfoToPage(msg);
});

function addInfoToPage(msg) {
	let area = document.getElementById("infoarea");
	let element = document.createElement("p");
	let node = document.createTextNode(msg);
	element.appendChild(node);	
	area.appendChild(element);
}

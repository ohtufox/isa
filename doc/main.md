function showInfo(element) {
	let msg = "double click to show password";
	element.title = msg;
	self.port.emit('info', msg);
}

let textField;
let output;
let submit;

function setup(){
	noCanvas();
	textField = select("#input");
	output = select("#output");
	submit = select("#submit");
	submit.mousePressed(newText);
}

function newText(){
	let s = textField.value();

	var words = s.split(/(\W+)/);
	for (let i = 0; i < words.length; i++) {
		const w = words[i];
		let span = createSpan(w);
		span.parent(output);
		if(/(\w+)/.test(w)) {
			span.mouseOver(highlight);
		}
	}
}

function highlight() {
	this.html('rainbow');
	const c = color(random(255), 0, random(255));
	this.style('background-color', c);
}
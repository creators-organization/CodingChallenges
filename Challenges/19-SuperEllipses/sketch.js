let a , b, n;
var slider;
let hue;

function setup(){
	createCanvas(600, 600);
	colorMode(HSB);
	a = 100;
	b = 100;
	n = 4;
	hue = 0;
	slider = createSlider(0, 10, 2, 0.1);
}

function draw(){
	background(0, 0, 20);
	translate(width*0.5, height*0.5);
	noFill();
	n = slider.value();
	let na = 2/n;
	
	beginShape();
	for (let angle = 0, i = 0; angle < TWO_PI; angle+=0.1) {
		stroke((hue + ++i) % 360, 100, 100);
		let x = pow(abs(cos(angle)), na) * a * sgn(cos(angle));
		let y = pow(abs(sin(angle)), na) * b * sgn(sin(angle));
		vertex(x, y);
	}
	if(hue++ > 359) hue = 0;
	endShape(CLOSE);
}

function sgn(val) {
	if (val >= 0) { return 1; }
	if (val < 0) { return -1; }
	return 0;
}
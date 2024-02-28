let inc;
let scl;
let cols, rows;
var fr;

var zOff;

var particles = [];

var flowField = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	fr = createP('');
	reset();
}

function reset(){
	zOff = 0;
	inc = 0.1;
	scl = 10;
	cols = floor(width / scl);
	rows = floor(height / scl);

	flowField = new Array(cols * rows);
	for (let i = 0; i < 10000; i++) {
		particles[i] = new Particle();
	}
	background(255);
}

function draw(){
	let yOff = 0;
	for (let y = 0; y < rows; y++) {
		let xOff = 0;
		for (let x = 0; x < cols; x++) {
			var index = (x + y * cols);
			let angle = noise(xOff, yOff, zOff) * TWO_PI * 4;
			var v = p5.Vector.fromAngle(angle);
			// v.setMag(5);
			flowField[index] = v;
			xOff += inc;
		}
		yOff += inc;
	}
	for (let i = 0; i < particles.length; i++) {
		const p = particles[i];
		p.follow(flowField);
		p.show();
		p.update();
	}
	fr.html(floor(frameRate()));
	zOff+=0.01;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
	reset();
}
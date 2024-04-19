let inc;
let scl;
let cols, rows;
var fr;

var zOff;

var particles = [];
var flowField = [];

var hu;
var hueShift;
var drawType = 2;
var fade = 0;
var fadeIn = 0.005;

function setup(){
	createCanvas(windowWidth, windowHeight);
	fr = createP('');
	colorMode(HSB);
	reset();
}

function reset(){
	zOff = 0;
	inc = 0.1;
	scl = 10;
	cols = floor(width / scl);
	rows = floor(height / scl);
	hu = 0;
	hueShift = 1;

	flowField = new Array(cols * rows);
	for (let i = 0; i < 15000; i++) {
		particles[i] = new Particle();
	}
	if (drawType === 2 || drawType === 6){
		background(0);
	} else if (drawType === 5){
		background(360);
	}
}

function draw(){
	if (drawType === 1) {
		background((hu+240) % 359, 359, 7);
	}
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
		if (drawType === 1 || drawType === 2) {
			let pHue = hu;
			pHue += map(i, 0, particles.length, 0, 120);
			if (pHue > 359) pHue %= 359;
			stroke(pHue, 100, 75, 50);
		} else if (drawType === 4) {
			let pHue = hu;
			pHue += map(i, 0, particles.length, 0, 10);
			if (pHue > 100) pHue %= 100;
			stroke(0, 0, pHue, 5);
		} else if (drawType === 5) {
			stroke(0, 0, 0, 0.01);
		} else if (drawType === 6) {
			let pHue = (i < particles.length*0.5)? 0: 100;
			stroke(0, 0, pHue, 0.01);
		}
		p.show();
		p.update();
	}
	fr.html(floor(frameRate()));
	zOff+=0.01;
	shiftHue();
}

function shiftHue() {
	if (drawType === 6 ) { return; }
	hu += hueShift;
	if (hu > 359) hu = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
	reset();
}

function keyPressed() {
	console.log(key);
	
	if (key === '1') { // rainbow on black
		drawType = 1;
	} else if (key === '2') { // rainbow
		drawType = 2;
	} else if (key === '3') { // retains color,  will fill the screen over time.
		drawType = 3;
	} else if (key === '4') { // greyScale 
		drawType = 4;
	} else if (key === '5') { // example, draws faint black lines on white, will fill the screen with black over time.
		background(360);
		drawType = 5;
	} else if (key === '6') { // greyScale 
		drawType = 6;
	} else if (['a', 'ArrowLeft'].includes(key)) {
		updateDrawType(-1);
	} else if (['d', 'ArrowRight', ' '].includes(key)) {
		updateDrawType(1);
	}
}

function mouseClicked() {
	if (mouseButton == LEFT) {
		updateDrawType(1);
	}
}

function updateDrawType(dir) {
	drawType += dir;
	if (drawType < 1) {
		drawType = 6;
	}
	if (drawType > 6) {
		drawType = 1;
	}
	if (drawType === 5) {
		background(360);
	}
}

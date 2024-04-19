var n = 0;
var c = 15;
var angle = 137.5;
var maxPetals = 10000;
// TODO: set petalSize and rotateSpeed as a function of gaze location distance from center
	// TODO: https://webgazer.cs.brown.edu/
var petalSize = 120;
var rotateSpeed = 0.001;
var hueShift = 0;
var hueShiftSpeed = 0.5;

function setup(){
	// createCanvas(600, 600);
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	colorMode(HSB);
}

function draw(){
	colorMode(RGB);
	background(0, 20);
	colorMode(HSB);
	translate(width*0.5, height*0.5);
	for (let i = 0; i < maxPetals; i++) {
		var a = i * (map(sin(angle), -1, 1, 0, 360));
		// var a = i * angle;
		var r = c * sqrt(i);
		var x = r * cos(a);
		var y = r * sin(a);
	
		// fill(a % 360, 255, 255);
		// fill(i % 360, 255, 255);
		fill((hueShift + a - r) % 360, 255, 255);
		noStroke();
		ellipse(x, y, petalSize, petalSize);
	}
	angle = (angle + rotateSpeed) % 360;
	hueShift = (hueShift + hueShiftSpeed) % 360;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
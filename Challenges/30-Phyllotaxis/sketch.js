var n = 0;
var c = 15;
var angle = 137.5;
var maxPetals = 10000;
var petalSize = 120;
var rotateSpeed = 0.001;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	colorMode(HSB);
}

function draw(){
	background(0);
	translate(width*0.5, height*0.5);
	for (let i = 0; i < maxPetals; i++) {
		var a = i * (map(sin(angle), -1, 1, 0, 360));
		var r = c * sqrt(i);
		var x = r * cos(a);
		var y = r * sin(a);
	
		// fill(a % 360, 255, 255);
		// fill(i % 360, 255, 255);
		fill((a - r) % 360, 255, 255);
		noStroke();
		ellipse(x, y, petalSize, petalSize);
	}
	angle += rotateSpeed;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
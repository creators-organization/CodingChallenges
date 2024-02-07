let x;
let y;
let z;
let hue;
let a = 10;
let b = 28;
let c = 8.0/3.0;

let points;

function setup(){
	createCanvas(windowWidth, windowHeight, WEBGL);
	easyCam = createEasyCam({distance:500});
  colorMode(HSB);
	x = 0.01;
	y = 0;
	z = 0;
	hue = 0;
	points = new Array();
	noFill();
	translate(0, 0, -80);
}

function draw(){
	background(0);
	
	let dt = 0.01;
	let dx = a * (y - x) * dt;
	let dy = (x * (b - z) - y) * dt;
	let dz = (x*y - c*z) * dt;
	x = x + dx;
	y = y + dy;
	z = z + dz;

	points.push(new p5.Vector(x, y, z));
	// leave this on to NOT fry your computer.
	if(points.length > 2000) { points.shift(); }
	scale(5);

	beginShape();
	for (let v of points) {
		stroke(hue, 100, 100);
		vertex(v.x, v.y, v.z);
		// let offset = p5.Vector.random3D();
		// offset.mult(0.01);
		// v.add(offset);
	
	}
	hue = (hue > 359) ? 0 : hue + 0.1;
	endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0,0,windowWidth, windowHeight]);
}
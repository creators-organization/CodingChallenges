let v;
let hueShift = 0;
let a = 10;
let b = 28;
let c = 8.0/3.0;
let dt = 0.01;
let maxPoints = 2500;
let freeRotate = false;
let scaleFactor = 5;

let points;
let easyCam;

function setup(){
	createCanvas(windowWidth, windowHeight, WEBGL);
	easyCam = createEasyCam({distance:400});
  colorMode(HSB);
	v = new p5.Vector(0.01, 0, 0);
	points = new Array();
	noFill();
}

function draw(){
	push();
	background(hueShift, 359, 10);
	if(freeRotate) {
		rotateX(frameCount*0.004);
		rotateY(frameCount*0.004);
		rotateZ(frameCount*0.004);
		translate(-v.x*scaleFactor, -v.y*scaleFactor, -v.z*scaleFactor);
	}
	scale(scaleFactor);
	
	let dx = a * (v.y - v.x) * dt;
	let dy = (v.x * (b - v.z) - v.y) * dt;
	let dz = (v.x*v.y - c*v.z) * dt;
	v.x += dx;
	v.y += dy;
	v.z += dz;

	points.push(new p5.Vector(v.x, v.y, v.z));
	// leave this on to NOT fry your computer.
	if(points.length > maxPoints) { points.shift(); }

	let hue = hueShift;
	beginShape();
	let limit = points.length - 1;
	let p = points[0];
	for (let i = 0; i < limit; i++) {
		p = points[i];
		
		stroke(hue, 100, 100);
		vertex(p.x, p.y, p.z);
		// let offset = p5.Vector.random3D();
		// offset.mult(0.1);
		// v.add(offset);
	
		hue += 1;
		if (hue > 359) hue = 0;
	}
	p = points[limit];
	stroke(0, 0, 100);
	vertex(p.x, p.y, p.z);
	endShape();
	hueShift += (map(points.length, 0, maxPoints, 1, 3));
	if(hueShift > 359) hueShift = 0;
	pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easyCam.setViewport([0,0,windowWidth, windowHeight]);
}

function keyReleased() {
	if(key === " ") {
		freeRotate = !freeRotate;
	}
}
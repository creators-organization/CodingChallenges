let easyCam;
let r;
let total = 50;
let totalMax = 5000;
let globe;
let angleX;
let angleY;
let rotationX;
let rotationY;

function setup(){
	createCanvas(windowWidth, windowHeight, WEBGL);
	easyCam = createEasyCam({distance:1000});
	// window.addEventListener('wheel', function(event) {
	// 	if(event.deltaY < 0){ // scroll up
	// 		total++;
	// 		if (total > totalMax) total = totalMax;
	// 	} else if(event.deltaY > 0){ // scroll down
	// 		total--;
	// 		if(total < 0) total = 0;
	// 	}
	// 	reset();
	// 	event.stopPropagation();
	// });
	colorMode(HSB);
	reset();
}

function reset() {
	r = 200;
	globe = [];
	angleX = 0;
	angleY = 0;
	rotationX = 0.005;
	rotationY = 0.006;

	for (let i = 0; i < total + 1; i++) {
		globe[i] = [];
		let lat = map(i, 0, total, 0, PI);
		for (let j = 0; j < total + 1; j++) {
			const lon = map(j, 0, total, 0, TWO_PI);
			const x = r * sin(lat) * cos(lon);
			const y = r * sin(lat) * sin(lon);
			const z = r * cos(lat);
			globe[i][j] = createVector(x, y, z);
			// let v = p5.Vector.random3D();
			// v.mult(10);
			// globe[i][j].add(v);
		}
	}
	noStroke();
}

function draw(){
	background(0);
	rotateX(angleX);
	rotateY(angleY);
	for (let i = 0; i < total; i++) {
		beginShape(TRIANGLE_STRIP);
		for (let j = 0; j < total+1; j++) {
			const hu = map(j, 0, total, 0, 360*6);
			fill(hu % 360, 255, 255);
			const v1 = globe[i][j];
			vertex(v1.x, v1.y, v1.z);
			const v2 = globe[i+1][j];
			vertex(v2.x, v2.y, v2.z);
		}
		endShape();
	}
	angleX += rotationX;
	angleY += rotationY;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easyCam.setViewport([0,0,windowWidth, windowHeight]);
}

let easyCam;
let r;
let total;
let totalMax = 5000;
let a = 1;
let b = 1;
let globe;
let angleX;
let angleY;
let rotationX;
let rotationY;
let hueOffset;
let m = 0, n1 = 0.2, n2 = 1.7, n3 = 1.7;
let prevM = 0;
let mChange = 0;


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
	total = 75;
	globe = [];
	angleX = 0;
	angleY = 0;
	rotationX = 0.005;
	rotationY = 0.006;
	hueOffset = 0;

	createMesh();
	noStroke();
}

function createMesh() {
	for (let i = 0; i < total + 1; i++) {
		globe[i] = [];
		let lat = map(i, 0, total, -HALF_PI, HALF_PI);
		const r2 = superShape(lat, m, n1, n2, n3);
		for (let j = 0; j < total + 1; j++) {
			const lon = map(j, 0, total, -PI, PI);
			const r1 = superShape(lon, m, n1, n2, n3);
			const x = r * r1 * cos(lon) * r2 * cos(lat);
			const y = r * r1 * sin(lon) * r2 * cos(lat);
			const z = r * r2 * sin(lat);
			globe[i][j] = createVector(x, y, z);
			let v = p5.Vector.random3D();
			v.mult(10);
			globe[i][j].add(v);
		}
	}
}

function superShape(theta, m, n1, n2, n3) {
	let t1 = abs((1/a) * cos(m * theta / 4));
	t1 = pow(t1, n2);
	let t2 = abs((1/b) * sin(m * theta/4));
	t2 = pow(t2, n3);
	let t3 = t1 + t2;
	t3 = pow(t3, -1 / n1);
	return t3;
}

function draw(){
	hueOffset += 5;
	background(0);
	rotateX(angleX);
	rotateY(angleY);
	m = map(cos(mChange), -1, 1, 0, 7);
	mChange += 0.02;
	createMesh();
	for (let i = 0; i < total; i++) {
		beginShape(TRIANGLE_STRIP);
		for (let j = 0; j < total+1; j++) {
			let hu = map(j, 0, total, 0, 2160);
			fill((hu + hueOffset) % 360, 255, 255);
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

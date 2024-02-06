let cols, rows;
let scl;
let w, h;
let flying;
let terrain;
let flySpeed = 0.1

function setup(){
	createCanvas(windowWidth, windowHeight, WEBGL);
	scl = 20;
	w = width*2;
	h = height*1.5;
	flying = 0;
	cols = w/scl;
	rows = h/scl;
	terrain = []
	for (let x = 0; x < cols; x++) {
		terrain[x] = [];
		for (let y = 0; y < rows; y++) {
			terrain[x][y] = 0;
		}
	}
}

function draw(){
	background(51);
	rotateX(PI/3);
  translate(-w * 0.5, -h*0.5);
	// noFill();
	flying -= flySpeed;
	let yOff = flying;
	for (let y = 0; y < rows; y++) {
		let xOff = 0;
		for (let x = 0; x < cols; x++) {
			terrain[x][y] = map(noise(xOff, yOff), 0, 1, -100, 100);
			xOff+= 0.2;
		}
		yOff+= 0.2;
	}
	let rowY = rows - 1;
	for (let y = 0; y < rowY; y++) {
		let c = map(y, 0, rowY, 0, 200);
		// let g = map(y, 0, rowY, 0, 200);
		// let b = map(y, 0, rowY, 0, 200);
		let a = map(y, 0, rowY, 0, 255);
		fill(c, c, c, a);
		stroke(c, c, c);
		beginShape(TRIANGLE_STRIP);
		for (let x = 0; x < cols; x++) {
			vertex(x*scl, y*scl, terrain[x][y]);
			vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
		}
		endShape();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	setup();
}
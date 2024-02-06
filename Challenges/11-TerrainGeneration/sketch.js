let cols, rows;
let scl;
let w, h;
let flying;
let terrain;

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
	translate(0, 50);
	rotateX(PI/3);
  translate(-w / 2, -2*h/3);
	
	flying -= 0.1;
	let yOff = flying;
	for (let y = 0; y < rows; y++) {
		let xOff = 0;
		for (let x = 0; x < cols; x++) {
			terrain[x][y] = map(noise(xOff, yOff), 0, 1, -100, 100);
			xOff+= 0.2;
		}
		yOff+= 0.2;
	}
	for (let y = 0; y < rows-1; y++) {
		let r = map(y, 0, rows - 1, 0, 200);
		let g = map(y, 0, rows - 1, 0, 200);
		let b = map(y, 0, rows - 1, 0, 200);
		let a = map(y, 0, rows - 1, 0, 255);
		fill(r, g, b, a);
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
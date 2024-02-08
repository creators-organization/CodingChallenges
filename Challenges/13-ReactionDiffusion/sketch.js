let grid;
let next;

let dA = 1.0;
let dB = 0.5;
let feed = 0.055;
let k = 0.062;
let timeScale = 1;

let weights = [
	[.05, .2, .05],
	[.2, -1, .2],
	[.05, .2, .05]
];

function setup(){
	createCanvas(windowWidth, windowHeight);
	pixelDensity(1);
	reset();
}

function reset(){
	grid = [];
	next = [];
	for (let x = 0; x < width; x++) {
		grid[x] = [];
		next[x] = [];
		for (let y = 0; y < height; y++) {
			grid[x][y] = next[x][y] = { a: random(1), b: random(1) };
		}
	}
	seed(5);
}

function seed(count){
	for (let index = 0; index < count; index++) {
		let length = 10;
		let startX = floor(random(width - length));
		let startY = floor(random(height - length));
		for (let x = startX; x < startX + length; x++) {
			for (let y = startY; y < startY + length; y++) {
				grid[x][y].b = 1;
			}
		}
	}
}

function draw(){
	reactionDiffusion();
	drawPixels();
	swap();
}

function reactionDiffusion() {
	for (let x = 1; x < width - 1; x++) {
		for (let y = 1; y < height - 1; y++) {
			let a = grid[x][y].a;
			let b = grid[x][y].b;
			next[x][y].a = (a +
				((dA * laplace(x, y, (varX, varY) => { return grid[varX][varY].a; }) -
					(a * b * b) +
					(feed * (1 - a))))) * timeScale;

			next[x][y].b = (b +
				((dB * laplace(x, y, (varX, varY) => { return grid[varX][varY].b; }) +
					(a * b * b) -
					((k + feed) * b)))) * timeScale;

			next[x][y].a = constrain(next[x][y].a, 0, 1);
			next[x][y].b = constrain(next[x][y].b, 0, 1);

		}
	}
}

function drawPixels() {
	background(51);
	loadPixels();
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			var pix = (x + y * width) * 4;
			pixels[pix + 0] = floor(next[x][y].a * 255);
			pixels[pix + 1] = 0;
			pixels[pix + 2] = floor(next[x][y].b * 255);
			pixels[pix + 3] = 255;
		}
	}
	updatePixels();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
	reset();
}

function swap(){
	let temp = grid;
	grid = next;
	next = temp;
}

function laplace(x, y, accessGrid) {
	let sumA = 0;
	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			const xIndex = wrap(x + i, width);
			const yIndex = wrap(y + j, height);
			// if(xIndex < 0 || xIndex >= width || yIndex < 0 || yIndex >= height) continue;
			sumA += accessGrid(xIndex, yIndex) * weights[i+1][j+1];
		}
	}
	return sumA;
}

function wrap(num, wide) {
	return (num >= 0) ? num % wide: (wide - abs(num % wide));
};
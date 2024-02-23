var angle = 0;
var maxIterations = 100;
var w = 5.2;
var h = 0;
var infinityMax = 4;
var rotateSpeed = 0.002;

const colorsRed = [];
const colorsGreen = [];
const colorsBlue = [];
let xMin, xMax, dx, x;
let yMin, yMax, dy, y;

// TODO: Implement mouseClick function that cycles through these
// https://paulbourke.net/fractals/juliaset/
let JuliaSet = [
	{r: -0.8, i: 0},
	{r: -0.70176, i: -0.3842},
	{r: 0, i: 0.8},
	{r: 0.37, i: 0.1},
	{r: 0.355, i: 0.355},
	{r: -0.4, i: -0.59}
]

function setup(){
	createCanvas(windowWidth, windowHeight);
	pixelDensity(1);
	colorMode(HSB, 1);
	reset();
}

function reset() {
	// sets zoom on reset for performance, higher zoom means less fractal
	// w = sqrt(max(width, height))/4;
	// Create color gradients
	for (let n = 0; n < maxIterations; n++) {
		let hu = sqrt(n / maxIterations);
		let col = color(hu, 255, 150);
		colorsRed[n] = red(col);
		colorsGreen[n] = green(col);
		colorsBlue[n] = blue(col);
	}
	h = (w * height) / width;
	xMin = -w / 2;
	yMin = -h / 2;
	xMax = xMin + w;
	yMax = yMin + h;
	dx = (xMax - xMin) / width;
	dy = (yMax - yMin) / height;
	// For some reason it won't let me get rid of the background() call even though we're overwriting EVERY pixel in draw.
	background(255);
}

function draw(){
	let ca = map(cos(angle*3), -1, 1, -0.8, 0.8);
	let cb = map(sin(angle), -1, 1, -0.8, 0.8);
	// let ca = -0.8; //-0.70176;
	// let cb = 0; //-0.3842;
	// let ca = map(mouseX, 0, width, -1, 1);
	// let cb = map(mouseY, 0, height, -1, 1);
	angle += rotateSpeed;
	
	loadPixels();
	y = yMin;
	for (let j = 0; j < height; j++) {
		x = xMin;
		for (let i = 0; i < width; i++) {
			let n = 0;
			for (let a = x, b = y; n < maxIterations; n++) {
				let aa = a * a;
				let bb = b * b;
				if(aa + bb > infinityMax) { break; }
				b = 2 * a * b + cb;
				a = aa - bb + ca;
			}
			// DrawSetGreyScaleLight(i, j, n);
			DrawSetRainbow(i, j, n);
			x += dx;
		}
		y += dy
	}
	updatePixels();
}

function DrawSetRainbow(i, j, n) {
	let pix = (i + j * width) * 4;
	if (n == maxIterations) {
		pixels[pix + 0] = 0;
		pixels[pix + 1] = 0;
		pixels[pix + 2] = 0;
	} else {
		pixels[pix + 0] = colorsRed[n];
		pixels[pix + 1] = colorsGreen[n];
		pixels[pix + 2] = colorsBlue[n];
	}
}

function DrawSetGreyScaleLight(i, j, n) {
	let pix = (i + j * width) * 4;
	if (n == maxIterations) {
		pixels[pix + 0] = 0;
		pixels[pix + 1] = 0;
		pixels[pix + 2] = 0;
	} else {
		pixels[pix + 0] = colorsRed[n];
		pixels[pix + 1] = colorsRed[n];
		pixels[pix + 2] = colorsRed[n];
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
	reset();
}
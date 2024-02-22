let maxIterations = 100;
var minVal = -0.5;
var maxVal = 0.5;
var minSlider;
var maxSlider;

function setup(){
	let canvas = createCanvas(360, 360);
	pixelDensity(1);
	minSlider = createSlider(-2.5, 0, -2.5, 0.01);
	maxSlider = createSlider(0, 2.5, 2.5, 0.01);
}

function draw(){
	loadPixels();
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			
			var a = map(x, 0, width, minSlider.value(), maxSlider.value());
			var b = map(y, 0, height, minSlider.value(), maxSlider.value());

			var ca = a;
			var cb = b;

			var n = 0;
			var z = 0;
			while( n < maxIterations){
				var aa = a * a - b * b;
				var bb = 2 * a * b;
				a = ca + aa;
				b = cb + bb;
				if(abs(a + b) > 16) {
					break;
				}
				n++;
			}

			// var bright = map(n, 0, maxIterations, 0, 255);
			// var bright = floor(n * 16 % 255);
			// var bright = 200;
			var bright = map(n, 0, maxIterations, 0, 1);
			bright = map(sqrt(bright), 0, 1, 0, 255);
			if(n === maxIterations) {
				bright = 0;
			}

			var pix = (x + y * width) * 4;
			pixels[pix + 0] = bright;
			pixels[pix + 1] = bright;
			pixels[pix + 2] = bright;
			pixels[pix + 3] = 255;
		}
	}
	updatePixels();
}
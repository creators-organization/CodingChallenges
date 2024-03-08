let blobs = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);
	for (let i = 0; i < 5; i++) {
		b = new Metaball(
			createVector(random(width), random(height)),
			10*random(720, 1000)
			);
		blobs.push(b);
	}
	background(255);
}

function draw(){
	loadPixels();
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			const pix = (x + y * width) * 4;
			let sum = 0;
			for (let i = blobs.length - 1; i >= 0; i--) {
				const b = blobs[i];
				let d = dist(x, y, b.pos.x, b.pos.y);
				sum += b.r / d;
			}
			let col = color(sum % 360, 255, 255);
			pixels[pix]   = red(col);
			pixels[pix+1] = green(col);
			pixels[pix+2] = blue(col);
			pixels[pix+3] = 255;
		}
	}
	updatePixels();
	for (let i = blobs.length - 1; i >= 0; i--) {
		blobs[i].update();
		// blobs[i].show();
	}
}
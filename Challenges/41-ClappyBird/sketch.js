let bird;
let pipes = [];
let mic;
let sliderTop;
let sliderBottom;
let clapping;

function setup(){
	createCanvas(400, 600);
	mic = new p5.AudioIn();
	mic.start();
	bird = new Bird();
	pipes.push(new Pipe());
	sliderTop = createSlider(0, 1, 0.15, 0.01);
	sliderBottom = createSlider(0, 1, 0.1, 0.01);
}

function draw(){
	background(0);

	let vol = mic.getLevel();

	for (let i = pipes.length - 1; i >= 0; i--) {
		const p = pipes[i];
		p.show();
		p.update();
		if(p.hits(bird)) {
			console.log("HIT");
		}
		if (p.offScreen()) {
			pipes.splice(i, 1);
		}
	}

	bird.update();
	bird.show();

	if(frameCount % 100 == 0) {
		pipes.push(new Pipe());
	}

	let thresholdTop = sliderTop.value();
	let thresholdBottom = sliderBottom.value();
	if(vol > thresholdTop && !clapping) {
		bird.up();
		clapping = true;
	}
	if(vol < thresholdBottom) {
		clapping = false;
	}
	fill(0, 255, 0);
	let y = map(vol, 0, 1, height, 0);
	rect(width-50, y, 50, height-y);

	stroke(255, 0, 0);
	strokeWeight(4);
	let ty = map(thresholdTop, 0, 1, height, 0);
	line(width - 50, ty, width, ty);
	stroke(0, 0, 255);
	let by = map(thresholdBottom, 0, 1, height, 0);
	line(width - 50, by, width, by);
	noStroke();
}

function keyPressed() {
	if (key == ' ') {
		bird.up();
	}
}
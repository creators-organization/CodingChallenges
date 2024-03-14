var bird;
var pipes = [];

function setup(){
	createCanvas(400, 600);
	bird = new Bird();
	pipes.push(new Pipe());
}

function draw(){
	background(0);

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
}

function keyPressed() {
	if (key == ' ') {
		bird.up();
	}
}
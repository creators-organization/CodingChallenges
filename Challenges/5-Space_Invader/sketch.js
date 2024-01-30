let flowers = [];

let ship;
let drops = [];
let frame = 0;
let speed = 6;
let minSpeed = 6;
this.playing = true;

function setup(){
	createCanvas(600, 400);
	ship = new Ship();
	makeFlowers();
}

function makeFlowers(){
	for (let i = 0; i < 7; i++) {
		flowers.push(new Flower(i*80+60, 60));
	}
}

function drawScene1(){
	frame = (frame + 1) % speed;
	background(51);
	ship.show();
	ship.move();
	ship.water();
	ship.isWatering = false;
	let flowersAdvance = false;
	for(let i = flowers.length - 1; i >= 0; i--) {
		let f = flowers[i];
		f.show();
		if(frame === 0) {
			if (f.move()){
				flowersAdvance = true;
			}
		}
		if (f.hitBottom()) { flowers.splice(i, 1); }
	}
	if (flowersAdvance) {
		for(let j = flowers.length - 1; j >= 0; j--) {
			if (flowers[j].advance()) { flowers.splice(j, 1); }
		}
	}
	if(flowers.length <= 0) {
		makeFlowers();
		speed--;
		constrain(speed, 1, minSpeed);
	}
	if(speed === 1){
		playing = false;
	}
	for(let i = drops.length - 1; i >= 0; i--) {
		let d = drops[i];
		d.show();
		d.move();
		for(let j = flowers.length - 1; j >= 0; j--) {
			let f = flowers[j];
			if (d.hits(f)) {
				// flowers.splice(j, 1);
				f.grow();
				drops.splice(i, 1);
			}
		}
	}
}

function draw() {
	if(playing) {
		drawScene1();
	} else {
		speed = 6;
		playing = true;
	}
}

function keyReleased() {
	if(keyCode === RIGHT_ARROW || key === "d") {
		ship.setDir(0);
	} else if(keyCode === LEFT_ARROW  || key === "a") {
		ship.setDir(0);
	} else if(key === " ") {
		ship.isWatering = false;
	}
}

function keyPressed() {
	if(keyCode === RIGHT_ARROW || key === "d") {
		ship.setDir(1);
	} else if(keyCode === LEFT_ARROW  || key === "a") {
		ship.setDir(-1);
	} else if(key === " ") {
		ship.isWatering = true;
	}
}

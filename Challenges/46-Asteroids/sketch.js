let ship;
let asteroids = [];
let lasers = [];
let asteroidMax = 5;
let asteroidRadThreshold = 10;

function setup(){
	createCanvas(windowWidth, windowHeight);
	ship = new Ship();
	for (let i = 0; i < asteroidMax; i++) {
		asteroids.push(new Asteroid());
	}
}

function draw(){
	background(0);

	for (let i = 0; i < asteroids.length; i++) {
		const a = asteroids[i];
		if(ship.hits(a)) {
			console.log('Your vessel has been damaged.');
		}
		a.render();
		a.update();
	}

	for (let i = lasers.length - 1; i >= 0; i--) {
		const l = lasers[i];
		l.render();
		l.update();
		if(l.offScreen()) {
			lasers.splice(i, 1);
			continue;
		}
		for (let j = asteroids.length - 1; j >= 0; j--) {
			const a = asteroids[j];
			if(l.hits(a)) {
				let newAsteroids = a.breakup();
				asteroids = asteroids.concat(newAsteroids);
				asteroids.splice(j, 1);
				lasers.splice(i, 1);
				break;
			}
		}
	}

	ship.render();
	ship.update();
}

function keyReleased() {
	if (keyCode == RIGHT_ARROW) {
		ship.setRotation(0);
	} else if (keyCode == LEFT_ARROW) {
		ship.setRotation(0);
	} else if (keyCode == UP_ARROW) {
		ship.boosting(false);
	}
}

function keyPressed() {
	if(key == ' ') {
		lasers.push(new Laser(ship.pos, ship.heading));
	} else if (keyCode == RIGHT_ARROW) {
		ship.setRotation(ship.turnMagnitude);
	} else if (keyCode == LEFT_ARROW) {
		ship.setRotation(-ship.turnMagnitude);
	} else if (keyCode == UP_ARROW) {
		ship.boosting(true);
	}
}

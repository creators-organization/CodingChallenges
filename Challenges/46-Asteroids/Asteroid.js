function Asteroid(pos, r) {
	if (pos) {
		this.pos = pos.copy();
	} else {
		this.pos = createVector(random(width), random(height));
	}
	this.vel = p5.Vector.random2D();
	if (r) {
		this.r = r;
	} else {
		this.r = random(15, 50);
	}
	this.total = floor(random(9, 20));
	this.offset = [];
	for (let i = 0; i < this.total; i++) {
		this.offset[i] = random(-this.r, this.r);
	}

	this.render = function() {
		push();
		noFill();
		stroke(255);
		translate(this.pos.x, this.pos.y);
		beginShape();
		for (let i = 0; i < this.total; i++) {
			let angle = map(i, 0, this.total, 0, TWO_PI);
			let rad = this.r + this.offset[i];
			let x = rad * cos(angle);
			let y = rad * sin(angle);
			vertex(x, y);
		}
		endShape(CLOSE);
		pop();
	}

	this.update = function() {
		this.pos.add(this.vel);
		this.edges();
	}

	this.edges = function(){
		if (this.pos.x > width + this.r) {
			this.pos.x = -this.r;
		} else if ( this.pos.x < -this.r) {
			this.pos.x = width + this.r;
		} else if (this.pos.y > height + this.r) {
			this.pos.y = -this.r;
		} else if ( this.pos.y < -this.r) {
			this.pos.y = height + this.r;
		}
	}

	this.breakup = function() {
		let newA = [];
		let newR = this.r * 0.5;
		if (newR > asteroidRadThreshold) {
			newA[0] = new Asteroid(this.pos, newR);
			newA[1] = new Asteroid(this.pos, newR);
		}
		return newA;
	}
}
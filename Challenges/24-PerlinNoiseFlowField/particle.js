function Particle() {
	this.pos = createVector(random(width), random(height));
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	this.maxSpeed = 4;
	this.prevPos = this.pos.copy();

	this.update = function() {
		this.prevPos = this.pos.copy();
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
		this.edges();
	}

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.show = function() {
		line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
	}

	this.edges = function() {
		if(this.pos.x > width) {
			this.prevPos.x = 0;
			this.pos.x = 0;
		}
		if(this.pos.x < 0) {
			this.prevPos.x = width;
			this.pos.x = width;
		}
		if(this.pos.y > height) {
			this.prevPos.y = 0;
			this.pos.y = 0;
		}
		if(this.pos.y < 0) {
			this.prevPos.y = height;
			this.pos.y = height;
		}
	}

	this.follow = function(vectors) {
		var x = floor(this.pos.x / scl);
		var y = floor(this.pos.y / scl);
		var index = x + y * cols;
		var force = vectors[index];
		this.applyForce(force);
	}
}
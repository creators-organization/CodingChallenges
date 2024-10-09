function Ship(){
	this.pos = createVector(width/2, height/2);
	this.r = 20;
	this.heading = 0;
	this.turnMagnitude = 0.1;
	this.rotation = 0;
	this.vel = createVector(0, 0);
	this.isBoosting = false;

	this.update = function() {
		this.pos.add(this.vel);
		this.vel.mult(0.99);
		this.turn();
		if (this.isBoosting) {
			this.boost();
		}
		this.edges();
	}

	this.boosting = function(b) {
		this.isBoosting = b;
	}

	this.boost = function() {
		let force = p5.Vector.fromAngle(this.heading);
		force.mult(0.1);
		this.vel.add(force);
	}

	this.render = function() {
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.heading + PI*0.5);
		fill(0);
		stroke(255);
		triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
		pop();
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

	this.setRotation = function(a) {
		this.rotation = a;
	}

	this.turn = function() {
		this.heading += this.rotation;
	}

	this.hits = function(a) {
		let d = dist(this.pos.x, this.pos.y, a.pos.x, a.pos.y);
		return (d < this.r + a.r);
	}

}

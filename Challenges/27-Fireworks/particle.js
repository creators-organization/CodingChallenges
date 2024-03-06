function Particle(
		pos,
		vel = p5.Vector.random2D(),
		dampener = 1,
		hu = 255) {
	this.pos = pos;
	this.vel = vel;
	this.acc = createVector(0, 0);
	this.dampener = dampener;
	this.lifespan = 255;
	this.hu = hu;

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.update = function() {
		this.vel.mult(this.dampener);
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	this.show = function() {
		stroke(this.hu, this.hu, this.lifespan);
		point(this.pos.x, this.pos.y);
	}
}
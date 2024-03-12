function Rocket(dna) {
	this.pos = createVector(width*0.5, height);
	// this.vel = createVector(0, -1);
	this.vel = createVector();
	this.acc = createVector();
	this.dna = dna || new DNA();
	this.fitness = 0;
	this.running = true;
	this.crashed = false;
	this.time = 0;

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.update = function() {
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);
		if(d < 10) {
			this.running = false;
			this.pos = target.copy();
		}
		if(this.pos.x > rx && this.pos.x < rx + rw && 
			this.pos.y > ry && this.pos.y < ry + rh) {
				this.crashed = true;
			}
		if (this.pos.x > width || this.pos.x < 0 ) {
				this.crashed = true;
			}
		if (this.pos.y > height || this.pos.y < 0 ) {
				this.crashed = true;
			}
		if (this.running && !this.crashed) {
			this.applyForce(this.dna.genes[count]);
			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.acc.mult(0);
			this.vel.limit(4);
			this.time++;
		}
	}

	this.show = function() {
		push();
		noStroke();
		fill(255, 150);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		rectMode(CENTER);
		rect(0, 0, 25, 5);
		pop();
	}

	this.calcFitness = function() {
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);
		this.fitness = map(d, 0, width, width, 0);
		if(this.completed) {
			this.fitness *= 10;
			this.fitness *= map(this.time, 0, lifeSpan, 20, 1);
		}
		if(this.crashed) {
			this.fitness *= 0.1;
			return
		}
	}
}
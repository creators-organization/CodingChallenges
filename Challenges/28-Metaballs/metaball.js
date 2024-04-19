function Metaball(
		position = createVector(x, y),
		radius = 40,
		velocity = p5.Vector.random2D()){
	this.pos = position;
	this.r = radius;
	this.vel = velocity;
	this.vel.mult(random(2, 4));

	this.show = function(){
		noFill();
		stroke(0);
		strokeWeight(4);
		ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
	}

	this.update = function() {
		this.pos.add(this.vel);

		if(this.pos.x > width || this.pos.x <= 0) {
			this.vel.x *= -1;
		}
		if(this.pos.y > height || this.pos.y <= 0) {
			this.vel.y *= -1;
		}
	}
}
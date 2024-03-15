function Blob(
		pos = createVector(width*0.5, height*0.5),
		radius = 64,
		col = color(255)
	) {
	this.pos = pos;
	this.r = radius;
	this.col = col;
	this.vel = createVector(0, 0);
	this.speed = 3;

	this.show = function() {
		fill(this.col);
		ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
	}

	this.update = function() {
		var newVel = createVector(mouseX- width*0.5, mouseY - height*0.5);
		newVel.setMag(this.speed);
		this.vel.lerp(newVel, 0.1);
		this.pos.add(this.vel);
	}
	
	this.eats = function(other) {
		var d = p5.Vector.dist(this.pos, other.pos);
		var isCollided = d < (this.r);
		if(isCollided) {
			var sum =
				PI * this.r * this.r +
				PI * other.r * other.r;
			this.r = sqrt(sum / PI);
			// this.r += other.r*0.2;
		}
		return isCollided;
	}
}
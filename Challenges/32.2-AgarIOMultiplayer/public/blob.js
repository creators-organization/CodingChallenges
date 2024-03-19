function Blob(
		x = width*0.5, y = height*0.5,
		radius = 64,
		col = color(255)
	) {
	this.pos = createVector(x, y);
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

	this.constrain = function() {
		this.pos.x = constrain(this.pos.x, -width-zoom, (width+zoom)*2);
		this.pos.y = constrain(this.pos.y, -height-zoom, (height+zoom)*2);
	}
	
	this.eats = function(other) {
		var d = p5.Vector.dist(this.pos, other.pos);
		var isCollided = d < (this.r);
		if(isCollided) {
			var sum = (this.r * this.r + other.r * other.r);
			this.r = sqrt(sum);
		}
		return isCollided;
	}
}

module.exports = Blob;
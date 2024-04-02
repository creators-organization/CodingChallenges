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
	let yOff = random(1);
	let zOff = random(maxBlobs);

	this.show = function() {
		fill(this.col);
		// ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
		push();
		translate(this.pos.x, this.pos.y);
		rotate(yOff*0.3);
		beginShape();
		let xOff = 0;
		for (let a = 0; a < TWO_PI; a += 0.02) {
			var offset = map(sin(noise(xOff, yOff, zOff)), 0, 1, -this.r*0.3, this.r*0.3);
			var r = this.r + offset;
			var x = r * cos(a);
			var y = r * sin(a);
			vertex(x, y);
			xOff+= 0.1;
		}
		endShape();
		pop();
		yOff+= 0.03;
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
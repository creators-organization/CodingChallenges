function Laser(shipPos, angle) {
	this.pos = createVector(shipPos.x, shipPos.y);
	this.vel = p5.Vector.fromAngle(angle);
	this.vel.mult(10);

	this.update = function() {
		this.pos.add(this.vel);
	}

	this.render = function() {
		push();
		stroke(255);
		strokeWeight(4);
		point(this.pos.x, this.pos.y);
		pop();
	}

	this.hits = function(a) {
		let d = dist(this.pos.x, this.pos.y, a.pos.x, a.pos.y);
		return (d < a.r);
	}

	this.offScreen = function(){
		return ( this.pos.x > width ) ||
		( this.pos.x < 0) ||
		( this.pos.y > height ) ||
		( this.pos.y < 0);
	}
}
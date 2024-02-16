function Leaf(pos = p5.Vector.random3D()) {
	this.pos = pos;
	this.pos.mult(random(width/2));
	this.pos.y -= height*0.25;
	this.reached = false;
	this.size = 4;

	this.show = function() {
		fill(255);
		noStroke();
		push();
		translate(this.pos.x, this.pos.y, this.pos.z);
		// sphere(this.size);
		ellipse(0, 0, this.size, this.size);
		pop();
	}
}
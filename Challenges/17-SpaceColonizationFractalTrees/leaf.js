function Leaf(x = random(width), y = random(height - 100)) {
	this.pos = createVector(x, y);
	this.reached = false;
	this.size = 4;

	this.show = function() {
		fill(255);
		noStroke();
		ellipse(this.pos.x, this.pos.y, this.size, this.size);
	}
}
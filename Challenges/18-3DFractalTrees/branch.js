function Branch(parent, pos, dir) {
	this.pos = pos;
	this.parent = parent;
	this.dir = dir;
	this.originalDir = dir;
	this.count = 0;
	this.len = 12;

	this.reset = function() {
		this.dir = this.originalDir.copy();
		this.count = 0;
	}

	this.next = function(){
		let rand = p5.Vector.random2D();
		rand.setMag(0.3);
		var nextDir = p5.Vector.mult(this.dir, this.len);
		nextDir.add(rand);
		var nextPos = p5.Vector.add(this.pos, nextDir);
		var nextBranch = new Branch(this, nextPos, this.dir.copy());
		return nextBranch;
	}

	this.show = function() {
		stroke(255, 50);
		line(this.pos.x, this.pos.y, this.pos.z, this.parent.pos.x, this.parent.pos.y, this.parent.pos.z);
	}
}
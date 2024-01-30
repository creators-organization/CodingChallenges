class Ripple {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z/3;
		this.spreadFactor = map(this.z, 0, maxDepth, 0.2, 1.2);
		this.alive = 0;
		this.death = map(this.z, 0, maxDepth, 30, 50);
	}

	ripple = function() {
		this.z += this.spreadFactor;
		return this.alive++;
	}

	show = function(){
		noFill();
		stroke(138, 43, 226, 255 - map(this.alive, 0, this.death, 0, 255));
		ellipse(this.x, this.y, this.z*4, this.z);
	}
}
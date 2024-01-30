class Drop {
	constructor(x = random(width), y = random(-height, 1), z = (random(0, maxDepth))){
		this.x = x;
		this.y = y;
		this.z = z; // higher z means closer.
		this.yspeed = map(z, 0, maxDepth, 4, 20);
		this.size = map(z, 0, maxDepth, 4, 10);
		this.thick = map(z, 0, maxDepth, 1, 3);
		this.grav = map(z, 0, maxDepth, 0.01, 0.2);
		this.groundHeight = height/2 + map(this.z, 0, maxDepth, 0, height/2);
	}

	reset = function() {
		this.y = random(-height, 0);
		this.x = random(width);
		this.yspeed = map(this.z, 0, maxDepth, 10, 20);
	}

	fall = function() {
		this.y = this.y + this.yspeed;
		this.yspeed += this.grav;
		if(this.y > this.groundHeight) {
		// if(this.y >= height) {
			return true;
		}
		return false;
	}

	show = function() {
		stroke(138, 43, 226);
		strokeWeight(this.thick);
		fill(138, 43, 226);
		ellipse(this.x, this.y, this.size/3, this.size)
		// line(this.x, this.y, this.x, this.y+this.size);
	}
}
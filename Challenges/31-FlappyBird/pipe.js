function Pipe() {
	this.top = random(height*0.5);
	this.bottom = random(height*0.5);
	this.x = width;
	this.w = 20;
	this.speed = 2;
	this.highlight = false;

	this.show = function() {
		fill(255);
		if(this.highlight) {
			fill(255, 0, 0);
		}
		rect(this.x, 0, this.w, this.top);
		rect(this.x, height-this.bottom, this.w, this.bottom);
	}

	this.update = function() {
		this.x -= this.speed;
	}

	this.offScreen = function() {
		return this.x < -this.w;
	}

	this.hits = function(b) {
		if(b.y < this.top || b.y > height - this.bottom) {
			if (b.x > this.x && b.x < this.x + this.w) {
				this.highlight = true;
				return true;
			}
		}
		this.highlight = false;
		return false;
	}
}
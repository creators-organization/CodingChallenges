function Flower(x = width/2, y = 60, size=60, health=10) {
	this.startx = x;
	this.starty = y;
	this.x = x;
	this.y = y;
	this.size = size;
	this.health = health;
	this.xdir = 2;
	this.ydir = 20;

	this.show = function() {
		fill(255, 0, 200);
		ellipse(this.x, this.y, this.size, this.size);
		fill(0, 0, 255);
		ellipse(this.x, this.y, this.size/2, this.size/2);
		fill(255,255,153);
		ellipse(this.x-this.size/2, this.y-this.size/3, this.size/2, this.size/2);
		ellipse(this.x+this.size/2, this.y-this.size/3, this.size/2, this.size/2);
		ellipse(this.x-this.size/2, this.y+this.size/3, this.size/2, this.size/2);
		ellipse(this.x+this.size/2, this.y+this.size/3, this.size/2, this.size/2);
		ellipse(this.x, this.y-this.size/2, this.size/2, this.size/2);
		ellipse(this.x, this.y+this.size/2, this.size/2, this.size/2);
		fill(0);
		ellipse(this.x, this.y, this.size/4, this.size/4);
	}

	this.move = function() {
		this.x += this.xdir;
		return (this.x - this.size/2 < 0) || (this.x + this.size/2 > width);
	}

	this.advance = function() {
		this.y += this.ydir;
		this.xdir = -this.xdir;
		return this.hitBottom();
	}

	this.hitBottom = function() {
		return (this.y > height - this.size/2);
	}

	this.grow = function(x = 2) {
		this.size += x;
	}
}
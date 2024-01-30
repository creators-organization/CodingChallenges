function Ship(x = width/2, y = height-20, size = 20) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.dir = 0;
	this.isWatering = false;

	this.show = function() {
		fill(255);
		rectMode(CENTER);
		rect(this.x, this.y, this.size, this.size);
	}

	this.move = function() {
		this.x += this.dir*5;
		this.x = constrain(this.x, this.size/2, width-this.size/2);
	}

	this.setDir = function(direction) {
		this.dir = direction;
	}

	this.water = function() {
		if(this.isWatering){
			let size = 15;
			let d = new Drop(ship.x, ship.y - (ship.size/2) - size/2, size)
			drops.push(d);
		}
	}
}
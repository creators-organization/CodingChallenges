function Drop(x = width/2, y = height/2, size = 15, speed = 5) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.speed = speed;1

	this.show = function() {
		noStroke();
		fill(50, 0, 200);
		ellipse(this.x, this.y, this.size, this.size);
	}

	this.move = function(){
		this.y -= this.speed;
	}

	this.hits = function(f){
		var d = dist(this.x, this.y, f.x, f.y);
		return (d < this.size/2 + f.size/2);
	}
}
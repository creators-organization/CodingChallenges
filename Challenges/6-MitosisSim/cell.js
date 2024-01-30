function Cell(
		pos = createVector(random(width), random(height)),
		r= 80,
		c = color(random(100, 255), 0, random(100, 255)),
		speed = 1) {
	this.pos = pos;
	this.r = r;
	this.c = c;
	this.speed = speed;
	this.vel = p5.Vector.random2D();

	this.move = function(){
		let newVel = createVector(this.vel.x * this.speed, this.vel.y * this.speed);
		this.pos.add(newVel);
		this.pos.x = constrain(this.pos.x, this.r*0.5, width-this.r*0.5);
		this.pos.y = constrain(this.pos.y, this.r*0.5, height-this.r*0.5);
	}
	this.updateVel = function(){
		return p5.Vector.random2D();
	}
	this.show = function() {
		noStroke();
		fill(this.c);
		ellipse(this.pos.x, this.pos.y, this.r, this.r);
		// strokeWeight(4);
		// stroke(255);
		// line(this.pos.x, this.pos.y, this.pos.x+this.vel.x*100, this.pos.y+this.vel.y*100);
	}
	this.collided = function(x, y){
		return dist(this.pos.x, this.pos.y, x, y) < (this.r*0.5);
	}
	this.mitosis = function(s=2) {
		let splitCells = [];
		for (let i = 0; i < s; i++) {
			let offset = random(-this.r*0.5, this.r*0.5);
			let newPos = createVector(this.pos.x + offset, this.pos.y + offset);
			let cellA = new Cell(newPos, this.r*0.8, this.c, this.speed*1.1);
			cells.push(cellA);
		}
		return splitCells;
	}
}
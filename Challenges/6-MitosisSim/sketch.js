let cells = [];
let frame = 0;

function setup(){
	createCanvas(600, 600);
	for (let i = 0; i < 10; i++) {
		cells.push(new Cell());
	}
}

function draw(){
	frame = ++frame % 30;
	background(51);
	for(let i = cells.length -1 ; i >= 0; i--) {
		let c = cells[i];
		let newVel = createVector();
		let maxMagnitude = 0;
		for(let j = cells.length - 1; j >= 0; j--) {
			let cj = cells[j];
			if(cj?.pos === c.pos) { continue; }
			if(cj.collided(c.pos.x, c.pos.y)) {
				newVel.x += cj.pos.x - c.pos.x;
				newVel.y += cj.pos.y - c.pos.y;
				let magnitude = newVel.x*newVel.x + newVel.y * newVel.y;
				if(magnitude > maxMagnitude) { maxMagnitude = magnitude; }
			}
		}
		if(maxMagnitude !== 0){
			maxMagnitude = sqrt(maxMagnitude);
			c.vel = createVector(-newVel.x/maxMagnitude, -newVel.y/maxMagnitude);
		} else if(frame === 0){
			c.vel = c.updateVel();
		}
		c.move();
		c.show();
	}
}

function mousePressed() {
	for(let i = cells.length - 1; i >= 0; i--) {
		let c = cells[i];
		if(c.collided(mouseX, mouseY)){
			c.mitosis();
			cells.splice(i,1);
		}
	}
}
function Walker(opts) {
	this.pos = (opts?.pos != undefined) ? opts['pos'] : randomPoint();
	this.stuck = (opts?.stuck != undefined) ? opts['stuck'] : false;
	if (opts?.color != undefined) {
		this.col = opts['color'];
	} else {
		this.col = (opts?.stuck != undefined) ?
			color(255, 0, 100, 200):
			color(255, 255, 255, 200);
	}
	this.stickiness = (opts?.stickiness != undefined) ? opts['stickiness'] : 1;
	this.r = (opts?.radius != undefined) ? opts['radius'] : startR;

	this.walk = function() {
		var vel = p5.Vector.random2D();
		this.pos.add(vel);
		this.pos.x = constrain(this.pos.x, 0, width);
		this.pos.y = constrain(this.pos.y, 0, height);
	}

	this.checkStuck = function(others) {
		for (let i = 0; i < others.length; i++) {
			const t = others[i];
			var d = distSq(this.pos, t.pos);
			if (d < this.r * t.r*4) {
				if(random(1) < this.stickiness) {
					this.stuck = true;
					this.col = color(255, 0, 100);
					break;
				}
			}
		}
		return this.stuck;
	}

	this.show = function() {
		// this.colorStuck();
		// this.colorHueStuck();
		this.colorStuckOrder();
	}

	this.colorStuck = function() {
		fill(this.col);
		ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
	}
	this.colorHueStuck = function() {
		var hu = map(this.r, 0, startR, 0, 360);
		this.color = color(hu, 255, 255);
		this.colorStuck();
	}
	this.colorStuckOrder = function() {
		fill(this.col);
		ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
	}
}
function Planet(
		r=0,
		d=0,
		c=color(random(100, 255), 0, random(100, 255), random(100, 200)),
		orbitSpeed = random(0.001, 0.1)) {
	this.r = r;
	this.d = d;
	this.c = c;

	this.a = random(0, TWO_PI);
	this.orbitSpeed = orbitSpeed;
	this.moons = [];

	this.show = function() {
		push();
		rotate(this.a);
		translate(this.d, 0);
		fill(this.c);
		ellipse(0, 0, this.r*2, this.r*2);
		for(let i = this.moons.length-1; i >= 0; i--) {
			let m = this.moons[i];
			m.show();
			m.orbit();
		}
		pop();
	};

	this.orbit = function() {
		this.a+=this.orbitSpeed;
	};

	this.spawnMoons = function(total, level, maxLevel = 4) {
		for (let i = 0; i < total; i++) {
			const r = this.r/(level*1.2);
			const d = random(50, 300);
			const c = color(random(100, 255), 0, random(100, 255), random(100, 200));
			const o = random(-0.1, 0.1);
			const moon = new Planet(r, d/level, c, o);
			if(level < maxLevel) {
				moon.spawnMoons(random(0, 4), ++level);
			}
			this.moons.push(moon);
		}
	}
}
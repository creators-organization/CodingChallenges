function Planet(
		r=0,
		d=0,
		c=color(random(100, 255), 0, random(100, 255), random(100, 200)),
		img,
		orbitSpeed = random(0.001, 0.1)) {
	this.r = r;
	this.d = d;
	this.c = c;
	this.orbitSpeed = orbitSpeed;
	this.texture = img || textures[0];

	this.a = random(0, TWO_PI);
	this.v = p5.Vector.random3D();
	this.v.mult(this.d);
	this.moons = [];

	this.show = function() {
		push();
		noStroke();
		let p = this.v.cross(createVector(1, 0, 1));
    // Rotation around a 0-length axis doesn't work in p5.js, so don't do that.
		if (p.x != 0 || p.y != 0 || p.z != 0) {
      rotate(this.a, p);
    }
		stroke(255);
    // line(0, 0, 0, this.v.x, this.v.y, this.v.z);
    // line(0, 0, 0, p.x, p.y, p.z);
		translate(this.v.x, this.v.y, this.v.z);
		noStroke();
		fill(this.c);
		texture(this.texture);
		sphere(this.r);
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
		let dPrime = this.r
		for (let i = 0; i < total; i++) {
			const r = this.r/(level*1.2);
			const randD = random(r*2, r*5);
			// dPrime += randD;
			const d = dPrime + randD;
			const c = color(random(100, 255), 0, random(100, 255), random(100, 200));
			const o = random(-0.1, 0.1);
      let index = int(random(1, textures.length));
			const moon = new Planet(r, d, c, textures[index], o);
			if(level < maxLevel) {
				moon.spawnMoons(
					random(1, 4),
					++level);
			}
			this.moons.push(moon);
		}
	}
}
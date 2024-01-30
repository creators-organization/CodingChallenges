class Star{
	float x;
	float y;
	float z;

	float pz;

	Star(){
		reset();
	}

	void reset(){
		x = random(-width/2, width/2);
		y = random(-height/2, height/2);
		z = random(0, width);
		pz = z;
	}

	void update(){
		z -= speed;
		if(z < 1){
			reset();
		}
	}

	void show(){
		noStroke();

		float sx = map(x/z, 0, 1, 0, width);
		float sy = map(y/z, 0, 1, 0, height);
		float r = map(z, 0,  width, 16, 0);
		ellipse(sx, sy, r, r);

		float px = map(x/pz, 0, 1, 0, width);
		float py = map(y/pz, 0, 1, 0, height);
		stroke(255);
		line(px, py, sx, sy);
		// line(px, py, x, y);

		pz = z;

	}
}

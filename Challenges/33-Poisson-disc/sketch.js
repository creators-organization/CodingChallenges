var r = 10;
var k = 30;
var w = r / Math.sqrt(2);

var dynamicPerFrame = true;
var perFrame = 150;
var hueShiftSpeed = 50;

var hueShift = 0;
var grid = [];
var active = [];
var ordered = [];
var cols, rows;

function setup(){
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);
	noStroke();
	// strokeWeight(r*0.5);
	reset();
}

function reset() {
	active = [];
	grid = [];
	ordered = [];
	if(dynamicPerFrame) {
		perFrame = max(floor(max(windowWidth, windowHeight) * 0.08), 1);
	}

	// STEP 0
	cols = floor(width / w);
	rows = floor(height / w);
	for (let i = 0; i < cols * rows; i++) {
		grid[i] = undefined;
	}

	// STEP 1
	var x = random(width*0.25, width*0.75);
	var y = random(height*0.25, height*0.75);
	var i = floor(x / w);
	var j = floor(y / w);
	var pos = createVector(x, y);
	grid[i + j * cols] = pos;
	active.push(pos);
}

function draw(){
	background(0);

	for (let i = 0; i < perFrame; i++) {
		poissonDisc();
	}
	for (let i = 0; i < ordered.length; i++) {
		const o = ordered[i];
		// fill(i/10 % 360, 100, (frameCount + (ordered.length - i)/10) % 100);
		// fill(i/10 % 360, 100, 100);
		// fill((hueShift + i)/10 % 360, 100, 100);
		// fill(300, 100, i/20 % 100);
		fill((hueShift + i)/10 % 360, 100, ((ordered.length - i)/40) % 100);
		ellipse(o.x, o.y, r*0.5, r*0.5);
		// stroke(i/10 % 360, 100, 100);
		// point(o.x, o.y);
	}
	if(active.length <= 0){
		for (let i = 0; i < perFrame; i++) {
			ordered.pop();
		}
		if(ordered.length <= 0) reset();
	}
	// for (let i = 0; i < grid.length; i++) {
	// 	stroke(i/100 % 360, 100, 100);
	// 	const g = grid[i];
	// 	if(g) {
	// 		point(g.x, g.y);
	// 	}
	// }
	// stroke(255, 0, 255);
	// for (let i = 0; i < active.length; i++) {
	// 	const a = active[i];
	// 	point(a.x, a.y);
	// }
  hueShift -= hueShiftSpeed;
  if(hueShift < 0) hueShift = 360 * hueShiftSpeed;
}

function poissonDisc() {
	// STEP 2
	if (active.length > 0) {
		var randIndex = floor(random(active.length));
		var pos = active[randIndex];
		var found = false;
		for (let n = 0; n < k; n++) {
			var sample = p5.Vector.random2D();
			var m = random(r, 2 * r);
			sample.setMag(m);
			sample.add(pos);

			var col = floor(sample.x / w);
			var row = floor(sample.y / w);
			if (col >= 0 && col < cols && row >= 0 && row < rows && !grid[col + row * cols]) {
				var ok = true;
				for (let i = -1; i <= 1; i++) {
					for (let j = -1; j <= 1; j++) {
						var index = col + i + (row + j) * cols;
						var neighbor = grid[index];
						if (neighbor) {
							var d = p5.Vector.dist(sample, neighbor);
							if (d < r) {
								ok = false;
								break;
							}
						}
					}
					if (!ok) break;
				}
				if (ok) {
					found = true;
					grid[col + row * cols] = sample;
					active.push(sample);
					ordered.push(sample);
				}

			}
		}
		if (!found) {
			active.splice(randIndex, 1);
		}
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
	reset();
}

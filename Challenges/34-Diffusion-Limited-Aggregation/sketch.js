var startR = 10;
var minR = 1;
var numWalkers = 50;
var walkIterations = 1000;
var hueShiftSpeed = 0.5;
var generationReduction = 0.99;

var tree = [];
var walkers = [];
var hueShift = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);
	reset();
}

function reset() {
	tree = [];
	walkers = [];
	initializeCenterOut();
	// initializeBottomUp();
}

function initializeBottomUp() {
	for (let x = 0; x < width; x += startR*2) {
		tree.push(new Walker({pos: createVector(x, height), stuck: true, color: color(hueShift, 100, 100)}));
	}
	for (let i = 0; i < numWalkers; i++) {
		walkers.push(new Walker({pos: randomPoint(0)}));
	}
}
function initializeCenterOut() {
	tree[0] = new Walker({
		pos:createVector(width * 0.5, height * 0.5),
		stuck: true,
		color: color(hueShift, 100, 100)
	});
	hueShift += hueShiftSpeed;
	for (let i = 0; i < numWalkers; i++) {
		walkers.push(new Walker());
	}
}

function draw(){
	background(0);
	for (let i = 0; i < tree.length; i++) {
		const t = tree[i];
		t.show();
	}
	for (let i = walkers.length - 1; i >= 0; i--) {
		const w = walkers[i];
		w.show();
	}
	for (let i = 0; i < walkIterations; i++) {
		for (let i = walkers.length - 1; i >= 0; i--) {
			const w = walkers[i];
			w.walk();
			if(w.checkStuck(tree)) {
				setNewOrderedHue(w);
				tree.push(w);
				walkers.splice(i, 1);
			}
		}
	}
	var r = walkers[walkers.length - 1]?.r * generationReduction;
	while(r > minR && walkers.length < numWalkers) {
		// walkers.push(new Walker({radius: r}));
		walkers.push(new Walker({radius: r}));
	}
	if(walkers.length <= 0) {
		rotate(0.5);
	}
}

function setNewOrderedHue(walker) {
	walker.col = color(hueShift, 100, 100);
	hueShift += hueShiftSpeed;
	if (hueShift > 360) {
		hueShift = 0;
	} else if (hueShift < 0) {
		hueShift = 360;
	}
}

function randomPoint(i = floor(random(4))) {
	var i = i;

	if(i === 0) { // top
		var x = random(width);
		return createVector(x, 0);
	} else if (i === 1) { // bottom
		var x = random(width);
		return createVector(x, height);
	} else if (i === 2) { // left
		var y = random(height);
		return createVector(0, y);
	} else { // right
		var y = random(height);
		return createVector(width, y);
	}
}

function distSq(a, b) {
	var dx = b.x - a.x;
	var dy = b.y - a.y;
	return dx * dx + dy * dy;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
	reset();
}

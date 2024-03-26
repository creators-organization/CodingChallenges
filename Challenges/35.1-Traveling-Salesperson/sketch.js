var cities = [];
var totalCities = 7;
var citySize = 8;

var i = 0;
var j = 0;
var recordDistance;
var bestPath;

function setup(){
	createCanvas(600, 600);
	reset();
}

function reset() {
	cities = [];
	for (let i = 0; i < totalCities; i++) {
		var v = createVector(random(width), random(height));
		cities.push(v);
	}
	recordDistance = calcDistance(cities);
	bestPath = cities.slice();
}

function draw(){
	background(0);

	// draw cities
	fill(255);
	for (let i = 0; i < cities.length; i++) {
		var c = cities[i];
		ellipse(c.x, c.y, citySize, citySize);
	}

	// draw path;
	stroke(255, 100);
	strokeWeight(1);
	noFill();
	beginShape();
	for (let i = 0; i < cities.length; i++) {
		var c = cities[i];
		vertex(c.x, c.y);
	}
	endShape();
	// draw best path;
	stroke(255, 0, 255);
	strokeWeight(4);
	noFill();
	beginShape();
	for (let i = 0; i < bestPath.length; i++) {
		var c = bestPath[i];
		vertex(c.x, c.y);
	}
	endShape();

	// find new shortest path
	var i = floor(random(cities.length));
	var j = floor(random(cities.length));
	swap(cities, i, j);

	var d = calcDistance(cities);
	if(d < recordDistance) {
		recordDistance = d;
		bestPath = cities.slice();
		console.log(recordDistance);
	}
}

function windowResized() {
  resizeCanvas(600, 600);
	reset();
}

function swap(a, i, j) {
	var temp = a[i];
	a[i] = a[j];
	a[j] = temp;
}

function calcDistance(points) {
	var sum = 0;
	for (let i = 0; i < points.length - 1; i++) {
		const p1 = points[i];
		const p2 = points[i+1];
		var d = sqrDist(p1, p2);
		sum += d;
	}
	return sum;
}

function sqrDist(a, b) {
	var dx = b.x - a.x;
	var dy = b.y - a.y;
	return dx*dx + dy*dy;
}
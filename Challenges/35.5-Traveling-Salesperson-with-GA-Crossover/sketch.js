var cities = [];
var totalCities = 12;
var citySize = 8;

var population = [];
var numPopulation = 100;
var fitness = [];

var recordDistance = Infinity;
var bestPath;
var currentBest;

function setup(){
	createCanvas(600, 600);
	reset();
}

function reset() {
	cities = [];
	population = [];
	permutation = 1;
	var order = [];
	for (let i = 0; i < totalCities; i++) {
		var v = createVector(random(width), random(height*0.9));
		cities.push(v);
		order.push(i);
	}
	for (let i = 0; i < numPopulation; i++) {
		population[i] = shuffle(order.slice());
	}
	calculateFitness();
}

function draw(){
	background(0);

	// GA
	calculateFitness();
	normalizeFitness();
	nextGeneration();

	drawPath(currentBestPath, color(255, 100), 1);
	drawPath(bestPath);
	drawCities();
}

function drawPath(path, col = color(255, 0, 255), sw = 4) {
	stroke(col);
	strokeWeight(sw);
	noFill();
	beginShape();
	for (let i = 0; i < path.length; i++) {
		var n = path[i];
		var c = cities[n];
		vertex(c.x, c.y);
	}
	endShape();
}

function drawCities() {
	fill(255);
	for (let i = 0; i < cities.length; i++) {
		var c = cities[i];
		ellipse(c.x, c.y, citySize, citySize);
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

function calcDistance(points, order) {
	var sum = 0;
	for (let i = 0; i < order.length - 1; i++) {
		var cityAIndex = order[i];
		var p1 = points[cityAIndex];
		var cityBIndex = order[i+1];
		var p2 = points[cityBIndex];
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


var cities = [];
var totalCities = 10;
var citySize = 8;

var population = [];
var numPopulation = 100;
var fitness = [];

var recordDistance = Infinity;
var bestPath;

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

	drawCities();
	drawBestPath();
	// drawCurrentPathPermutation();
	// drawPercentComplete();

	// calculateBestPath();
}

// function drawPercentComplete() {
// 	textSize(32);
// 	fill(255);
// 	var percent = 100 * permutation / totalPermutations;
// 	var completionText = (permutation != totalPermutations) ? nf(percent, 0, 2) + "% completed": "Shortest Path.";
// 	text(completionText, 20, height - 30);
// }

function calculateBestPath() {
	var d = calcDistance(cities, order);
	if (d < recordDistance) {
		recordDistance = d;
		bestPath = order.slice();
		console.log(recordDistance);
	}
}

// function drawCurrentPathPermutation() {
	
// 	// translate(0, -height* 0.5);
// 	stroke(255, 100);
// 	strokeWeight(1);
// 	noFill();
// 	beginShape();
// 	for (let i = 0; i < order.length; i++) {
// 		var n = order[i];
// 		var c = cities[n];
// 		vertex(c.x, c.y);
// 	}
// 	endShape();
// }

function drawBestPath() {
	stroke(255, 0, 255);
	strokeWeight(4);
	noFill();
	beginShape();
	for (let i = 0; i < bestPath.length; i++) {
		var n = bestPath[i];
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


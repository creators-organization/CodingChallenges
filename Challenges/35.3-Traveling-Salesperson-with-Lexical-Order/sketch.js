var cities = [];
var totalCities = 6;
var citySize = 8;

var order;
var totalPermutations;
var permutation = 1;

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
	order = [];
	permutation = 1;
	for (let i = 0; i < totalCities; i++) {
		var v = createVector(random(width), random(height*0.9));
		cities.push(v);
		order.push(i);
	}
	recordDistance = calcDistance(cities, order);
	bestPath = order.slice();
	totalPermutations = factorial(totalCities);
	console.log(totalPermutations);
}

function draw(){
	background(0);

	drawCities();
	drawBestPath();
	drawCurrentPathPermutation();
	drawPercentComplete();

	calculateBestPath();
	nextOrder();
}

function drawPercentComplete() {
	textSize(32);
	fill(255);
	var percent = 100 * permutation / totalPermutations;
	var completionText = (permutation != totalPermutations) ? nf(percent, 0, 2) + "% completed": "Shortest Route.";
	text(completionText, 20, height - 30);
}

function calculateBestPath() {
	var d = calcDistance(cities, order);
	if (d < recordDistance) {
		recordDistance = d;
		bestPath = order.slice();
		console.log(recordDistance);
	}
}

function drawCurrentPathPermutation() {
	
	// translate(0, -height* 0.5);
	stroke(255, 100);
	strokeWeight(1);
	noFill();
	beginShape();
	for (let i = 0; i < order.length; i++) {
		var n = order[i];
		var c = cities[n];
		vertex(c.x, c.y);
	}
	endShape();
}

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

function nextOrder() {
	let largestI = -1;
	for (let i = 0; i < order.length - 1; i++) {
		if(order[i] < order[i + 1]) {
			largestI = i;
		}
	}
	if(largestI === -1) {
		return -1;
	}
	let largestJ = -1;
	for (let j = largestJ; j < order.length; j++) {
		if(order[largestI] < order[j]) {
			largestJ = j;
		}
	}

	swap(order, largestI, largestJ);

	let endArray = order.splice(largestI + 1);
	endArray.reverse();
	order = order.concat(endArray);
	return permutation++;
}

function factorial(n) {
	if (n == 1) {
		return 1;
	} else {
		return n * factorial(n-1);
	}
}
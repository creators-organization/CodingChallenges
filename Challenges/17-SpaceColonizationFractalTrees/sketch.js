
var tree;
var max_dist = 100;
var min_dist = 12;
var maxTries = 100;
var currentTry = 0;
var prevLen;

function setup(){
	createCanvas(windowWidth, windowHeight);
	reset();
}

function reset(){
	tree = new Tree();
	prevLen = tree.leaves.length;
	currentTry = 0;
}

function draw(){
	if(currentTry < maxTries){
		background(51);
		tree.show();
		tree.grow();
		if(prevLen != tree.leaves.length) {
			currentTry = 0;
		}
		prevLen = tree.leaves.length;
	} else {
		reset();
	}
	currentTry++;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
	reset();
}
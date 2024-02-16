
var tree;
var max_dist = 100;
var min_dist = 12;
var maxTries = 100;
var currentTry = 0;
var prevLen;

let easyCam;

function setup(){
	let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
	easyCam = createEasyCam({distance:(windowWidth+windowHeight)*0.5});
	// Disable the context menu on the canvas so the camera can use the right mouse button
	canvas.elt.oncontextmenu = () => false;
	reset();
}

function reset(){
	tree = new Tree();
	prevLen = tree.leaves.length;
	currentTry = 0;
}

function draw(){
	background(51);
	tree.show();
	tree.grow();
	if(prevLen != tree.leaves.length) {
		currentTry = 0;
	}
	prevLen = tree.leaves.length;
	if(currentTry++ >= maxTries){
		reset();
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easyCam.setViewport([0,0,windowWidth, windowHeight]);
	reset();
}
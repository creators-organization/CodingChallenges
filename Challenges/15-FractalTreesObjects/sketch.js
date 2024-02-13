var angle;
var lenIter;
var angleSlider;
var lengthSlider;
var deep = 0;
var maxDepth = 12;

var tree = [];
var leaves = [];

function setup(){
	createCanvas(400, 400);
	angle = PI*0.25;
	lenIter = 0.67;
	angleSlider = createSlider(0, TWO_PI, PI*0.25, 0.01);
	lengthSlider = createSlider(0.005, 0.99, 0.67, 0.005);
	depth = 0;

	var a = createVector(width/2, height);
	var b = createVector(width/2, height - 100);
	var root = new Branch(a, b);
	tree.push(root);
}

function mousePressed() {
	for (let i = tree.length - 1; i >= 0; i--) {
		if(tree[i].finished) continue;
		tree = tree.concat(tree[i].branch());
		tree[i].finished = true;
	}
	depth++;
	for (let i = tree.length - 1; i >= 0; i--) {
		if(tree[i].finished || depth < 5) continue;
		var leaf = tree[i].end.copy();
		leaves.push(leaf);
	}
}

function draw(){
	background(51);
	angle = angleSlider.value();
	lenIter = lengthSlider.value();
	// angle = map(mouseX, 0, width, 0, PI)
	// lenIter = map(mouseY, height, 0, 0.005, 0.99)

	for (let i = 0; i < tree.length; i++) {
		tree[i].show();
		// tree[i].jitter();
	}
	for (let i = 0; i < leaves.length; i++) {
		let leaf = leaves[i];
		fill(255, 0, 100);
		noStroke();
		ellipse(leaf.x, leaf.y, 8, 8);
		leaf.y += random(0, 2);
	}
}

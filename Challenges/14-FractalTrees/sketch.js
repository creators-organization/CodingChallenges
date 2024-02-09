var a;
var lenIter;
var angleSlider;
var lengthSlider;
var deep = 0;
var maxDepth = 12;

function setup(){
	createCanvas(windowWidth, windowHeight);
	a = PI*0.25;
	lenIter = 0.67;
	angleSlider = createSlider(0, TWO_PI, PI*0.25, 0.01);
	lengthSlider = createSlider(0.005, 0.99, 0.67, 0.005);
	depth = 0;
}

function draw(){
	background(51);
	// a = angleSlider.value();
	// lenIter = lengthSlider.value();
	a = map(mouseX, 0, width, 0, PI)
	lenIter = map(mouseY, height, 0, 0.005, 0.99)

	stroke(80, 40, 0);
	translate(width/2, height);
	strokeWeight(20);
	branch(100, 8, deep);
}

function branch(len, branchWeight, depth=0){
	line(0, 0, 0, -len);
	translate(0, -len);
	strokeWeight(branchWeight);
	if(depth < maxDepth){
		for (let i = -1; i <= 1; i++) {
			// if(random(1) < 0.5) continue;
			if(i === 0) continue;
			if(depth >= 0 && depth < maxDepth - 3) stroke(110, 55, 0);
			if(depth >= maxDepth - 3) stroke(0, 100, 10);
			push();
			rotate(a*i);
			branch(len*lenIter, branchWeight*0.9, depth+1);
			pop();
		}
	}
}
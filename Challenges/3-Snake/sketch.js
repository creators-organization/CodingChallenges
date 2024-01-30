var s;
var scl = 20;
var inactiveFrames = 0;
var minInactive = 20;
var deathScreenColor = 0;
var frame = 0;

var food;

function setup(){
	createCanvas(600, 600);
	deathScreenColor = 0;
	restart();
}

function restart(){
	s = new Snake();
	frameRate(60);
	createFood();
}

function createFood() {
	var cols = floor(width/scl);
	var rows = floor(height/scl);
	food = createVector(floor(random(cols)), floor(random(rows)));
	while(s.isInTail(food)){
		food = createVector(floor(random(cols)), floor(random(rows)));
	}
	food.mult(scl);
}

function draw(){
	deathScreenColor = deathScreenColor -1;
	if (deathScreenColor < 0) deathScreenColor = 0;
	background(deathScreenColor, 0, 0);
	frame = (frame + 1) % 6;
	if(frame === 0){
		// if(inactiveFrames > minInactive){ 
		// 	s.ai(food);
		// } else {
		// 	inactiveFrames++;
		// }
		s.update();
		if(s.eat(food)) createFood();
	}

	s.show();
	fill(255, 0, 100);
	rect(food.x, food.y, scl, scl);

	if(s.isDead()) {
		deathScreenColor = 100;
		restart();
	}
}

function keyPressed(){
	inactiveFrames = 0;
	if(keyCode === UP_ARROW || key === "w"){
		s.dir(0, -1);
	} 
	else if (keyCode === DOWN_ARROW || key === "s"){
		s.dir(0, 1);
	}
	else if (keyCode === RIGHT_ARROW || key === "d"){
		s.dir(1, 0);
	}
	else if (keyCode === LEFT_ARROW || key === "a"){
		s.dir(-1, 0);
	}
}
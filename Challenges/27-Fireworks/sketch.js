let easyCam; 
var fireworks = [];
var gravity;
var rotateZSpeed = 0.3;

function setup(){
	createCanvas(windowWidth, windowHeight, WEBGL);
	easyCam = createEasyCam({distance:1000});
	colorMode(HSB);
	gravity = createVector(0, 0.2, 0);
	stroke(255);
	strokeWeight(4);
}

function draw(){
	background(0,0,0,a=51);
	translate(-width*0.5, -height*0.5);
	lights();
	rotateY(rotateZSpeed);
	if(random(1) < 0.1 && frameRate() > 50){
		fireworks.push(new Firework());
	}
	for (let i = fireworks.length - 1; i >= 0; i--) {
		fireworks[i].update();
		fireworks[i].show();
		if(fireworks[i].done) {
			fireworks.splice(i, 1);
			if(frameRate() > 50) {
				fireworks.push(new Firework());
			}
		}
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easyCam.setViewport([0,0,windowWidth, windowHeight]);
}
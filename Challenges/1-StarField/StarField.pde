Star[] stars = new Star[800];
float baseSpeed = 10;
float speed = 10;
float minSpeed = 0;
float maxSpeed = 50;
float baseSpeedMultiplier;
float speedMultiplier = 2;
float accelerationRate = 1;
float maxSpeedMultiplier = 10;
float prevMouseX;
float prevMouseY;
float handling = 0.005;
boolean slowDown = false;

void settings(){
	size(800, 800);
}

void setup(){
	for (int i = 0; i < stars.length; ++i) {
		stars[i] = new Star();
	}
	translate(width/2, height/2);
	baseSpeedMultiplier = speedMultiplier;
	prevMouseX = mouseX;
	prevMouseY = mouseY;
}

void draw(){
	// speed = map(mouseX, 0, width, minSpeed, maxSpeed);
	background(0);
	translate(lerp(mouseX, prevMouseX, handling), lerp(mouseY, prevMouseY, handling));
	for (int i = 0; i < stars.length; ++i) {
		stars[i].update();
		stars[i].show();
	}
	if(keyPressed == true){
		if(key == CODED){
			if(keyCode == SHIFT){
				slowDown = false;
				speed = baseSpeed * speedMultiplier;
				speedMultiplier = lerp(speedMultiplier, maxSpeedMultiplier, 0.05);
				// speedMultiplier += accelerationRate;
				// if(speedMultiplier > maxSpeedMultiplier){
				// 	speedMultiplier = maxSpeedMultiplier;
				// }
			}
		}
	}
	else if(slowDown == true)
  	{
		speed = lerp(speed, baseSpeed, 0.06);
	}
}

void keyReleased() {
	if(key == CODED){
		if(keyCode == SHIFT){
			speedMultiplier = baseSpeedMultiplier;
			slowDown = true;
		}
	}
}

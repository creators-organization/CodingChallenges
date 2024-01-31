let sun;
let planets;
var level;
var easyCam;

// offset for scrollbars, there's a better way to do this with css, I'm sure. noScroll is a thing.
var widthOffset = 20;
var heightOffset = 20;

function setup(){
	createCanvas(windowWidth-widthOffset, windowHeight-heightOffset, WEBGL);
	easyCam = createEasyCam({distance:500});
	planets = [];
	level = 1;
	sun = new Planet(50, 0, 255, 0);
	sun.spawnMoons(5, ++level);
	planets.push(sun);
}

function draw(){
	background(0);
	lights();
	for(let i = planets.length-1; i >= 0; i--) {
		let p = planets[i];
		p.show();
		p.orbit();
	}
}

// Above a certain height and width, about 1200, the mouse movement doesn't work. Below that there's rotate (mouse click+drag) and zoom (mouse wheel).
function windowResized() {
  resizeCanvas(windowWidth-widthOffset, windowHeight-heightOffset);
  easycam.setViewport([0,0,windowWidth, windowHeight]);
}

// // resets the sim.
// function mousePressed(){
// 	setup();
// }
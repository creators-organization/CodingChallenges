let sun;
let planets;
var level;
var easyCam;

let textures = [];

// offset for scrollbars, there's a better way to do this with css, I'm sure. noScroll is a thing.
var widthOffset = 20;
var heightOffset = 20;

// The preload function loads images in https in chrome, which isn't set up on my PC.
// So I used the Live Server Extension for vscode to Live Server: Start Live Server and run it instead.
function preload() {
	textures[0] = loadImage('data/sun.jpg');
	textures[1] = loadImage('data/mercury.jpg');
	textures[2] = loadImage('data/earth.jpg');
	textures[3] = loadImage('data/mars.jpg');
}

function setup(){
	let canvas = createCanvas(windowWidth-widthOffset, windowHeight-heightOffset, WEBGL);
	// Disable the context menu on the canvas so the camera can use the right mouse button
	canvas.elt.oncontextmenu = () => false;
	easyCam = createEasyCam({distance:500});
	planets = [];
	level = 1;
	sun = new Planet(50, 0, 255, textures[0], 0);
	sun.spawnMoons(5, ++level);
	planets.push(sun);
}

function draw(){
	background(0);
	ambientLight(255, 255, 255, 23);
	pointLight(255, 255, 255, 255, 0, 0, 0)
	// lights();
	for(let i = planets.length-1; i >= 0; i--) {
		let p = planets[i];
		p.show();
		p.orbit();
	}
}

// Above a certain height and width, about 1200, the mouse movement doesn't work. Below that there's rotate (mouse click+drag) and zoom (mouse wheel).
function windowResized() {
	resizeCanvas(windowWidth-widthOffset, windowHeight-heightOffset);
	easyCam.setViewport([0,0,windowWidth, windowHeight]);
}

// // resets the sim.
// function mousePressed(){
// 	setup();
// }
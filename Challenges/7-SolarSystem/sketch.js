let sun;
let planets;
var level;

function setup(){
	planets = [];
	level = 1;
	createCanvas(600, 600);
	sun = new Planet(50, 0, 255, 0);
	sun.spawnMoons(5, ++level);
	planets.push(sun);
}

function draw(){
	background(0);
	translate(width/2, height/2);
	for(let i = planets.length-1; i >= 0; i--) {
		let p = planets[i];
		p.show();
		p.orbit();
	}
}

function mousePressed(){
	setup();
}
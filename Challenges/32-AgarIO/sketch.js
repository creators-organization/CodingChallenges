var player;
var zoom = 1;
var blobs = [];
var maxBlobs = 200;

function setup(){
	createCanvas(windowWidth, windowHeight);
	player = new Blob(createVector(0, 0), 64, color(255, 0, 0));
	createPellets(maxBlobs);
}

function draw(){
	background(0);

	translate(width*0.5, height*0.5);
	var newZoom = (64 / player.r);
	zoom = lerp(zoom, newZoom, 0.1);
	scale(zoom);
	translate(-player.pos.x, -player.pos.y);

	player.update();
	player.show();
	for (let i = blobs.length - 1; i >= 0; i--) {
		const b = blobs[i];
		if(player.eats(b)) {
			blobs.splice(i, 1);
			if(blobs.length <= 0) {
				createPellets(random(maxBlobs));
			}
		}
		b.show();
	}
}

function createPellets(count){
	for (let i = 0; i < count; i++) {
		createPellet();
	}
}

function createPellet(){
	var x = random(-width+zoom, (width+zoom)*2);
	var y = random(-height+zoom, (height+zoom)*2);
	blobs.push(new Blob(
		createVector(x, y),
		16
	));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
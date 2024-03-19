var socket;
var id;

var player;
var zoom = 1;
var blobs = [];
var maxBlobs = 200;
var playerDefaultSize = 24;

function setup(){
	createCanvas(windowWidth, windowHeight);
	socket = io.connect('http://localhost:3000');
	player = new Blob(random(width), random(height), playerDefaultSize, color(255, 0, 0));
	// createBlobs(maxBlobs);
	let data = {
		x: player.pos.x,
		y: player.pos.y,
		r: player.r,
		c: player.col
	}
	socket.emit('start', data);
	socket.on('heartbeat', function(data) {
		// console.log(data);
		blobs = data;
		// for (let i = 0; i < data.length; i++) {
		// 	const blob = data[i];
			
		// }
		// var blob = new Blob(socket.id, data.x, data.y, data.r, data.c);
		// blobs.push(blob);
	});
}

function createBlobs(count){
	for (let i = 0; i < count; i++) {
		createBlob();
	}
}

function createBlob(
	x = random(-width-zoom, (width+zoom)*2),
	y = random(-height-zoom, (height+zoom)*2),
	r = 16
){
	blobs.push(new Blob( x, y, r));
}

function draw(){
	background(0);

	translate(width*0.5, height*0.5);
	var newZoom = (64 / player.r);
	zoom = lerp(zoom, newZoom, 0.1);
	scale(zoom);
	translate(-player.pos.x, -player.pos.y);

	player.show();
	player.constrain();
	let data = {
		x: player.pos.x,
		y: player.pos.y,
		r: player.r,
		c: player.col
	}
	socket.emit('update', data);
	if(mouseIsPressed){
		player.update();
	}
	for (let i = blobs.length - 1; i >= 0; i--) {
		const b = blobs[i];
		if(b.id == socket.id) continue;
		fill(0, 0, 255);
		ellipse(b.x, b.y, b.r*2, b.r*2);

		fill(255);
		textAlign(CENTER);
		textSize(6);
		text(b.id, b.x, b.y);
		// if(player.eats(b)) {
		// 	blobs.splice(i, 1);
		// 	if(blobs.length <= 0) {
		// 		createBlobs(random(maxBlobs));
		// 	}
		// }
		// b.show();
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
// (138, 43, 226)
// 230 230 250

let drops = [];
let Ripples = [];
let dropCount = 500;
let maxDepth = 80;

function setup() {
	createCanvas(2000, 1200);
	for (let i = 0; i < dropCount; i++) {
		drops.push(new Drop());
	}
}

function draw() {
	background(230, 230, 250);
	drops.forEach(d => {
		if (d.fall()) {
			Ripples.push(new Ripple(d.x, d.y, d.z));
			d.reset();
		}
		d.show();
	});
	for (let i = Ripples.length -1; i >= 0; i--) {
		let r = Ripples[i];
		r.show();
		if(r.ripple() > r.death) {
			Ripples.splice(i, 1);
		}
	}
}
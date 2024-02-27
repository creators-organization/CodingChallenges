let a, b, m, n1, n2, n3;
let sliderA, sliderB, sliderM, sliderN1, sliderN2, sliderN3;
var slider;
let hue;
let radius;
let total, increment;
let osc = 0;

function setup(){
	createCanvas(600, 600);
	colorMode(HSB);
	reset();
}

function reset() {
	a = 1;
	b = 1;
	m = 5;
	n1 = 1;
	n2 = 1;
	n3 = 1;
	hue = 0;
	osc = 0;
	radius = 100;
	total = 500;
	increment = TWO_PI / total;
	sliderA = createSlider(0, 10, 1, 0.1);
	sliderB = createSlider(0, 10, 1, 0.1);
	sliderM = createSlider(0, 100, 5, 1);
	sliderN1 = createSlider(0, 10, 1, 0.1);
	// sliderN2 = createSlider(0, 10, 1, 0.1);
	// sliderN3 = createSlider(0, 10, 1, 0.1);
	
}

function draw(){
	background(0, 0, 20);
	translate(width*0.5, height*0.5);
	rotate(osc);
	noFill();
	a = sliderA.value();
	b = sliderB.value();
	m = sliderM.value();
	n1 = sliderN1.value();
	n2 = sliderN1.value();
	// n2 = sliderN2.value();
	n3 = sliderN1.value();
	// n3 = sliderN3.value();

	
	beginShape();
	for (let angle = 0, i = 0; angle < TWO_PI; angle+=increment) {
		stroke((hue + ++i * total) % 360, 100, 100);

		let r = superShape(angle);
		let x = radius * r * cos(angle);
		let y = radius * r * sin(angle);

		vertex(x, y);
	}
	if(hue++ > 359) hue = 0;
	osc += 0.02;
	if (osc >= 10) osc = 0;
	console.log(osc);
	
	endShape(CLOSE);
}

function superShape(theta){
	// return 1;
	let part1 = (1 / a) * cos( theta * m / 4);
	part1 = abs(part1);
	part1 = pow(part1, n2);

	let part2 = (1 / b) * sin( theta * m / 4);
	part2 = abs(part2);
	part2 = pow(part2, n3);

	let part3 = pow(part1 + part2, 1 / n1);

	if(part3 === 0) {
		return 0;
	}

	return (1 / part3);
}
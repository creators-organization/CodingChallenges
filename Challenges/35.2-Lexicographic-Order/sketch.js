let values = [];

function setup(){
	createCanvas(600, 600);
	reset();
}

function reset() {
	values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
}

function draw(){
	background(0);
	console.log(values);

	let largestI = -1;
	for (let i = 0; i < values.length - 1; i++) {
		if(values[i] < values[i + 1]) {
			largestI = i;
		}
	}
	if(largestI === -1) {
		noLoop();
		console.log('finished');
	}
	let largestJ = -1;
	for (let j = largestJ; j < values.length; j++) {
		if(values[largestI] < values[j]) {
			largestJ = j;
		}
	}
	
	swap(values, largestI, largestJ);

	let endArray = values.splice(largestI + 1);
	endArray.reverse();
	values = values.concat(endArray);

	textSize(64);
	var s = '';
	for (let i = 0; i < values.length; i++) {
		s += values[i];
	}
	fill(255);
	text(s, 20, height * 0.5);
}

function windowResized() {
  resizeCanvas(600, 600);
	reset();
}

function swap(a, i, j) {
	let temp = a[i];
	a[i] = a[j];
	a[j] = temp;
}
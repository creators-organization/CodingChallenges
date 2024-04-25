// let txt = "the theremin is theirs, ok? yes it is. this is a theremin."
let txt = "";
let order = 4;
let nGrams = {};
let button;
let names;
let beginnings = [];

function preload(){
	names = loadStrings("names.txt");
}
function setup(){
	noCanvas();
	button = createButton("generate");
	button.mousePressed(markovIt);
	for (let j = 0; j < names.length; j++) {
		const txt = names[j];
		beginnings.push(txt.substring(0, order));
		for (let i = 0; i <= txt.length - order; i++) {
			let gram = txt.substring(i, i + order);
			if(!nGrams[gram]) {
				nGrams[gram] = [];
			}
			nGrams[gram].push(txt.charAt(i + order));
		}
	}
	console.log(nGrams);
	markovIt();
}

function markovIt() {
	let currentGram = random(beginnings);
	let result = currentGram;
	for (let i = 0; i < 20; i++) {
		let possibilities = nGrams[currentGram];
		if(!possibilities){
			break;
		}
		let next = random(possibilities);
		result += next;
		let len = result.length;
		currentGram = result.substring(len - order, len);
	}
	createP(result);
}

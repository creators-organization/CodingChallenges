// let txt = "the theremin is theirs, ok? yes it is. this is a theremin."
let txt = "";
let order = 6;
let nGrams = {};
let button;
let text;

function preload(){
	text = loadStrings("rainbow.txt");
}
function setup(){
	txt = text.join("\n");
	noCanvas();
	button = createButton("generate");
	button.mousePressed(markovIt);
	for (let i = 0; i <= txt.length - order; i++) {
		let gram = txt.substring(i, i + order);
		if(!nGrams[gram]) {
			nGrams[gram] = [];
		}
		nGrams[gram].push(txt.charAt(i + order));
	}
	console.log(nGrams);
	markovIt();
}

function markovIt() {
	let currentGram = txt.substring(0, order);
	let result = currentGram;
	for (let i = 0; i < 100; i++) {
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

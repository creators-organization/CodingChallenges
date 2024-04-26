let afinn = {};

function preload() {
	afinn = loadJSON("afinn111.json");
	console.log(afinn);
}

function setup(){
	noCanvas();

	let txt = select('#txt');
	txt.input(typing);
}

function draw(){

}

function typing() {
	let textInput = txt.value;
	let words = textInput.split(/\W/);
	console.log(words);
	let scoredWords = [];
	let total = 0;
	for (let i = 0; i < words.length; i++) {
		const word = words[i].toLowerCase();
		if (afinn.hasOwnProperty(word)) {
			let score = Number(afinn[word]);
			total += score;
			scoredWords.push(word + ': ' + score);
		}
	}
	let scoreP = select('#score');
	scoreP.html('score: ' + total);
	let comp = select('#comparative');
	comp.html('comparative: ' + total / words.length);
	let wordList = select('#wordList');
	wordList.html(scoredWords);
}
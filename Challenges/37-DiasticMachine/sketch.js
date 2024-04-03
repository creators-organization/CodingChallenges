let text = "Ralph sat on painful ferns";
let srctxt;
let words;

function preload(){
	srctxt = loadStrings('rainbow.txt');
}

function setup(){
	noCanvas();
	srctxt = join(srctxt, ' ');
	words = splitTokens(srctxt, ' ,!.?')
	var seed = select("#startingSeed");
	var submit = select("#submit");
	submit.mousePressed(function() {
		let phrase = diastic(seed.value(), words);
		createP(phrase);
		// createP(seed.value());
		// createP(srctxt);
	});
}

function diastic(seed, words) {

	let phrase = "";
	let currentWord = 0;
	for (let i = 0; i < seed.length; i++) {
		const c = seed.charAt(i);
		
		for (let j = currentWord; j < words.length; j++) {
			if(words[j].charAt(i) == c) {
				phrase += words[j];
				phrase += ' ';
				currentWord = j + 1;
				break;
			}
		}
	}
	return phrase;
}
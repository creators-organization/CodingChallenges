let txt;
let counts = {};
let keys = [];

function preload(){
	txt = loadStrings("rainbow.txt");
}
function setup(){
	let allWords = txt.join("\n");
	let tokens = allWords.split(/\W+/);
	for (let i = 0; i < tokens.length; i++) {
		const w = tokens[i].toLowerCase();
		if(/\d+/.test(w)) {
			continue;
		}
		if(counts[w] === undefined) {
			counts[w] = 1;
			keys.push(w);
		} else {
			counts[w] = counts[w] + 1;
		}
	}

	keys.sort(compareCount);
	for (let i = 0; i < keys.length; i++) {
		const k = keys[i];
		createDiv(k + " " + counts[k]);
	}
	console.log(keys);

	noCanvas();
}

function compareCount(a, b) {
	return counts[b] - counts[a];
}

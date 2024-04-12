let txt = [];
let counts = {};
let keys = [];
let allWords = [];
let files = [
	"eclipse.txt",
	"fish.txt",
	"phadke.txt",
	"rainbow.txt",
	"sports.txt",
	"tree.txt",
]

function preload(){
	for (let i = 0; i < files.length; i++) {
		txt[i] = loadStrings("files/" + files[i]);
	}
}
function setup(){
	for (let i = 0; i < files.length; i++) {
		allWords[i] = txt[i].join("\n");
	}
	let tokens = allWords[0].split(/\W+/);
	for (let i = 0; i < tokens.length; i++) {
		const w = tokens[i].toLowerCase();
		if(/\d+/.test(w)) {
			continue;
		}
		if(counts[w] === undefined) {
			counts[w] = {
				tf: 1,
				df: 1
			};
			keys.push(w);
		} else {
			counts[w].tf = counts[w].tf + 1;
		}
	}
	
	let otherCounts = [];
	for (let j = 1; j < allWords.length; j++) {
		const doc = allWords[j];
		let tempCounts = {};
		let tokens = doc.split(/\W+/);
		for (let k = 0; k < tokens.length; k++) {
			const w = tokens[k].toLowerCase();
			if (tempCounts[w] === undefined) {
				tempCounts[w] = true;
			}
		}
		otherCounts.push(tempCounts);
	}

	for (let i = 0; i < keys.length; i++) {
		const word = keys[i];
		for (let j = 0; j < otherCounts.length; j++) {
			if(otherCounts[j][word]) {
				counts[word].df++;
			}
		}
	}
	for (let i = 0; i < keys.length; i++) {
		let word = keys[i];
		let wordObject = counts[word];
		wordObject.tfidf = wordObject.tf * log(files.length / wordObject.df);
	}

	keys.sort(compareTermFrequency);
	for (let i = 0; i < keys.length; i++) {
		const k = keys[i];
		createDiv(k + " " + counts[k].tfidf);
	}
	console.log(keys);
	console.log(counts);

	noCanvas();
}

function compareTermFrequency(a, b) {
	return counts[b].tfidf - counts[a].tfidf;
}

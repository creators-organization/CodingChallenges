// let rules = {
// 	"S": [["The", "N", "V"]],
// 	"N": [["cat"], ["dog"]],
// 	"V": [["meows"], ["barks"]]
// };

let rules = {
  S: [
    ['NP', 'VP'],
    ['Interj', 'NP', 'VP']
  ],
  NP: [
    ['Det', 'N'],
    ['Det', 'N', 'that', 'VP'],
    ['Det', 'Adj', 'N']
  ],
  VP: [['Vtrans', 'NP'], ['Vintr']],
  Interj: [['oh'], ['my'], ['wow'], ['darn']],
  Det: [['this'], ['that'], ['the']],
  N: [
    ['amoeba'],
    ['dichotomy'],
    ['seagull'],
    ['trombone'],
    ['overstaffed'],
    ['corsage']
  ],
  Adj: [
    ['bald'],
    ['smug'],
    ['important'],
    ['tame'],
    ['overstaffed'],
    ['corsage']
  ],
  Vtrans: [['computes'], ['examines'], ['foregrounds']],
  Vintr: [['coughs'], ['daydreams'], ['whines']]
};

let button;

function expand(start, expansion) {
	if (rules[start]) {
		let pick = random(rules[start]);
		for (let i = 0; i < pick.length; i++) {
			expand(pick[i], expansion);
		}
	} else {
		expansion.push(start);
	}
	return expansion.join(" ");
}

function setup(){
	noCanvas();
	button = createButton("generate");
	button.mousePressed(cfg);

	cfg();
}

function cfg() {
	let start = "S";
	let expansion = [];
	let result = expand(start, expansion);
	createP(result);
}


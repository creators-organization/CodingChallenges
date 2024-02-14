var axiom = "F";
var sentence = axiom;
var len = 100;
var angle = 50;
var generations = 0;

var rules = [
	{
		a: "F",
		b: "FF+[+F-F-F]-[-F+F+F]"
	}
];

var letters = {
	"F": function() {
		line(0, 0, 0, -len);
		translate(0, -len);
	},
	"+": function() {
		rotate(angle);
	},
	"-": function() {
		rotate(-angle);
	},
	"[": function() {
		push();
	},
	"]": function() {
		pop();
	},
};

var nGenerations = {
	1: {
		pre: function() {
			len *= 0.5;
		},
		post: function() {

		}
	}
}


function generate() {
	for (const [n, generation] of Object.entries(nGenerations)) {
		if (generations % n === 0) {
			generation.pre();
		}
	}
	var next = "";
	for (let i = 0; i < sentence.length; i++) {
		let found = false;
		var current = sentence.charAt(i);
		for (let j = 0; j < rules.length; j++) {
			const rule = rules[j];
			if(current === rule.a){
				found = true;
				next += rule.b;
				break;
			}
		}
		if (!found){ next += current; }
	}
	sentence = next;
	createP(sentence);
	turtle();
	for (const [n, generation] of Object.entries(nGenerations)) {
		if (generations % n === 0) {
			generation.post();
		}
	}
	generations++;
}

function turtle() {
	background(51);
	resetMatrix();
	translate(width/2, height);
	stroke(255, 100);
	for (let i = 0; i < sentence.length; i++) {
		let current = sentence.charAt(i);
		for (const [letter, func] of Object.entries(letters)) {
			if(current === letter) {
				func();
				break;
			}
		}
	}
}

function setup(){
	createCanvas(400, 400);
	angle = radians(25);
	background(51);
	createP(axiom);
	turtle();
	var button = createButton("generate");
	button.mousePressed(generate);

}
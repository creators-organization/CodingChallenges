function Population(size = 25) {
	this.rockets = [];
	this.popSize = size;
	this.matingPool = [];

	for(let i = 0; i < this.popSize; i++) {
		this.rockets[i] = new Rocket();
	}

	this.run = function() {
		for(let i = this.rockets.length - 1; i >= 0; i--) {
			this.rockets[i].update();
			this.rockets[i].show();
		}
	}

	this.evaluate = function() {
		var maxFit = 0;
		for(let i = this.rockets.length - 1; i >= 0; i--) {
			this.rockets[i].calcFitness();
			if (this.rockets[i].fitness > maxFit) {
				maxFit = this.rockets[i].fitness;
			}
		}
		console.log(maxFit);
		maxFit = 1/maxFit;
		for(let i = this.rockets.length - 1; i >= 0; i--) {
			this.rockets[i].fitness *= maxFit;
		}

		this.matingPool = [];
		for(let i = this.rockets.length - 1; i >= 0; i--) {
			var n = this.rockets[i].fitness * 100;
			for (let j = 0; j < n; j++) {
				this.matingPool.push(this.rockets[i]);
			}
		}
	}

	this.selection = function() {
		var newRockets = [];
		for (let i = 0; i < this.rockets.length; i++) {
			const element = this.rockets[i];
			var parentA = random(this.matingPool).dna;
			var parentB = random(this.matingPool).dna;
			var child = parentA.crossOver(parentB);
			child.mutation();
			newRockets[i] = new Rocket(child);
		}
		this.rockets = newRockets;
	}
}
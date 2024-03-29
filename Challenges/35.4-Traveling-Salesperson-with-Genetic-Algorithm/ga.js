function calculateFitness() {
	for (let i = 0; i < population.length; i++) {
		var d = calcDistance(cities, population[i]);
		if(d < recordDistance) {
			recordDistance = d;
			bestPath = population[i];
			console.log(recordDistance);
		}
		fitness[i] = 1 / ( d + 1 );
	}
}

function normalizeFitness() {
	var sum = 0;
	for (let i = 0; i < fitness.length; i++) {
		sum += fitness[i];
	}
	for (let i = 0; i < fitness.length; i++) {
		fitness[i] = fitness[i] / sum;
	}
}

function nextGeneration() {
	var newPopulation = [];
	for (let i = 0; i < population.length; i++) {
		var order = pickOne(population, fitness);
		mutate(order);
		newPopulation.push(order);
	}
	population = newPopulation;
}

function pickOne(list, prob) {
	var index = 0;
	var r = random(1);
	while(r > 0) {
		r = r - prob[index];
		index++;
	}
	index--;
	return list[index].slice();
}

function mutate(order, mutationRate) {
	indexA = floor(random(order.length));
	indexB = floor(random(order.length));
	swap(order, indexA, indexB);
}
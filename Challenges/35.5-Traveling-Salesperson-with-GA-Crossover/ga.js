function calculateFitness() {
	var currentRecord = Infinity;
	for (let i = 0; i < population.length; i++) {
		var d = calcDistance(cities, population[i]);
		if(d < recordDistance) {
			recordDistance = d;
			bestPath = population[i];
			console.log(recordDistance);
		}
		if(d < currentRecord) {
			currentRecord = d;
			currentBestPath = population[i];
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

function nextGeneration(percentBest = 0.3) {
	var newPopulation = [];
	let n = max(floor(population.length*percentBest), 1);
	let mutatedLen = population.length - n;
	for (let i = 0; i < n; i++) {
		newPopulation.push(bestPath);
	}
	for (let i = 0; i < mutatedLen; i++) {
		var orderA = pickOne(population, fitness);
		var orderB = pickOne(population, fitness);
		var order = crossOver(orderA, orderB);
		// var order = pickOne(population, fitness);
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

function crossOver(a, b) {
	let start = floor(random(a.length-1));
	let end= floor(random(start+1, a.length));
	let newOrder = a.slice(start, end);
	for (let i = 0; i < b.length; i++) {
		let city = b[i];
		if (!newOrder.includes(city)) {
			newOrder.push(city);
			if(newOrder.length == a.length){
				break;
			}
		}
	}
	return newOrder;
}

function mutate(order, mutationRate = 1) {
	for (let i = 0; i < totalCities; i++) {
		if(random(1) < mutationRate) {
			indexA = floor(random(order.length));
			indexB = (indexA+1) % order.length;
			swap(order, indexA, indexB);
		}
	}
}
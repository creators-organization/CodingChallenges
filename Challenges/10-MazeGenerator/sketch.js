let cols, rows;
let w = 10;
let grid = [];

var current;

var stack = [];

function setup() {
  createCanvas(400, 400);
  cols = floor(width / w);
  rows = floor(height / w);
	// frameRate(5);

	for (let j = 0; j < rows; j++) {
	for (let i = 0; i < cols; i++) {
			var cell = new Cell(i, j);
			grid.push(cell);
		}
	}
	// start it on a wall.
	current = grid[0];
}

function draw() {
  background(51);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

	current.visit();
	var next = current.checkNeighbors();
	if(next) {
		current.visit();
		stack.push(current);
		removeWalls(current, next);
		current = next;
	} else if (stack.length > 0) {
		current = stack.pop();
	}
}

function index(i, j){
	if(i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
		return -1;
	}
	return i + j * cols;
}

function removeWalls(a, b) {
	var x = a.i - b.i;
	if(x === 1) {
		a.walls[3] = false;
		b.walls[1] = false;
	} else if(x === -1) {
		a.walls[1] = false;
		b.walls[3] = false;
	}
	var y = a.j - b.j;
	if(y === 1) {
		a.walls[0] = false;
		b.walls[2] = false;
	} else if(y === -1) {
		a.walls[2] = false;
		b.walls[0] = false;
	}
}

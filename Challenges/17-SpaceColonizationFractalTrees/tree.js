function Tree(maxLeaves = 1500) {
	this.leaves = [];
	this.branches = [];
	this.maxLeaves = maxLeaves;

	for (let i = 0; i < this.maxLeaves; i++) {
		this.leaves.push(new Leaf());
	}

	var pos = createVector(width/2, height);
	var dir = createVector(0, -1);
	var root = new Branch(null, pos, dir);
	this.branches.push(root);
	var current = root;
	var found = false;
	while(!found){
		for (let i = 0; i < this.leaves.length; i++) {
			var d = p5.Vector.dist(current.pos, this.leaves[i].pos);
			if(d < max_dist){
				found = true;
			}
		}
		if(!found) {
			var branch = current.next();
			current = branch;
			this.branches.push(current);
		}
	}

	this.grow = function() {
		for (let i = 0; i < this.leaves.length; i++) {
			const leaf = this.leaves[i];
			var closestBranch = null;
			var record = height*width*100;
			for (let j = 0; j < this.branches.length; j++) {
				const branch = this.branches[j];
				var d = p5.Vector.dist(leaf.pos, branch.pos);
				if(d < min_dist) {
					leaf.reached = true;
					closestBranch = null;
					break;
				} else if(d > max_dist) {
					continue;
				} else if(closestBranch === null || d < record) {
					closestBranch = branch;
					record = d;
				}
			}
			if(closestBranch != null) {
				var newDir = p5.Vector.sub(leaf.pos, closestBranch.pos);
				newDir.normalize();
				closestBranch.dir.add(newDir);
				closestBranch.count++;
			}
		}
		// Remove leaves that have been 
		for (let i = this.leaves.length - 1; i >= 0; i--) {
			if(this.leaves[i].reached) {
				this.leaves.splice(i, 1);
			}
		}
		for (let i = this.branches.length - 1; i >= 0; i--) {
			const branch = this.branches[i];
			if(branch.count > 0) {
				branch.dir.div(branch.count + 1);
				this.branches.push(branch.next());
			}
			branch.reset();
		}
	}

	this.show = function(){
		for (let i = 0; i < this.leaves.length; i++) {
			this.leaves[i].show();
		}
		for (let i = 0; i < this.branches.length; i++) {
			this.branches[i].show();
		}
	}
}
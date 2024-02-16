function Tree(maxLeaves = 2000) {
	this.leaves = [];
	this.branches = [];
	this.maxLeaves = maxLeaves;

	for (let i = 0; i < this.maxLeaves; i++) {
		this.leaves.push(new Leaf());
	}

	var root = new Branch(
		null,
		createVector(0, height*0.7),
		createVector(0, -1)
	);
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
		for (l of this.leaves) {
			var closest = null;
			var closestDir = null;
			var record = -1;
			for (b of this.branches) {
				let dir = p5.Vector.sub(l.pos, b.pos);
				var d = dir.mag();
				if(d > max_dist) continue;
				if(d < min_dist) {
					l.reached = true;
					closest = null;
					break;
				}
				if (closest == null || d < record) {
					closest = b;
					closestDir = dir;
					record = d;
				}
			}
			if(closest != null) {
				closestDir.normalize();
				closest.dir.add(closestDir);
				closest.count++;
			}
		}
		for (let i = this.leaves.length - 1; i >= 0; i--) {
			if(this.leaves[i].reached) {
				this.leaves.splice(i, 1);
			}
		}
		for (let i = this.branches.length - 1; i >= 0; i--) {
			const b = this.branches[i];
			if(b.count > 0) {
				b.dir.div(b.count);
				this.branches.push(b.next());
				b.reset();
			}
		}
	}

	this.show = function(){
		// for (let i = 0; i < this.leaves.length; i++) {
		// 	this.leaves[i].show();
		// }
		// let maxSW = (20 > this.branches.length*0.002) ? 20 : this.branches.length*0.002;
		for (let i = 1; i < this.branches.length; i++) {
			const branch = this.branches[i];
			let sw = map(i, 0, this.branches.length, 20, 0);
			strokeWeight(sw);
			branch.show();
		}
	}
}
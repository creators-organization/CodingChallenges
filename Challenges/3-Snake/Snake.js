function Snake(){
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;
	this.total = 0;
	this.tail = [];

	this.dir = function(x, y){
		if(this.total > 0){
			if((this.xspeed === 0 && x !== 0) ||
				 (this.yspeed === 0 && y !== 0)) {
				this.xspeed = x;
				this.yspeed = y;
			}
			return;
		}
		this.xspeed = x;
		this.yspeed = y;
	}

	this.eat = function(pos){
		var d = dist(this.x, this.y, pos.x, pos.y);
		if(d < 1){
			this.total++;
			return true;
		}
		return false;
	}

	this.isDead = function(){
		return this.x < 0 || this.x > width-scl || this.y < 0 || this.y > height-scl || this.isInTail(createVector(this.x, this.y));
	}

	this.update = function(){
		if(this.total === this.tail.length){
			for(var i = 0; i < this.tail.length-1; i++){
				this.tail[i] = this.tail[i+1];
			}
		}
		this.tail[this.total-1] = createVector(this.x, this.y);

		this.x = this.x + this.xspeed*scl;
		this.y = this.y + this.yspeed*scl;
	}

	this.ai = function(food){
		//auto-play, needs work.
		var isOnFood = false;
		for (var i = this.tail.length-1; i > 0; i--) {
			if(this.tail[i].x === food.x && 
				this.tail[i].y === food.y){
					isOnFood = true;
					break;
				}
		}
		if(isOnFood){
			//circle
			//detect traps
		}
		if(food.y < s.y)		s.dir(0, -1);	//up
		else if (food.y > s.y)	s.dir(0, 1);	//down
		else if (food.x > s.x)	s.dir(1, 0);	//left
		else if (food.x < s.x)	s.dir(-1, 0);	//right
	}

	this.dijkstra = function(food){
		//start with a node.
		curr = createVector(food.x, food.y, 0);
		path = [];
		let i = 0;
		do{
			// add all nodes that have not been checked around start nodes to set of next nodes.
			// if a node has been checked, assign that nodes' value to the lowest value of the distance (curr.z) it is from the start
			next = [];
			if(!isInTail(curr.x + 1, curr.y)) next += createVector(curr.x + 1, curr.y, curr.z + 1);
			if(!isInTail(curr.x - 1, curr.y)) next += createVector(curr.x - 1, curr.y, curr.z + 1);
			if(!isInTail(curr.x, curr.y + 1)) next += createVector(curr.x, curr.y + 1, curr.z + 1);
			if(!isInTail(curr.x, curr.y - 1)) next += createVector(curr.x, curr.y - 1, curr.z + 1);
			for (let i = 0; i < next.length; i++) {
				//hi!
			}
		} while(curr != this.tail[0]);
	}

	this.isInTail = function(vector){
		for (var i = this.tail.length-1; i >= 0; i--) {
			if(this.tail[i].x === vector.x 
				&& this.tail[i].y === vector.y){
				return true;
			}
		}
		return false;
	}

	this.show = function(){
		fill(255);
		for(var i = 0; i < this.tail.length; i++){
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}

		fill(0,255,0);
		rect(this.x, this.y, scl, scl);
	}
}
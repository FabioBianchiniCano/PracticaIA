'use strict';

class Spot {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.width = width / cols;
    this.height = height / rows;

    this.fCost = 0;
    this.gCost = 0;
    this.hCost = 0;
    
    this.neighbors = [];
    this.father = undefined;
    this.isObstacle = random(1) < 0.2;

  }

  addNeighbors(grid) {
    if (this.x < cols - 1) {
      this.neighbors.push(grid.spots[this.x + 1][this.y]);
    }
    if (this.x > 0) {
      this.neighbors.push(grid.spots[this.x - 1][this.y]);
    }
    if (this.y < rows - 1) {
      this.neighbors.push(grid.spots[this.x][this.y + 1]);
    }
    if (this.y > 0) {
      this.neighbors.push(grid.spots[this.x][this.y - 1]);
    }
  }

  toggleObstacle() {
    this.isObstacle = !this.isObstacle;
  }

  draw(color) {
    if (color) {
      fill(color);
    } else {
      fill(this.isObstacle ? 0 : bgcolor);
    }
    rect(this.x * this.width, this.y * this.height, this.width, this.height);
    // circle(this.x * this.width + (this.width / 2), this. y * this.height + (this.height / 2), this.height)
  }
}
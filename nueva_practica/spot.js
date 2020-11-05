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

    this.isObstacle = random(1) < 0.4;

    // if (random(1) < 0.4) {
    //   this.wall = true;
    // }


  }

  draw() {
    fill(this.isObstacle ? 0 : bgcolor)
    rect(this.x * width / cols, this.y * height / rows, this.width, this.height);
  }
}
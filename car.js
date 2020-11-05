"use strict";

class Car {
  constructor(
    x = 0,
    y = 0,
    //              W      N      E      S
    directions = [false, false, false, false],
    color = 'LightBlue'
  ) {
    this.x = x;
    this.y = y;
    this.directions = directions;
    this.color = color;
  }

  findObstacle() {
    let counter = 0;
    let dirObstacle = [false, false, false, false];
    if (this.x >= 0 && this.x <= grid.cols - 1 && this.y >= 0 && this.y <= grid.rows - 1) { 
      if (this.x !== 0)
        dirObstacle[0] = grid.obstacles[this.x - 1][this.y].active;
      if (this.y !== 0)
        dirObstacle[1] = grid.obstacles[this.x][this.y - 1].active;
      if (this.x !== grid.cols - 1)
      dirObstacle[2] = grid.obstacles[this.x + 1][this.y].active;
      if (this.y !== grid.rows - 1)
      dirObstacle[3] = grid.obstacles[this.x][this.y + 1].active;
    }

    this.directions = dirObstacle;
    return dirObstacle;
  }

  moveTo(dirMove) {
    console.log(dirMove)
    let yLength = canvas.height / grid.rows;
    let xLength = canvas.width / grid.cols;
    ctx.clearRect(
      this.x * xLength + 1,
      this.y * yLength + 1,
      xLength - 2,
      yLength - 2)
    if (!this.directions[dirMove]) {
      switch(dirMove) {
        case 0:
          if (this.x > 0)
          this.x -= 1;
          break;
        case 1:
          if (this.y > 0)
          this.y -= 1;
          break;
        case 2:
          if (this.x < grid.cols - 1)
          this.x += 1;
          break;
        case 3:
          if (this.y < grid.rows - 1)
          this.y += 1;
          break;
      }
    }
    this.findObstacle();
    
  }

  draw() {
    let yLength = canvas.height / grid.rows;
    let xLength = canvas.width / grid.cols;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.x * xLength,
      this.y * yLength,
      xLength,
      yLength
    );
    ctx.fillStyle = "black";
  }
}

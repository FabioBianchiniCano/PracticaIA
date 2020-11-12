"use strict";

class Grid {
  constructor(cols, rows, color = "black") {
    this.cols = cols;
    this.rows = rows;
    this.spots;
    this.start;
    this.end;
    this.color = color;
    this.createMatrix();
  }

  createMatrix() {
    this.spots = new Array(cols);
    for (let i = 0; i < cols; i++) {
      this.spots[i] = new Array(rows);
      for (let j = 0; j < rows; j++) {
        this.spots[i][j] = new Spot(i, j);
      }
    }
    this.start = this.spots[0][0];
    this.end = this.spots[cols - 1][rows - 1];
  }

  updateNeighbors() {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (!this.spots[i][j].isObstacle) this.spots[i][j].addNeighbors();
      }
    }
  }

  genObstacles(prob) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        this.spots[i][j].isObstacle = random(1) < prob;
      }
    }
    this.updateNeighbors()
    this.start.isObstacle = false;
    this.end.isObstacle = false;

  }

  draw() {
    clear()
    for (let i = 0; i < this.cols; i++)
      for (let j = 0; j < this.rows; j++)
        this.spots[i][j].draw();
    this.start.draw('white');
    this.end.draw('pink');
    noStroke();
    for (let i = 0; i <= cols; i++) {
      line(i * (width / cols), 0, i * (width / cols), height);
    }
    for (let j = 0; j <= rows; j++) {
      line(0, j * (height / rows), width, j * (height / rows));
    }
  }
}

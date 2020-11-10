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
    this.start.isObstacle = false;
    this.end.isObstacle = false;
  }

  updateNeighbors() {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (!this.spots[i][j].isObstacle) this.spots[i][j].addNeighbors();
      }
    }
  }

  draw() {
    clear()
    for (let i = 0; i < this.cols; i++)
      for (let j = 0; j < this.rows; j++)
        this.spots[i][j].draw();
    noStroke();
    for (let i = 0; i <= cols; i++) {
      line(i * (width / cols), 0, i * (width / cols), height);
    }
    for (let j = 0; j <= rows; j++) {
      line(0, j * (height / rows), width, j * (height / rows));
    }
  }
}

"use strict";

class End {
  constructor(x = 0, y = 0, color = "red") {
    this.x = x;
    this.y = y;
    this.color = color;
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

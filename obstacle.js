"use strict";

class Obstacle {
  constructor(x, y, active = true, color = "black") {
    this.x = x;
    this.y = y;
    this.active = active;
    this.color = color;
  }

  draw() {
    if (this.active) {
      let yLength = canvas.height / rows;
      let xLength = canvas.width / cols;
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect(
        this.x * xLength,
        this.y * yLength,
        xLength,
        yLength
      );
    }
    ctx.fillStyle = "black";
  }
}

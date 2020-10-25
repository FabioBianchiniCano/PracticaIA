"use strict";

class Obstacle {
  constructor(x, y, active = true, color = "black") {
    this.x = x;
    this.y = y;
    this.active = active;
    this.color = color;
  }

  /**
   * @description Función que cambia el estado del obstáculo.
   */
  toggleStatus() {
    this.active = this.active ? false : true;
  }

  /**
   * @description Función que pinta el obstáculo en el canvas.
   */
  draw() {
    let yLength = canvas.height / grid.rows;
    let xLength = canvas.width / grid.cols;
    ctx.beginPath();
    if (this.active) {
      ctx.fillStyle = this.color;
      ctx.fillRect(
        this.x * xLength,
        this.y * yLength,
        xLength,
        yLength
      );
    } else {
      ctx.clearRect(
        this.x * xLength + 1,
        this.y * yLength + 1,
        xLength - 2,
        yLength - 2)
    }
    ctx.fillStyle = "black";
  }
}

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
    if (this.active) {
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
    }
    ctx.fillStyle = "black";
  }
}

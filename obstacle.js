'use strict';

class Obstacle {
  constructor(x, y, active = true, color = 'black') {
    this.x = x;
    this.y = y;
    this.active = active;
    this.color = color;
  }

  draw() {
    if (this.active) {
      let subdivision = canvas.clientHeight / rows;
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x * subdivision, this.y * subdivision, subdivision, subdivision);
      
    }
    ctx.strokeStyle = 'black';
  }
}
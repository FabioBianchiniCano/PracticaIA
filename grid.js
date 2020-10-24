'use strict';

class Grid {
  constructor(density, obstaclesMatrix, color = 'black') {
    this.obstacles = obstaclesMatrix;
    this.density = density;
    this.subdivision = canvas.width / density;
    this.color = color;
  }

  draw() {
    for (let i = 0; i < rows; i++) 
      for (let j = 0; j < cols; j++) 
        this.obstacles[i][j].draw();


    for (let itx = 0; itx < this.density; itx++) {
      ctx.beginPath(); 
      ctx.moveTo(itx * this.subdivision, 0);
      ctx.strokeStyle = this.color;
      ctx.lineTo(itx * this.subdivision, canvas.clientHeight);
      ctx.stroke();
    }
    for (let ity = 0; ity < this.density; ity++) {
      ctx.beginPath(); 
      ctx.moveTo(0, ity * this.subdivision);
      ctx.lineTo(canvas.clientWidth, ity * this.subdivision);
      ctx.stroke();
    }
    
    ctx.strokeStyle = 'black';
  }
}
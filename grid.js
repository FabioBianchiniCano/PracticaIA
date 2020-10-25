'use strict';

class Grid {
  constructor(rows, cols, obstaclesMatrix, color = 'black') {
    this.obstacles = obstaclesMatrix;
    this.rows = rows;
    this.cols = cols;
    this.rowLength = canvas.height / rows;
    this.colLength = canvas.width / cols;
    this.color = color;
  }

  draw() {
    for (let i = 0; i < this.rows; i++) 
      for (let j = 0; j < this.cols; j++) 
        this.obstacles[i][j].draw();


    for (let itx = 0; itx < this.cols; itx++) {
      ctx.beginPath(); 
      ctx.moveTo(itx * this.colLength, 0);
      ctx.strokeStyle = this.color;
      ctx.lineTo(itx * this.colLength, canvas.clientHeight);
      ctx.stroke();
    }
    for (let ity = 0; ity < this.rows; ity++) {
      ctx.beginPath(); 
      ctx.moveTo(0, ity * this.rowLength);
      ctx.lineTo(canvas.clientWidth, ity * this.rowLength);
      ctx.stroke();
    }
    
    ctx.strokeStyle = 'black';
  }
}
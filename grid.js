'use strict';

class Grid {
  constructor(rows, cols, nObs, color = 'black') {
    this.obstacles = [];
    this.rows = rows;
    this.cols = cols;
    this.nObs = nObs;
    this.rowLength = canvas.height / rows;
    this.colLength = canvas.width / cols;
    this.color = color;
    this.createMatrix();
  }

  /**
   * @description Función que actualiza los parámetros de la cuadrícula.
   * @param {number} rows 
   * @param {number} cols 
   * @param {number} nObs 
   */
  updateParameters(rows, cols, nObs) {
    this.rows = rows;
    this.cols = cols;
    this.nObs = nObs;
    this.rowLength = canvas.height / rows;
    this.colLength = canvas.width / cols;
  }


  /**
   * Función que borra y crea de nuevo la matriz con los parámetros del objeto.
   */
  createMatrix() {
    this.obstacles = [];
    for (let i = 0; i < this.rows; i++) {
      this.obstacles.push([]);
      for (let j = 0; j < this.cols; j++) {
        this.obstacles[i].push(new Obstacle(i, j, false));
      }
    }
  }

  /**
   * @description Función que pinta la cuadrícula en el canvas.
   */
  draw() {
    for (let i = 0; i < this.rows; i++) 
      for (let j = 0; j < this.cols; j++) 
        this.obstacles[i][j].draw();

    for (let itx = 0; itx < this.cols; itx++) {
      ctx.beginPath(); 
      ctx.moveTo(itx * this.colLength, 0);
      ctx.strokeStyle = this.color;
      ctx.lineTo(itx * this.colLength, canvas.height);
      ctx.stroke();
    }
    for (let ity = 0; ity < this.rows; ity++) {
      ctx.beginPath(); 
      ctx.moveTo(0, ity * this.rowLength);
      ctx.lineTo(canvas.width, ity * this.rowLength);
      ctx.stroke();
    }
    
    ctx.strokeStyle = 'black';
  }
}
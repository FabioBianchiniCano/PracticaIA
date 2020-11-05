'use strict';

class Grid {
  constructor(rows, cols, nObs, car, end, color = 'black') {
    this.car = car;
    this.end = end;
    this.color = color;
    this.updateParameters(rows, cols, nObs)
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
   * @description Función que cambia el estado del obstáculo de las coordenadas
   *              pasadas por parámetro.
   * @param {number} x 
   * @param {number} y 
   */
  toggleObstacle(x, y) {
    this.obstacles[x][y].toggleStatus();
  }

  /**
   * Función que borra y crea de nuevo la matriz con los parámetros del objeto.
   */
  createMatrix() {
    this.obstacles = [];
    for (let i = 0; i < this.cols; i++) {
      this.obstacles.push([]);
      for (let j = 0; j < this.rows; j++) {
        this.obstacles[i].push(new Obstacle(i, j, false));
      }
    }
  }

  /**
   * @description Función que pinta la cuadrícula en el canvas.
   */
  draw() {
    for (let i = 0; i < this.cols; i++) 
      for (let j = 0; j < this.rows; j++) 
        this.obstacles[i][j].draw();

    for (let itx = 0; itx < this.cols; itx++) {
      ctx.beginPath(); 
      ctx.moveTo(itx * this.colLength, 0);
      ctx.strokeStyle = this.color;
      ctx.lineTo(itx * this.colLength, canvas.width);
      ctx.stroke();
    }
    for (let ity = 0; ity < this.rows; ity++) {
      ctx.beginPath(); 
      ctx.moveTo(0, ity * this.rowLength);
      ctx.lineTo(canvas.height, ity * this.rowLength);
      ctx.stroke();
    }
    ctx.strokeStyle = 'black';
    this.car.draw();
    this.end.draw();
  }
}
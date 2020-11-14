/**
 * @fileoverview Fichero grid.js donde se describe los métodos y atributos de la clase Grid
 * @author Fabio Bianchini Cano
 * @author Nerea Rodríguez Hernández
 * @author Cesar Ángel Salgado Navarro
 * @date 15/11/2020
 */

"use strict";

/**
 * @class Grid
 */
class Grid {

  /**
   * @description Constructor parametrizado de la clase
   * @param {number} cols Dato de tipo entero que enumera la cantidad de columnas.
   * @param {number} rows Dato de tipo entero que enumera la cantidad de filas.
   * @param {string} color Color con el que se pintan las líneas de la cuadrícula.
   */
  constructor(cols, rows, color = "black") {
    this.cols = cols;
    this.rows = rows;
    this.spots;
    this.start;
    this.end;
    this.color = color;
    this.createMatrix();
  }

  /**
   * @description Función que crea la matriz de nuestro tablero
   */
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
  }

  /**
   * @description Función que actualiza los vecinos del tablero.
   */
  updateNeighbors() {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (!this.spots[i][j].isObstacle) this.spots[i][j].addNeighbors();
      }
    }
  }

  /**
   * @description Función que genera multiples obstáculos dada una probabilidad
   * @param {number} prob Dato de tipo float que representa la probabilidad de obstaculos (rango = [0,1])
   */
  genObstacles(prob) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        this.spots[i][j].isObstacle = random(1) < prob;
      }
    }
    this.updateNeighbors()
    this.start.isObstacle = false;
    this.end.isObstacle = false;

  }

  /**
   * @description Función que nos representa graficamente el tablero.
   */
  draw() {
    clear()
    for (let i = 0; i < this.cols; i++)
      for (let j = 0; j < this.rows; j++)
        this.spots[i][j].draw();
    this.start.draw('white');
    this.end.draw('pink');
    noStroke();
    for (let i = 0; i <= cols; i++) {
      line(i * (width / cols), 0, i * (width / cols), height);
    }
    for (let j = 0; j <= rows; j++) {
      line(0, j * (height / rows), width, j * (height / rows));
    }
  }
}

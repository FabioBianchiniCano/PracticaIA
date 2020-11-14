/**
 * @fileoverview Fichero spot.js donde se describe los métodos y atributos de la clase Spot
 * @author Fabio Bianchini Cano
 * @author Nerea Rodríguez Hernández
 * @author Cesar Ángel Salgado Navarro
 * @date 15/11/2020
 */

'use strict';

/**
 * @class Spot
 */
class Spot {

  /**
   * @description Constructor parametrizado de la clase
   * @param {number} x Dato de tipo entero que muestra la posición del eje x en la cuadrícula.
   * @param {number} y Dato de tipo entero que muestra la posición del eje y en la cuadrícula.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.width = width / cols;
    this.height = height / rows;

    this.fCost = 0;
    this.gCost = 0;
    this.hCost = 0;
    
    this.neighbors = [];
    this.father = undefined;
    this.isObstacle = false;
  }

  /**
   * @description Función que añade los vecinos en la cuadrícula.
   */
  addNeighbors() {
    if (this.x < cols - 1) {
      this.neighbors.push(grid.spots[this.x + 1][this.y]);
    }
    if (this.x > 0) {
      this.neighbors.push(grid.spots[this.x - 1][this.y]);
    }
    if (this.y < rows - 1) {
      this.neighbors.push(grid.spots[this.x][this.y + 1]);
    }
    if (this.y > 0) {
      this.neighbors.push(grid.spots[this.x][this.y - 1]);
    }
  }

  /**
   * @description Función que nos permite colocar obstáculos manualmente clicando con nuestro ratón.
   * @param {string} button Evento que si clicanmos en el boton izquierdo del ratón coloca el obstáculo.
   */
  toggleObstacle(button) {
    if (button === "left") this.isObstacle = true;
    else if (button === "right") this.isObstacle = false;
    this.addNeighbors();
  }

  /**
   * @description Función que nos permite colocar obstáculos manualmente clicando con nuestro ratón.
   * @param {string} color Color con el que se pinta el relleno de la sección de rectángulo.
   */
  draw(color) {
    let shapeDraw = () => {
      let shape;
      for (let i = 0; i < shapeSelected.options.length; i++) {
        if (shapeSelected.options[i].selected)
          shape = shapeSelected.options[i].value;
      }
      switch(shape) {
        case "rect": {
          rect(this.x * this.width, this.y * this.height, this.width, this.height);
          break;
        }
        case "circle": {
          circle(this.x * this.width + (this.width / 2), this. y * this.height + (this.height / 2), (this.height + this.width) * 0.3)
          break;
        }
      }
    }
      
    if (color) {
      fill(color);
      shapeDraw();
    } else {
      fill(bgcolor)
      rect(this.x * this.width, this.y * this.height, this.width, this.height);
      if (this.isObstacle)  {
        fill(0)
        shapeDraw();
      }
    }
  }
}
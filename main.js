"use strict";

/**
 * Variables globales
 */
let canvas = document.getElementById("canvas");
canvas.addEventListener('mousedown', toggleObstacle);

let ctx = canvas.getContext("2d");
// let obstaclesMatrix = []; // Matriz de obstáculos tanto activos como los que no
let grid = new Grid(
  document.getElementById("filas").value,
  document.getElementById("columnas").value,
  document.getElementById("obstaculos").value
);

let car = new Car(0,0);

/**
 * @description Función que borra o añade un nuevo obstáculo en la cuadrícula.
 * @param {object} event Objecto que regista la información del evento.
 */
function toggleObstacle(event) {
  let x = Math.floor(event.offsetX / grid.colLength);
  let y = Math.floor(event.offsetY / grid.rowLength);
  grid.toggleObstacle(x,y);
  grid.obstacles[x][y].draw();
  console.log(car.findObstacle()); // prueba
  // if (si clicas encima del coche no se pone osbtáculo)
  grid.draw();
  car.draw();
}


/**
 * @description Función que sirve para actualizar los parámetros a utilizar
 * por la cuadrícula.
 */
function updateParameters() {
  grid.updateParameters(
    document.getElementById("filas").value,
    document.getElementById("columnas").value,
    document.getElementById("obstaculos").value
  );
  grid.createMatrix();
}

/**
 * @description Función que añade de manera aleatoria obstáculos a lo largo de
 *              toda la cuadrícula.
 */
function addRandomObstacles() {
  for (let i = 0; i < grid.nObs; i++) {
    let randx = Math.floor(Math.random() * grid.cols);
    let randy = Math.floor(Math.random() * grid.rows);
    if (grid.obstacles[randx][randy].active) {
      i--;
    } else {
      grid.obstacles[randx][randy].active = true;
    }
  }
}


/**
 * @description Función que se ejecuta al cargar la página y al darle
 *              al botón de start.
 */
function start() {
  ctx.clearRect(0, 0, canvas.clientHeight, canvas.clientWidth);
  updateParameters();
  grid.createMatrix();
  addRandomObstacles();
  grid.draw();
  car.draw();
}

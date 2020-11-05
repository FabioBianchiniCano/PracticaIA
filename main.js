"use strict";

/**
 * Variables globales
 */
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let car = new Car(0,0);
let end = new End(
  document.getElementById("filas").value - 1,
  document.getElementById("columnas").value - 1);
let grid = new Grid(
  document.getElementById("filas").value,
  document.getElementById("columnas").value,
  document.getElementById("obstaculos").value,
  car, 
  end
  );
  
canvas.addEventListener('mousedown', toggleObstacle);


/**
 * @description Función que borra o añade un nuevo obstáculo en la cuadrícula.
 * @param {object} event Objecto que regista la información del evento.
 */
function toggleObstacle(event) {
  let x = Math.floor(event.offsetX / grid.colLength);
  let y = Math.floor(event.offsetY / grid.rowLength);
  /* si clicas encima del coche no se pone osbtáculo */
  if (!((x === car.x && y === car.y) || (x === end.x && y === end.y))) {
    grid.toggleObstacle(x,y);
    grid.obstacles[x][y].draw();
  } else {
    console.log("no cliques en el coche o la meta");
  }
  grid.draw();

}


/**
 * @description Función que sirve para actualizar los parámetros a utilizar
 * por la cuadrícula.
 */
function updateParameters() {
  if (document.getElementById("obstaculos").value >= (grid.rows * grid.cols) - 1) {
    alert("Introduzca un número de obstáculos menor");
    document.getElementById("obstaculos").value = grid.rows * grid.cols / 2;
  }
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
    if (grid.obstacles[randx][randy].active ||
      ((car.x === randx && car.y === randy) ||
      (end.x === randx && end.y === randy))) {
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
}

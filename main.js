'use strict';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let rows;
let cols;
let nObs;
let obstaclesMatrix = [];


function updateParameters() {
  rows = document.getElementById('filas').value;
  cols = rows; // CAMBIAR
  nObs = document.getElementById('obstaculos').value
}

function createObstacles() {
  obstaclesMatrix = [];
  for (let i = 0; i < rows; i++) {
    obstaclesMatrix.push([]);
    for (let j = 0; j < cols; j++) {
      obstaclesMatrix[i].push(new Obstacle(i, j, false));
    } 
  }
}

function randomObstacles() {

  for (let i = 0; i < nObs; i++) {
    let randx = Math.floor(Math.random() * rows);
    let randy = Math.floor(Math.random() * cols);
    if (obstaclesMatrix[randx][randy].active) {
      i--;
    } else {
      obstaclesMatrix[randx][randy].active = true;
    }
  }

}

function start() {
  ctx.clearRect(0, 0, canvas.clientHeight, canvas.clientWidth)
  createObstacles();
  randomObstacles();
  let grid = new Grid(rows, obstaclesMatrix);
  grid.draw();
}

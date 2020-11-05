'use strict';

let grid;

let cols,rows;

let start, end;

let openSet = [];
let closedSet = [];



function setup() {
  createCanvas(900, 500);
  
  


  cols = parseInt(document.getElementById("columnas").value, 10)
  rows = parseInt(document.getElementById("filas").value, 10)
  grid = new Grid(cols, rows);
  clear();
  background(200);
  grid.draw();
}

function draw() {

}

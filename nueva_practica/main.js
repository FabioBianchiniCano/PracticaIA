'use strict';

let grid;

let cols = 50 , rows = 30;

let start, end;

let openSet = [];
let closedSet = [];


let bgcolor = 200;



function setup() {
  createCanvas(900, 500);
  
  // cols = parseInt(document.getElementById("columnas").value, 10)
  // rows = parseInt(document.getElementById("filas").value, 10)
  
  grid = new Grid(cols, rows);
  clear();
  background(bgcolor);
  grid.draw();
}

function draw() {

}

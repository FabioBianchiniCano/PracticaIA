"use strict";

let grid;

let wcanvas = 800;
let hcanvas = 600;
let density = 20;
let cols = Math.floor(wcanvas / density),
  rows = Math.floor(hcanvas / density);

let heuristicFunction = document.getElementById("heuristic");

let start, end;

let openSet = [];
let closedSet = [];

let path;
let pathColor = document.getElementById("pathColor").value + "";

let begin = false;

let bgcolor;

let prevX = 0, prevY = 0; 
function mouseDragged() {
  let x = Math.floor(mouseX / (width / cols))
  let y = Math.floor(mouseY / (height / rows))
  if (x < 0 || y < 0 || x > cols || y > rows){return;}
  if (x != prevX || y != prevY) {
    grid.spots[x][y].toggleObstacle();
    grid.draw();
    prevX = x;
    prevY = y;
  }
}

function mousePressed() {
  let x = Math.floor(mouseX / (width / cols))
  let y = Math.floor(mouseY / (height / rows))
  if (x < 0 || y < 0 || x > cols || y > rows){return;}
  grid.spots[x][y].toggleObstacle();
  grid.draw();
}

function updateParameters() {
  pathColor = document.getElementById("path").value + "";
}

function heuristic(current, end) {
  let selectedHeur;
  for (let i = 0; i < heuristicFunction.options.length; i++) {
    if (heuristicFunction.options[i].selected)
      selectedHeur = heuristicFunction.options[i].value;
  }

  let distance;
  switch(selectedHeur) {
    case "manhattan": {
      distance = abs(current.x - end.x) + abs(current.y - end.y); //manhattan
      break;
    } 
    case "hypotenuse": {
      distance = dist(current.i, current.j, end.i, end.j); //linea recta
      break;
    }
    default: {
      distance = abs(current.x - end.x) + abs(current.y - end.y); //manhattan
      break;
    }
  }
  return distance;
}

function setup() {
  let canvas = createCanvas(wcanvas, hcanvas);
  canvas.style('border: 5px solid black');
  canvas.parent("divCanvas")
  frameRate(60);

  // cols = parseInt(document.getElementById("columnas").value, 10)
  // rows = parseInt(document.getElementById("filas").value, 10)

  grid = new Grid(cols, rows);
  clear();
  noStroke();
  bgcolor = color(200, 80);
  background(bgcolor);
  grid.draw();

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (!grid.spots[i][j].isObstacle) grid.spots[i][j].addNeighbors(grid);
    }
  }

  openSet.push(grid.start);
}

function draw() {
  if (begin) { // not beginning  until pressing start button
    //while(!openSet.empty)
    let current;
    if (openSet.length > 0) {
      let nextIter = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].fCost < openSet[nextIter].fCost) {
          nextIter = i;
        }
      }
      current = openSet[nextIter];

      // if we arrived
      if (current === grid.end) {
        console.log("LLEGAMOS");
        noLoop();
        return;
      }

      // remove current from openSet
      openSet.splice(openSet.indexOf(current), 1);
      closedSet.push(current);

      for (let i = 0; i < current.neighbors.length; i++) {
        let neighbor = current.neighbors[i];
        if (!closedSet.includes(neighbor) && !neighbor.isObstacle) {
          //tempGCost es la distancia entre start y neighbor pasando por current
          let tempGCost = current.gCost + 1; // heuristic(neighbor, current)
          let isNewPath = false;

          if (openSet.includes(neighbor)) { // si ya se ha mirado
            if (tempGCost < neighbor.gCost) { // compruebo que el camino actual es mejor
              neighbor.gCost = tempGCost;
              isNewPath = true;
            }
          } else { // cuando no se había mirado ese nodo hasta ahora
            neighbor.gCost = tempGCost;
            isNewPath = true;
            openSet.push(neighbor);
          }

          if (isNewPath) {
            neighbor.hCost = heuristic(neighbor, grid.end);
            neighbor.fCost = neighbor.gCost + neighbor.hCost;
            neighbor.father = current;
          }
        }
      }
    } else {
      console.log("No se ha encontrado un camino disponible :(");
      noLoop();
      return;
    }
    background(bgcolor)
    clear();
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid.spots[i][j].draw();
      }
    }

    for (let i = 0; i < closedSet.length; i++) {
      closedSet[i].draw(color(255, 0, 0, 60));
    }

    for (let i = 0; i < openSet.length; i++) {
      openSet[i].draw(color(0, 255, 0, 150));
    }

    path = [];
    let currentForPath = current;
    path.push(currentForPath);
    while (currentForPath.father) {
      path.push(currentForPath.father);
      currentForPath = currentForPath.father;
    }


    noFill();
    stroke(pathColor);
    strokeWeight(width / cols / 2);
    beginShape();
    for (let i = 0; i < path.length; i++) {
      // path[i].draw(color(0, 0, 255, path[i].x * 255 / 50))
      vertex(
        path[i].x * path[i].width + path[i].width / 2,
        path[i].y * path[i].height + path[i].height / 2
      );
    }
    endShape();
    noStroke();
              
  }
}

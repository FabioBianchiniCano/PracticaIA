"use strict";

let grid;

let cols = 30,
  rows = 30;

let start, end;

let openSet = [];
let closedSet = [];

let path;

let bgcolor = 200;

function heuristic(current, end) {
  // let distance = dist(current.i, current.j, end.i, end.j);
  let distance = abs(current.x - end.x) + abs(current.y - end.y);
  return distance;
}

function setup() {
  createCanvas(1000, 1000);
  frameRate(120)

  // cols = parseInt(document.getElementById("columnas").value, 10)
  // rows = parseInt(document.getElementById("filas").value, 10)

  grid = new Grid(cols, rows);
  clear();
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
  //while(!openSet.empty)
  let current;
  if (openSet.length > 0) {
    var nextIter = 0;
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
        let newPath = false;

        if (openSet.includes(neighbor)) {
          if (tempGCost < neighbor.gCost) {
            neighbor.gCost = tempGCost;
            newPath = true;
          }
        } else {
          neighbor.gCost = tempGCost;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.hCost = heuristic(neighbor, grid.end);
          neighbor.fCost = neighbor.gCost + neighbor.hCost;
          neighbor.previous = current;
        }
      }
    }
  } else {
    console.log("No se ha encontrado un camino disponible :(");
    noLoop();
    return;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid.spots[i][j].draw();
    }
  }

  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].draw(color(255, 0, 0, 25));
  }

  for (let i = 0; i < openSet.length; i++) {
    openSet[i].draw(color(0, 255, 0, 150));
  }

  path = [];
  let currentForPath = current;
  path.push(currentForPath);
  while (currentForPath.previous) {
    path.push(currentForPath.previous);
    currentForPath = currentForPath.previous;
  }


  noFill();
  stroke(255, 0, 200);
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

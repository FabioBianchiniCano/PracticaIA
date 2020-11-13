"use strict";

let grid;

let wcanvas = 800;
let hcanvas = 600;
let density = 20;
// let cols = Math.floor(wcanvas / density),
//   rows = Math.floor(hcanvas / density);

let cols = document.getElementById("columnas").value;
let rows = document.getElementById("filas").value;

let heuristicFunction = document.getElementById("heuristic");
let shapeSelected = document.getElementById("shape");

let start, end;

let openSet = [];
let closedSet = [];

let path;
let pathColor = document.getElementById("pathColor").value + "";


let status = {
  PRE_BEGIN: true,
  WORKING: false,
  FINISHED: false
}


let bgcolor;

let prevX = 0, prevY = 0; 
function mouseDragged(event) {
  if (status.WORKING || status.FINISHED) {return}
  let x = Math.floor(mouseX / (width / cols))
  let y = Math.floor(mouseY / (height / rows))
  if (x < 0 || y < 0 || x > cols || y > rows){return;}
  if (x != prevX || y != prevY) {
    grid.spots[x][y].toggleObstacle(mouseButton);
    grid.draw();
    prevX = x;
    prevY = y;
  }
}

function mousePressed(event) {
  if (status.WORKING || status.FINISHED) {return}
  let x = Math.floor(mouseX / (width / cols))
  let y = Math.floor(mouseY / (height / rows))
  if (x < 0 || y < 0 || x > cols || y > rows){return;}
  grid.spots[x][y].toggleObstacle(mouseButton);
  grid.draw();
  if (mouseButton === 'right') {
    return false;
  }
}


function keyPressed() {
  switch(keyCode) {
    case 32: { // space - GENERATE OSBTACLES
      if (status.WORKING) {return}
      grid.genObstacles(document.getElementById("probObstacles").value);
      drawFrame();
      return false;
      break;
    }
    case 82: { // r - RESTART
      status.WORKING = false;
      status.PRE_BEGIN = true;
      status.FINISHED = false;
      openSet = [];
      closedSet = [];
      grid.createMatrix();
      grid.genObstacles(0);
      grid.updateNeighbors();
      openSet.push(grid.start);
      drawFrame();
      break;
    }
    case 83: { // s - put start
      
      if (status.WORKING || status.FINISHED) {return}
      let x = Math.floor(mouseX / (width / cols))
      let y = Math.floor(mouseY / (height / rows))
      if (x < 0 || y < 0 || x > cols || y > rows){return;}
      grid.start = grid.spots[x][y];
      openSet.pop();
      openSet.push(grid.start);     
      drawFrame();
      break;
    }
    case 69: { // e - put end
      if (status.WORKING || status.FINISHED) {return}
      let x = Math.floor(mouseX / (width / cols))
      let y = Math.floor(mouseY / (height / rows))
      if (x < 0 || y < 0 || x > cols || y > rows){return;}
      grid.end = grid.spots[x][y];    
      drawFrame();
      break;
    }
  }
}

function updateParameters() {
  if (status.WORKING) {return}
  pathColor = document.getElementById("pathColor").value + "";
  heuristicFunction = document.getElementById("heuristic");
  shapeSelected = document.getElementById("shape");
  drawFrame(); 
}

function createNewGrid() {
  if (status.WORKING) {return}
  cols = document.getElementById("columnas").value;
  rows = document.getElementById("filas").value;
  grid = new Grid(cols, rows);
  grid.updateNeighbors();
  openSet = [];
  closedSet = [];
  openSet.push(grid.start);
  drawFrame();
}

function drawFrame() {
  clear();
  grid.draw();
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

function drawPath(current) {
  path = [];
    let currentForPath = current;
    path.push(currentForPath);
    while (currentForPath.father) {
      path.push(currentForPath.father);
      currentForPath = currentForPath.father;
    }

    noFill();
    stroke(pathColor);
    strokeWeight((grid.spots[0][0].height + grid.spots[0][0].width)* 0.15);
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

function setup() {
  let canvas = createCanvas(wcanvas, hcanvas);
  canvas.style('border: 5px solid black');
  canvas.parent("divCanvas")
  frameRate(60);

  grid = new Grid(cols, rows);
  bgcolor = color(200, 80);
  noStroke();
  drawFrame();
  
  grid.updateNeighbors();

  openSet.push(grid.start);
}

function draw() {
  if (!status.PRE_BEGIN && !status.FINISHED) { // not beginning  until pressing start button
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
        drawFrame();
        for (let i = 0; i < closedSet.length; i++) {
          closedSet[i].draw(color(255, 0, 0, 60));
        }
    
        for (let i = 0; i < openSet.length; i++) {
          openSet[i].draw(color(0, 255, 0, 150));
        }
        drawPath(current);
        console.log("LLEGAMOS");
        status.WORKING = false;
        status.FINISHED = true;
        // noLoop();
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
      status.WORKING = false;
      status.FINISHED = true;
      // noLoop();
      return;
    }
    drawFrame()
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

    grid.start.draw('white');
    grid.end.draw('pink');

    drawPath(current);
              
  }
}

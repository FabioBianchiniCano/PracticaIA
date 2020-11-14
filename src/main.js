/**
* @fileoverview Fichero main.js donde se encuentra el programa principal.
* @author Fabio Bianchini Cano
* @author Nerea Rodríguez Hernández
* @author Cesar Ángel Salgado Navarro
* @date 15/11/2020
* @description Universidad de la Laguna - Grado en Ingenería Informática
* @description Asignatura: Inteligencia Artificial.
* @decription Práctica 1: Estrategias de Búsqueda.
*/
"use strict";

/**
 * @description Declaración de las variables globales.
 */
let grid;

let wcanvas = 800;
let hcanvas = 600;
let density = 20;

let cols = document.getElementById("columnas").value;
let rows = document.getElementById("filas").value;

let heuristicFunction = document.getElementById("heuristic");
let shapeSelected = document.getElementById("shape");


document.getElementById("probNumber").innerHTML = document.getElementById("probObstacles").value / 100;

let openSet = [];
let closedSet = [];

let path = [];
let pathColor = document.getElementById("pathColor").value + "";


let timeHandler = new TimeHandler();

let tableInfo = {
  nNodes: 0,
  pathLength: 0,
  execTime: 0
}

let status = new Status;

let bgcolor;

/**
 * @description Función que coloca obstáculos mientras arrastramos el ratón y pulsamos la tecla izquierda.
*/
function mouseDragged() {
  if (status.WORKING || status.FINISHED) {return}
  let x = Math.floor(mouseX / (width / cols))
  let y = Math.floor(mouseY / (height / rows))
  if (x < 0 || y < 0 || x > cols || y > rows){return;}
  grid.spots[x][y].toggleObstacle(mouseButton);
  grid.draw();
}

/**
 * @description Función que coloca obstáculos mientras pulsamos la tecla izquierda.
*/
function mousePressed() {
  if (status.WORKING || status.FINISHED) {return}
  let x = Math.floor(mouseX / (width / cols))
  let y = Math.floor(mouseY / (height / rows))
  if (x < 0 || y < 0 || x > cols || y > rows){return;}
  grid.spots[x][y].toggleObstacle(mouseButton);
  grid.draw();
}

/**
 * @description Función que actua segun la tecla que se pulse.
*/
function keyPressed() {
  switch(keyCode) {
    /**
     * @param space Pulsando la tecla espaciadora generamos obstáculos
    */
    case 32: { 
      if (status.WORKING) {return}
      grid.genObstacles(document.getElementById("probObstacles").value  / 100);
      drawFrame();
      return false;
      break;
    }

    /**
     * @param r Pulsando la tecla r reseteamos los parametros del tablero.
    */
    case 82: { 
      status.transition('PRE_BEGIN');
      document.getElementById("nNodos").innerHTML = "";
      document.getElementById("longCamino").innerHTML = "";
      document.getElementById("tEjec").innerHTML = "";        
      openSet = [];
      closedSet = [];
      grid.createMatrix();
      grid.genObstacles(0);
      grid.updateNeighbors();
      openSet.push(grid.start);
      drawFrame();
      break;
    }

    /**
     * @param s Pulsando la tecla s establecemos manualmente la posición de salida.
    */
    case 83: { 
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

    /**
     * @param e Pulsando la tecla e establecemos manualmene la poscición de meta.
    */
    case 69: { 
      if (status.WORKING || status.FINISHED) {return}
      let x = Math.floor(mouseX / (width / cols))
      let y = Math.floor(mouseY / (height / rows))
      if (x < 0 || y < 0 || x > cols || y > rows){return;}
      grid.end = grid.spots[x][y];    
      drawFrame();
      break;
    }

    /**
     * @param enter Pulsando la tecla enter inicializamos la búsqueda del camino óptimo.
    */
    case 13: {
      startExecution();
      if  (!document.getElementById("isAnimation").checked) {
        while (openSet.length > 0) {
          if (algorythmAStar() === grid.end) {
            break;
          }
        }
      }
    }
  }
}

/**
 * @desciption Función que actualiza los parámetros que diseñan la simulación
 */
function updateParameters() {
  if (status.WORKING) {return}
  pathColor = document.getElementById("pathColor").value + "";
  heuristicFunction = document.getElementById("heuristic");
  shapeSelected = document.getElementById("shape");
  document.getElementById("probNumber").innerHTML = document.getElementById("probObstacles").value / 100;
  drawFrame(); 
}

/**
 * @desciption Función que genera un nuevo tablero con los parámetros actualizados.
 */
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

/**
 * @description Función que representa visualmente nuestro tablero.
 */
function drawFrame() {
  clear();
  grid.draw();
}

/**
 * @description Función que elige la función heurística a seguir.
 * @param {object} current Objeto tipo spot que representa la posición X.
 * @param {object} end Objeto tipo spot que representa la posición Y.
 */
function heuristic(current, end) {
  let selectedHeur;
  for (let i = 0; i < heuristicFunction.options.length; i++) {
    if (heuristicFunction.options[i].selected)
      selectedHeur = heuristicFunction.options[i].value;
  }

  let distance;
  switch(selectedHeur) {
    case "manhattan": {
      distance = abs(current.x - end.x) + abs(current.y - end.y); 
      break;
    } 
    case "euclidean": {
      distance = dist(current.x, current.y, end.x, end.y);
      break;
    }
    default: {
      distance = abs(current.x - end.x) + abs(current.y - end.y); 
      break;
    }
  }
  return distance;
}

/**
 * @description Función que dibuja el camino que recorre el algoritmo.
 * @param {object} current Objeto tipo spot que representa la posición actual.
 */
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
    vertex(
      path[i].x * path[i].width + path[i].width / 2,
      path[i].y * path[i].height + path[i].height / 2
    );
  }
  endShape();
  noStroke();
}

/**
 * @description Función que inicializa la ejecución de la búsqueda.
 */
function startExecution() {
  if (status.WORKING) {return}
  status.transition('WORKING');
  timeHandler.start = performance.now();
}

/**
 * @description Función que actualiza los datos de la tabla de información.
 */
function updateWriteTable() {
  tableInfo.nNodes = document.getElementById("nNodos").innerHTML = closedSet.length + 1;
  tableInfo.pathLength = document.getElementById("longCamino").innerHTML = path.length;
  tableInfo.execTime = document.getElementById("tEjec").innerHTML = timeHandler.time().toFixed(3) + "ms";   
}

/**
 * @description Función que prepara los parámetros que van a ser utilizados en la creación del tablero.
 * Esta función es de la librería p5.js y se ejecuta una sola vez al inicio del programa.
 */
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

/**
 * @description Función que llama a todos los métodos que representan visualmente el algoritmo.
 * Esta función es de la librería p5.js y se ejecuta justo después de setup y luego continuamente 
 * hasta que es detenida manualmente.
 */
function draw() {
  if (!status.PRE_BEGIN && !status.FINISHED) { // not beginning  until pressing start button
    //while(!openSet.empty) 
    let current = algorythmAStar();
    drawFrame()
    clear();
    grid.draw();
    
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

/**
 * @description Función donde se describe el Algoritmo A*
 */
function algorythmAStar() {
  let current;
    if (openSet.length > 0) {
      let nextIter = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].fCost < openSet[nextIter].fCost) {
          nextIter = i;
        }
      }
      current = openSet[nextIter];
      
      /* Si llegamos */
      if (current === grid.end) {
        timeHandler.end = performance.now();
        drawFrame();
        for (let i = 0; i < closedSet.length; i++) {
          closedSet[i].draw(color(255, 0, 0, 60));
        }
        for (let i = 0; i < openSet.length; i++) {
          openSet[i].draw(color(0, 255, 0, 150));
        }
        drawPath(current);
        updateWriteTable();
        status.transition('FINISHED')
        return grid.end;
      }

      /* Borra current de openSet */
      openSet.splice(openSet.indexOf(current), 1);
      closedSet.push(current);

      for (let i = 0; i < current.neighbors.length; i++) {
        let neighbor = current.neighbors[i];
        if (!closedSet.includes(neighbor) && !neighbor.isObstacle) {
          /*La variable tempGCost es la distancia entre start y neighbor pasando por current */
          let tempGCost = current.gCost + 1; 
          let isNewPath = false;

          /* Si el neighbor se encuentra visitado */
          if (openSet.includes(neighbor)) { 
            /*Comprobamos si seguimos en el camino óptimo */
            if (tempGCost < neighbor.gCost) {
              neighbor.gCost = tempGCost;
              isNewPath = true;
            }
          } else { 
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
      updateWriteTable();
      status.transition('FINISHED')
      return;
    }
    return current;
}
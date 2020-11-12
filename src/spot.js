'use strict';

class Spot {
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

  toggleObstacle(button) {
    if (button === "left") this.isObstacle = true;
    else if (button === "right") this.isObstacle = false;
    // this.isObstacle = !this.isObstacle;
    this.addNeighbors();
  }

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
          circle(this.x * this.width + (this.width / 2), this. y * this.height + (this.height / 2), this.height * 0.8)
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
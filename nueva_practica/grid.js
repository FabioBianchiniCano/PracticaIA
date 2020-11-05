'use strict';

class Grid {
  constructor(cols, rows, color = 'black') {
    this.cols = cols;
    this.rows = rows;
    this.widthCell = width / cols;
    this.heightCell = height / rows;
    this.spots = new Array(cols);
    this.color = color;
  }




  draw() {
    console.log(this.spots)
    
    // for (let i = 0; i < this.cols; i++) 
    //   for (let j = 0; j < this.rows; j++) 
    //     this.spots[i][j].draw();

    for (let i = 0; i <= cols; i++) {
      line(i * (width / cols), 0, i * (width / cols), height);
    }
    for (let j = 0; j <= rows; j++) {
      line(0, j * (height / rows), width, j * (height / rows));
    }
  }
}
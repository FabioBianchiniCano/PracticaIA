'use strict'

let canvas = document.getElementById('lienzo');
let ctx = canvas.getContext('2d');


function grid(size) {
  let subdivision = canvas.clientHeight / size;
  for (let itx = 0; itx < size; itx++) {
    ctx.beginPath(); 
    ctx.moveTo(itx * subdivision, 0);
    ctx.lineTo(itx * subdivision, canvas.clientHeight);
    ctx.stroke();
  }
  for (let ity = 0; ity < size; ity++) {
    ctx.beginPath(); 
    ctx.moveTo(0, ity * subdivision);
    ctx.lineTo(canvas.clientWidth, ity * subdivision);
    ctx.stroke();
  }

}
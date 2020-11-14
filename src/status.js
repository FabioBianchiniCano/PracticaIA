/**
 * @fileoverview Fichero satus.js donde se describe los métodos y atributos de la clase Status
 * @author Fabio Bianchini Cano
 * @author Nerea Rodríguez Hernández
 * @author Cesar Ángel Salgado Navarro
 * @date 15/11/2020
 */

"use strict";

/**
 *  @class Status
 */
class Status {

  /**
   * @description Constructor por defecto de la clase.
   */
  constructor() {
    this.PRE_BEGIN = true;
    this.WORKING = false;
    this.FINISHED = false;
  } 

  /**
   * @description Función que transiciona al estado con el nombre del parámetro pasado.
   * @param {object} nextState Estado al que queremos pasar.
   */
  transition(nextState) {
    for (let i = 0; i < Object.keys(this).length; i++) {
      this[Object.keys(this)[i]] = false
    }
    this[nextState] = true;
  }

  /**
   * @description Función que imprime por consola el estado en el que se encuentra la aplicación.
   */
  print() {
    for (let i = 0; i < Object.keys(this).length; i++) {
      if (this[Object.keys(this)[i]]) {
        console.log('Current status:', Object.keys(this)[i]);
        break;
      } 
    }
  }
}
/**
 * @fileoverview Fichero timehandler.js donde se describe los métodos y atributos de la clase TimeHandlet
 * @author Fabio Bianchini Cano
 * @author Nerea Rodríguez Hernández
 * @author Cesar Ángel Salgado Navarro
 * @date 15/11/2020
 */

"use strict";

/**
 * @class TimeHandler
 */
class TimeHandler {
  
  /**
   * @descripción Constructor por defecto de la clase.
   */
  constructor() {
    this.start;
    this.end;
  }

  /**
   * @description Función que devuelve el tiempo que ha estado el objeto "activo".
   * Se utiliza para ver cuándo tiempo de ejecución toma cierto programa o parte de él.
   */
  time() {
    return this.end - this.start;
  }
}  
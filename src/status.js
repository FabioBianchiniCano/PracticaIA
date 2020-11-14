class Status {
  constructor() {
    this.PRE_BEGIN = true;
    this.WORKING = false;
    this.FINISHED = false;
  } 

  transition(current) {
    for (let i = 0; i < Object.keys(this).length; i++) {
      this[Object.keys(this)[i]] = false
    }
    this[current] = true;
  }

  print() {
    for (let i = 0; i < Object.keys(this).length; i++) {
      if (this[Object.keys(this)[i]]) {
        console.log('Current status:', Object.keys(this)[i]);
        break;
      } 
    }
  }
}
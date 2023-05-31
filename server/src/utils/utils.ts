//=========== Copy Array ===========//
declare global {
  interface Array<T> {
    equals(array: T[]): boolean
  }
}

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function <T>(array: T[]): boolean {
  // if the other array is a falsy value, return
  if (!array) return false
  // if the argument is the same array, we can be sure the contents are the same as well
  if (array === this) return true
  // compare lengths - can save a lot of time
  if (this.length !== array.length) return false

  for (let i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i])) return false
    } else if (this[i] !== array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false
    }
  }
  return true
}

// Hide method from for-in loops
Object.defineProperty(Array.prototype, 'equals', { enumerable: false })

//=========== Util Functions ===========//

// random int generator
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const utilService = {
  getRandomInt,
}

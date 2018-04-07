const fooPrototype = {
  x: 1,
  y: 1,
  anotherVal: '',
  set xy ({ x, y }) {
    this.x = x
    this.y = y
  },
  get xy () {
    return ({ x: this.x, y: this.y })
  },
  set another (val) {
    this.anotherVal = val
  }
}
export const createFoo = () => {
  return Object.create(fooPrototype)
}
export const createBar = () => {
  let obj = {x: 1, y: 1}
  obj.z = 1
  Object.defineProperty(obj, 'xyz', {
    set: function ({ x, y, z }) {
      this.x = x
      this.y = y
      this.z = z
    },
    get: function () { return { x: this.x, y: this.y, z: this.z } }
  })
  Object.defineProperty(obj, 'xy', {
    set: function ({ x, y, z }) { this.xyz = { x, y, z } },
    get: function () { return this.xyz }
  })
  return obj
}

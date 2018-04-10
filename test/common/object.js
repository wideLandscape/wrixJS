const fooPrototype = {
  x: 1,
  y: 1,
  _value: '',
  set xy ({ x, y }) {
    this.x = x
    this.y = y
  },
  get xy () {
    return ({ x: this.x, y: this.y })
  },
  set value (val) {
    this._value = val
  },
  add (n) {
    this.x += n
    this.y += n
  }
}
export const createFoo = () => {
  // has no __proto__
  return Object.create(fooPrototype)
}
export const createBar = () => {
  // has __proto__
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
  obj.add = function (n) {
    this.x += n
    this.y += n
    this.z += n
  }
  obj.sum = function () {
    return this.x + this.y + this.z
  }
  obj._privateMethod = function () {
    return this.sum()
  }
  return obj
}

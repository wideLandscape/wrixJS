export class Foo {
  constructor (x = 1, y = 1) {
    this.x = x
    this.y = y
  }
  set xy ({x, y}) {
    this.x = x
    this.y = y
  }
  get xy () {
    return ({x: this.x, y: this.y})
  }
  set value (val) {
    this._value = val
  }
  add (n) {
    this.x += n
    this.y += n
  }
}
export class Bar extends Foo {
  constructor (x = 1, y = 1, z = 1) {
    super(x, y)
    this.z = z
  }
  set xy ({x, y, z}) {
    this.xyz = {x, y, z}
  }
  set xyz ({x, y, z}) {
    this.x = x
    this.y = y
    this.z = z
  }
  get xyz () {
    return ({ x: this.x, y: this.y, z: this.z })
  }
  add (n) {
    super.add(n)
    this.z += n
  }
  sum () {
    return this.x + this.y + this.z
  }
  _privateMethod () {
    return this.sum()
  }
}

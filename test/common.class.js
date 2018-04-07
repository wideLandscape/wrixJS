export class Foo {
  constructor () {
    this.x = 1
    this.y = 1
  }
  set xy ({x, y}) {
    this.x = x
    this.y = y
  }
  get xy () {
    return ({x: this.x, y: this.y})
  }
  get reversed () {
    return ({x: this.y, y: this.x})
  }
}
export class Bar extends Foo {
  constructor () {
    super()
    this.z = 1
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
}

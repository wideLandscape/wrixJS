export const hasArea = (element, state) => ({
  _world: {
    width: 0,
    height: 0
  },
  area: function (w, h) {
    this._world.width = w
    this._world.height = h
  },
  centerToArea: function (horizontal = true, vertical = true) {
    if (horizontal) {
      element.x = this._world.width * 0.5
    }
    if (vertical) {
      element.y = this._world.height * 0.5
    }
  }
})

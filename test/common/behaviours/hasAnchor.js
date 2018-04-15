export const hasAnchor = (element, state) => ({
  anchor: function ({ horizontal = 0, vertical = 0 }) {
    element.anchor.setTo(horizontal, vertical)
  }
})

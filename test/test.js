/* global describe it */
var expect = require('chai').expect
var Props = require('../src/core/composers/Props')
describe('Unit test dumb check', function () {
  let one = 1
  it('expect to pass', function () {
    expect(one).to.equal(1)
  })
  it('expect to fail', function () {
    expect(one).to.equal(-1)
  })
})
describe('Props', function () {
  const foo = { x: 1, y: 1 }
  const props = Props.get(foo)
  it('expect to be array', function () {
    expect(props).to.be.a('array')
  })
})

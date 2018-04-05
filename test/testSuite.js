/* global describe it */
var expect = require('chai').expect

describe('Unit test dumb check', function () {
  let one = 1
  it('expect to pass', function () {
    expect(one).to.equal(1)
  })
  it('expect to fail', function () {
    expect(one).to.equal(-1)
  })
})

/* global describe it */
import { Foo } from './common/class'
import { createBar } from './common/object'
import {wrix} from '../src/index'
var expect = require('chai').expect
describe('wrix', function () {
  it('expect to return itself', function () {
    const foo = new Foo()
    let localWrix = wrix.wrap(foo).set({ value: 4, x: 4, y: 6 })
    expect(localWrix).to.be.equal(wrix)
  })
})
describe('wrix.factory', function () {
  it('expect to create factories from object', function () {
    const configFactory = {
      key: 'bar',
      factoryFn: createBar
    }
    let wrappedBar = wrix.factory.create(configFactory).get('bar', { x: 1, y: 2, z: 3 })
    expect(wrappedBar.sum()).to.be.equal(6)
  })
  it('expect to create factories from class', function () {
    const configFactory = {
      key: 'foo',
      factoryFn: () => new Foo(),
      keyContext: '_context'
    }
    let wrappedFoo = wrix.factory.create(configFactory).get('foo', { x: 1, y: 3 })
    expect(wrappedFoo.add(4)._context.y).to.be.equal(7)
  })
})

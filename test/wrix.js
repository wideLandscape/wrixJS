/* global describe it */
import { Foo } from './common/class'
import { createBar, createFap } from './common/object'
import { behaviours } from './common/behaviours'
import {wrix, wrixFactory} from '../src/index'
var expect = require('chai').expect
describe('wrix', function () {
  it('return itself', function () {
    const foo = new Foo()
    let wrixFooRef = wrix().wrap(foo)
    let anotherWrixFooRef = wrixFooRef.set({ value: 4, x: 4, y: 6 })
    let wrixBarRef = wrix().wrap(createBar())
    expect(wrixFooRef.wrix()).to.be.not.equal(wrixBarRef.wrix())
    expect(wrixFooRef).to.be.equal(anotherWrixFooRef)
  })
})
describe('WrixFactory', function () {
  it('creates factories from object', function () {
    const configFactory = {
      key: 'bar',
      factoryFn: createBar
    }
    let wrix = wrixFactory()
    let wrappedBar = wrix.create(configFactory).get('bar', { y: 2, z: 3 })
    expect(wrappedBar.sum()).to.be.equal(6)
  })
  it('creates factories from object with arguments', function () {
    const configFactory = {
      key: 'fap',
      factoryFn: createFap,
      factoryArgs: ['x', 'y', 'z']
    }
    let wrix = wrixFactory()
    let wrappedBar = wrix.create(configFactory).get('fap', { x: 1, y: 2, z: 3 })
    expect(wrappedBar.sum()).to.be.equal(6)
  })
  it('creates factories from class', function () {
    const configFactory = {
      key: 'foo',
      factoryFn: Foo,
      type: 'class'
    }
    let wrappedFoo = wrixFactory(configFactory).get('foo', { x: 1, y: 3 })
    expect(wrappedFoo.add(4).foo.y).to.be.equal(7)
  })
  it('sets custom key context', function () {
    const configFactory = {
      key: 'fooCtx',
      factoryFn: () => new Foo(),
      keyContext: '_context'
    }
    let wrappedFoo = wrixFactory(configFactory)
      .get('fooCtx', { x: 1, y: 3 })
      .add(4)
    expect(wrappedFoo._context.y).to.be.equal(7)
  })
  it('adds behaviours', function () {
    const configFactory = {
      key: 'fooBehaviour',
      factoryFn: () => new Foo(),
      keyContext: '_context',
      behaviours: behaviours
    }
    let wrappedFoo = wrixFactory(configFactory).get('fooBehaviour', { x: 1, y: 3 })
    expect(wrappedFoo.area(10, 10).x(2).centerToArea()._context.x).to.be.equal(5)
  })
  it('persists', function () {
    let wrappedFoo = wrixFactory().get('fooBehaviour')
    expect(wrappedFoo).to.be.not.equal(undefined)
    expect(wrappedFoo).to.be.not.equal(null)
  })
  it('gets different instances', function () {
    let wrappedFoo = wrixFactory().get('fooBehaviour', { x: 1, y: 3 })
    let wrappedFoo2 = wrixFactory().get('fooBehaviour', { x: 1, y: 3 })
    wrappedFoo2.x(5)
    expect(wrappedFoo._context.x).to.be.not.equal(wrappedFoo2._context.x)
  })
  it('get factory keys', function () {
    const keys = wrixFactory().keys
    expect(keys).to.be.a('array').with.lengthOf(5)
  })
  it('destroy factory', function () {
    const factory = wrixFactory()
    factory.destroyAll()
    expect(factory.get('fooBehaviour', { x: 1, y: 3 })).to.be.equal(null)
    const keys = factory.keys
    expect(keys).to.be.a('array').with.lengthOf(0)
  })
})

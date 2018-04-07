/* global describe it */
import {createFoo, createBar} from './common/object'
var expect = require('chai').expect
var Setters = require('../src/core/composers/Setters')
describe('Setters', function () {
  describe('simple object', function () {
    describe('get()', function () {
      it('expect to get setters array', function () {
        const foo = createFoo()
        const setters = Setters.get(foo)
        expect(setters).to.be.a('array').with.lengthOf(2)
      })
      it('expect to get setters array with __proto__', function () {
        const bar = createBar()
        const setters = Setters.get(bar)
        expect(setters).to.be.a('array').with.lengthOf(3).that.include('__proto__')
      })
    })
    describe('chain()', function () {
      it('expect to chain a setter', function () {
        const foo = createFoo()
        const chained = {}
        chained.xy = Setters.chain(foo, 'xy', chained)
        chained.xy({ x: 3, y: 9 })
        expect(foo.y).to.equal(9)
      })
      it('expect to return itself', function () {
        const foo = createFoo()
        const chained = {}
        chained.xy = Setters.chain(foo, 'xy', chained)
        expect(chained.xy({ x: 3, y: 9 })).to.equal(chained)
      })
    })
    describe('chainAll()', function () {
      it('expect to chain all setters', function () {
        const bar = createBar()
        const chained = Setters.chainAll(bar)
        chained.xy({ x: 3, y: 4, z: 5 }).xyz({ x: 5, y: 5, z: 4 })
        const sum = bar.x + bar.y + bar.z
        expect(sum).to.equal(14)
      })
    })
  })
})

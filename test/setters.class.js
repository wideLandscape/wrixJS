/* global describe it */
import {Foo, Bar} from './common/class'
var expect = require('chai').expect
var Setters = require('../src/core/composers/Setters')
describe('Setters', function () {
  describe('class object', function () {
    describe('get()', function () {
      it('expect to get setters array', function () {
        const foo = new Foo()
        const setters = Setters.get(foo)
        expect(setters).to.be.a('array').with.lengthOf(2)
      })
      it('expect to get inherited setters array', function () {
        const bar = new Bar()
        const setters = Setters.get(bar)
        expect(setters).to.be.a('array').with.lengthOf(3)
      })
    })
    describe('chain()', function () {
      const foo = new Foo()
      it('expect to chain a setter', function () {
        const chained = {}
        chained.xy = Setters.chain(foo, 'xy', chained)
        chained.xy({ x: 3, y: 9 })
        expect(foo.y).to.equal(9)
      })
      it('expect to return itself', function () {
        const chained = {}
        chained.xy = Setters.chain(foo, 'xy', chained)
        expect(chained.xy({ x: 3, y: 9 })).to.equal(chained)
      })
      const bar = new Bar()
      it('expect to get inherited setters', function () {
        const chained = {}
        chained.xy = Setters.chain(bar, 'xy', chained)
        chained.xy({ x: 5, y: 5, z: 5 })
        const sum = bar.x + bar.y + bar.z
        expect(sum).to.equal(15)
      })
    })
    describe('chainAll()', function () {
      const bar = new Bar()
      it('expect to chain all setters', function () {
        const chained = Setters.chainAll(bar)
        chained.xyz({ x: 5, y: 5, z: 5 }).xy({x: 1, y: 3, z: 5})
        const sum = bar.x + bar.y + bar.z
        expect(sum).to.equal(9)
      })
    })
  })
})

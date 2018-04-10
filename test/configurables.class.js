/* global describe it */
import {Foo, Bar} from './common/class'
var expect = require('chai').expect
var Configurables = require('../src/core/composers/Configurables')
describe('Configurables', function () {
  describe('class', function () {
    describe('get()', function () {
      it('expect to get props and setters array', function () {
        const foo = new Foo()
        const configurables = Configurables.get(foo)
        expect(configurables).to.be.a('array').with.lengthOf(4)
      })
    })
    describe('chain()', function () {
      it('expect to chain a prop', function () {
        const foo = new Foo()
        const chained = {}
        chained.x = Configurables.chain(foo, 'x', chained)
        chained.x(3)
        expect(foo.x).to.equal(3)
      })
      it('expect to chain a setter', function () {
        const foo = new Foo()
        const chained = {}
        chained.value = Configurables.chain(foo, 'value', chained)
        chained.value('hello')
        expect(foo._value).to.equal('hello')
      })
      it('expect to return itself', function () {
        const foo = new Foo()
        const chained = {}
        chained.x = Configurables.chain(foo, 'x', chained)
        expect(chained.x(3)).to.equal(chained)
      })
      it('expect to get inherited configurables', function () {
        const bar = new Bar()
        const chained = {}
        chained.value = Configurables.chain(bar, 'value', chained)
        chained.value('hello')
        expect(bar._value).to.equal('hello')
      })
    })
    describe('chainAll()', function () {
      it('expect to chain all configurables', function () {
        const bar = new Bar()
        const chained = Configurables.chainAll(bar)
        chained.x(5).y(5).z(5).xy({x: 1, y: 2, z: 3})
        const sum = bar.x + bar.y + bar.z
        expect(sum).to.equal(6)
      })
    })
  })
})

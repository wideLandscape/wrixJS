/* global describe it */
import {createFoo, createBar} from './common/object'
var expect = require('chai').expect
var Configurables = require('../src/core/composers/Configurables')
describe('Configurables', function () {
  describe('object', function () {
    describe('get()', function () {
      it('expect to get props and setters array', function () {
        const foo = createFoo()
        const configurables = Configurables.get(foo)
        expect(configurables).to.be.a('array').with.lengthOf(5)
      })
    })
    describe('chain()', function () {
      it('expect to chain a prop', function () {
        const foo = createFoo()
        const chained = {}
        chained.x = Configurables.chain(foo, 'x', chained)
        chained.x(3)
        expect(foo.x).to.equal(3)
      })
      it('expect to chain a setter', function () {
        const foo = createFoo()
        const chained = {}
        chained.value = Configurables.chain(foo, 'value', chained)
        chained.value('hello')
        expect(foo._value).to.equal('hello')
      })
      it('expect to return itself', function () {
        const foo = createFoo()
        const chained = {}
        chained.x = Configurables.chain(foo, 'x', chained)
        expect(chained.x(3)).to.equal(chained)
      })
    })
    describe('chainAll()', function () {
      it('expect to chain all configurables', function () {
        const bar = createBar()
        const chained = Configurables.chainAll(bar)
        chained.xyz({x: 1, y: 2, z: 2}).x(5).z(5)
        const sum = bar.x + bar.y + bar.z
        expect(sum).to.equal(12)
      })
    })
  })
})

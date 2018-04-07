/* global describe it */
import {Foo, Bar} from './common.class'
var expect = require('chai').expect
var Props = require('../src/core/composers/Props')
describe('Props', function () {
  describe('class object', function () {
    describe('get()', function () {
      const foo = new Foo()
      it('expect to get properties array', function () {
        const props = Props.get(foo)
        expect(props).to.be.a('array')
      })
    })
    describe('chain()', function () {
      const foo = new Foo()
      it('expect to chain a prop', function () {
        const chained = {}
        chained.x = Props.chain(foo, 'x', chained)
        chained.x(3)
        expect(foo.x).to.equal(3)
      })
      it('expect to return itself', function () {
        const chained = {}
        chained.x = Props.chain(foo, 'x', chained)
        expect(chained.x(3)).to.equal(chained)
      })
      const bar = new Bar()
      it('expect to get inherited props', function () {
        const chained = {}
        chained.z = Props.chain(bar, 'z', chained)
        chained.z(3)
        expect(bar.z).to.equal(3)
      })
    })
    describe('chainAll()', function () {
      const bar = new Bar()
      it('expect to chain all props', function () {
        const chained = Props.chainAll(bar)
        chained.x(5).y(5).z(5)
        const sum = bar.x + bar.y + bar.z
        expect(sum).to.equal(15)
      })
    })
  })
})

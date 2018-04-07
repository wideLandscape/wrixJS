/* global describe it */
import {Foo, Bar} from './common/class'
var expect = require('chai').expect
var Props = require('../src/core/composers/Props')
describe('Props', function () {
  describe('class object', function () {
    describe('get()', function () {
      it('expect to get properties array', function () {
        const foo = new Foo()
        const props = Props.get(foo)
        expect(props).to.be.a('array').with.lengthOf(2)
      })
    })
    describe('chain()', function () {
      it('expect to chain a prop', function () {
        const foo = new Foo()
        const chained = {}
        chained.x = Props.chain(foo, 'x', chained)
        chained.x(3)
        expect(foo.x).to.equal(3)
      })
      it('expect to return itself', function () {
        const foo = new Foo()
        const chained = {}
        chained.x = Props.chain(foo, 'x', chained)
        expect(chained.x(3)).to.equal(chained)
      })
      it('expect to get inherited props', function () {
        const bar = new Bar()
        const chained = {}
        chained.x = Props.chain(bar, 'x', chained)
        chained.x(3)
        expect(bar.x).to.equal(3)
      })
    })
    describe('chainAll()', function () {
      it('expect to chain all props', function () {
        const bar = new Bar()
        const chained = Props.chainAll(bar)
        chained.x(5).y(5).z(5)
        const sum = bar.x + bar.y + bar.z
        expect(sum).to.equal(15)
      })
    })
  })
})

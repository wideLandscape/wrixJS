/* global describe it */
import {createFoo, createBar} from './common.object'
var expect = require('chai').expect
var Props = require('../src/core/composers/Props')
describe('Props', function () {
  describe('simple object', function () {
    describe('get()', function () {
      it('expect to get properties array', function () {
        const foo = createFoo()
        const props = Props.get(foo)
        expect(props).to.be.a('array').with.lengthOf(3)
      })
    })
    describe('chain()', function () {
      const foo = createFoo()
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
      it('expect to get inherited props', function () {
        const bar = createBar()
        const chained = {}
        chained.z = Props.chain(bar, 'z', chained)
        chained.x = Props.chain(bar, 'x', chained)
        chained.z(3).x(2)
        expect(bar.z).to.equal(3)
      })
    })
    describe('chainAll()', function () {
      it('expect to chain all props', function () {
        const bar = createBar()
        const chained = Props.chainAll(bar)
        chained.x(5).y(5).z(5)
        const sum = bar.x + bar.y + bar.z
        expect(sum).to.equal(15)
      })
    })
  })
})

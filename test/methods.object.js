/* global describe it */
import {createFoo, createBar} from './common/object'
var expect = require('chai').expect
var Methods = require('../src/core/composers/Methods')
describe('Methods', function () {
  describe('object', function () {
    describe('get()', function () {
      it('expect to get methods array', function () {
        const foo = createFoo()
        const methods = Methods.get(foo)
        expect(methods).to.be.a('array').with.lengthOf(1)
      })
    })
    describe('chain()', function () {
      it('expect to chain a method', function () {
        const foo = createFoo()
        const chained = {}
        chained.add = Methods.chain(foo, 'add', chained)
        chained.add(3)
        expect(foo.x).to.equal(4)
      })
      it('expect to return itself', function () {
        const foo = createFoo()
        const chained = {}
        chained.add = Methods.chain(foo, 'add', chained)
        expect(chained.add(3)).to.equal(chained)
      })
      it('expect to get inherited methods', function () {
        const bar = createBar()
        const chained = {}
        chained.add = Methods.chain(bar, 'add', chained)
        chained.add(3)
        expect(bar.x).to.equal(4)
      })
    })
    describe('chainAll()', function () {
      it('expect to chain all methods', function () {
        const bar = createBar()
        const chained = Methods.chainAll(bar)
        const sum = chained.add(5).sum()
        expect(sum).to.equal(18)
      })
    })
  })
})

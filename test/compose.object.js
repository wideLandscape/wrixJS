/* global describe it */
import {createFoo, createBar} from './common/object'
var expect = require('chai').expect
var Composer = require('../src/core/compose')
describe('composer', function () {
  describe('class', function () {
    describe('compose()', function () {
      it('expect to wrap props', function () {
        const foo = createFoo()
        const wrapper = Composer.compose({ props: foo })
        expect(wrapper.x).to.be.a('function')
      })
      it('expect to wrap setters', function () {
        const foo = createFoo()
        const wrapper = Composer.compose({ setters: foo })
        expect(wrapper.xy).to.be.a('function')
      })
      it('expect to wrap props and setters (as configurables)', function () {
        const foo = createFoo()
        const wrapper = Composer.compose({ configurables: foo })
        wrapper.xy({ x: 1, y: 3 }).x(3)
        const sum = foo.x + foo.y
        expect(sum).to.be.equal(6)
      })
      it('expect to wrap getters', function () {
        const foo = createFoo()
        const wrapper = Composer.compose({ getters: foo })
        foo.y = 2
        const xy = wrapper.xy
        const sum = xy.x + xy.y
        expect(sum).to.be.equal(3)
      })
    })
    describe('wrap()', function () {
      it('expect to wrap an instance', function () {
        const bar = createBar()
        const wrapper = Composer.wrap(bar)
        bar.y = 2
        const sum = wrapper.x(4).z(4).sum()
        expect(sum).to.be.equal(10)
      })
      it('expect to preserv context', function () {
        const foo = createFoo()
        const context = {anotherValue: 'anotherValue'}
        const wrapper = Composer.wrap(foo, context)
        wrapper.x(2)
        expect(wrapper.anotherValue).to.be.equal('anotherValue')
      })
      it('expect to not wrap private keys', function () {
        const bar = createBar()
        const context = {anotherValue: 'anotherValue'}
        const wrapper = Composer.wrap(bar, context)
        expect(wrapper._privateMethod).to.be.equal(undefined)
      })
      it('expect to wrap private keys', function () {
        const bar = createBar()
        const context = {anotherValue: 'anotherValue'}
        const wrapper = Composer.wrap(bar, context, true)
        expect(wrapper._privateMethod()).to.be.equal(3)
      })
    })
  })
})

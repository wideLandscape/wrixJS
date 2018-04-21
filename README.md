# wrixJS

WrixJS is builded whit WrixJS: a Javascript lib to compose chainable libs and frameworks.

You will like it if:
- you don't like to declare vars only to configure props object
- you fear to forget 'return this' at the end of every function of your chainable lib (or you're too lazy...)
- you don't like to (always) clone objects
- you like to extend functionality preserving the original instance
- you like clean, readable code
- you need to build factories/services in an easy way

## Installation

* Install node.js and npm: https://nodejs.org/en/
* Run

```npm install wrixjs```

## Usage

### wrix

* wrix(object, istantiate = true)

```javascript
import { wrix } from wrixJS

const example = {
  x:1,
  y:1,
  sum(){
    return this.x + this.y
  }
}
// wrap new instances
let wrixExample = wrix(example) // same as wrix().wrap(Object.create(example)).wrix()
console.log(wrixExample.x(2)
                       .y(4)
                       .sum()) // 6
console.log(example.y) // 1
```
```javascript
import { wrix } from wrixJS

// wrap uninstantiated object
let wrixExample = wrix(example, false) // same as wrix().wrap(example).wrix()
console.log(wrixExample.x(2)
                       .y(4)
                       .sum()) // 6
console.log(example.y) // 4
```

DOCUMENTATION TO DO:
* wrix.wrap()
* wrix.compose()
* wrix.set()
* wrix.consume()
* wrix.wrix()

### wrixFactory

* wrixFactory(configurationObject)

configutationObject has these properties:
* key: key to register/get/destroy the factory
* type: type of factory function: object, class, prototype, static (default: object)
* keyContext: prop name to access wrapped instance (default: key)
* factoryFn: function to pull instances to wrap
* factoryArgs: list of args to pass to the factory function (optional)
* behaviours: list of methods(wrappedInstance, wrapper) to add to the wrapper (optional)

```javascript
import { wrixFactory } from wrixJS
import Foo from './foo'
const example = {
  x:1,
  y:1,
  sum(){
    return this.x + this.y
  }
}

wrixFactory()
  .create({
    key: 'example',
    factoryFn: example
  })
  .create({
    key: 'foo',
    factoryFn: Foo,
    type: 'class'
  })
// get instance of wrix(example) with configuration
let wrappedExample = wrixFactory().get('example', { x: 1, y: 3 })
// get a new Foo() wrapped in a wrix()
let wrappedFoo = wrixFactory().get('foo')
console.log(wrappedExample.x(2).sum()) // 5

```
```javascript
import { wrixFactory } from wrixJS

const example = {
  x:1,
  y:1,
  sum(){
    return this.x + this.y
  }
}
const configFactory = {
  key: 'foo',
  factoryFn: example
}

wrixFactory(configFactory) // same as wrixFactory().create(configFactory)
let wrappedFoo = wrixFactory().get('foo', { x: 1, y: 3 })
console.log(wrappedFoo.sum()) // 4
let otherWrappedFoo = wrixFactory().get('foo')
console.log(otherWrappedFoo.sum()) // 2

```

DOCUMENTATION TO DO:
* wrixFactory.create()
* wrixFactory.get()
* wrixFactory.keys()
* wrixFactory.destroy()
* wrixFactory.destroyAll()

## Contribute

### Clone this repo:

Navigate into your workspace directory.

Run:

```git clone https://github.com/wideLandscape/wrixJS```

### Install dependencies:

Navigate to the cloned repo's directory.

Run:

```npm install```

### Building

- `npm run dev` - dev build with sourcemaps
- `npm run build` - production build
- `npm run dist` - production build + source code as you can see in the 'dist' folder.

### Testing
- `npm run test:self` - a pass/no pass test to ensure mocha/chai works properly
- `npm test` - runs tests

## Authors

* Adriano Costa <iano76@gmail.com>

## Version History

* 1.0.2
    * the dist folder contains:
      * wrix.js: the webpacked lib;
      * src/ folder: wrixJS source code, no minify/uglify. Easy to debug when building your own lib/framework
      . Recommended.
* 1.0.1
    * fix wrix()
    * README.md update
* 1.0.0
    * split wrix into wrixFactory() and wrix()
    * add type to wrixFactory's configurationFactoryObject (object, class, static, prototype)
    * wrix(object) is a shortcut for wrix().wrap(Object.create(object)).wrix()
    * wrixFactory(configurationFactoryObj) is a shortcut for wrixFactory().create(configurationFactoryObj)
    * add destroy(instance) destroyAll() methods and 'keys' prop to wrixFactory
* 0.4.0
    * add more control over wrix wrap/compose process
* 0.3.0
    * wrix utility library is ready
* 0.2.0
    * Test Coverage
* 0.1.0
    * Initial Release

## License

This project is licensed under the MIT License - see the LICENSE file for details

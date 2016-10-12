# smartsystem
simplifies lazy loading with TypeScript

## Availabililty
[![npm](https://push.rocks/assets/repo-button-npm.svg)](https://www.npmjs.com/package/smartsystem)
[![git](https://push.rocks/assets/repo-button-git.svg)](https://gitlab.com/pushrocks/smartsystem)
[![git](https://push.rocks/assets/repo-button-mirror.svg)](https://github.com/pushrocks/smartsystem)
[![docs](https://push.rocks/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/smartsystem/)

## Status for master
[![build status](https://gitlab.com/pushrocks/smartsystem/badges/master/build.svg)](https://gitlab.com/pushrocks/smartsystem/commits/master)
[![coverage report](https://gitlab.com/pushrocks/smartsystem/badges/master/coverage.svg)](https://gitlab.com/pushrocks/smartsystem/commits/master)
[![Dependency Status](https://david-dm.org/pushrocks/smartsystem.svg)](https://david-dm.org/pushrocks/smartsystem)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/smartsystem/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/smartsystem/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/smartsystem/badges/code.svg)](https://www.bithound.io/github/pushrocks/smartsystem)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage
We recommend the use of TypeScript for best Intellisense

```typescript
import { LazyModule } from 'smartsystem'

import * as _myPlugin from 'myPlugin' // plugin does not get loaded here at runtime
let myPluginLazy = new LazyModule<typeof _myPlugin>('myPlugin')

import * as _anotherPlugin from 'anotherPlugin' // plugin does not get loaded here at runtime
let anotherPluginLazy = new LazyModule<typeof _anotherPlugin>('anotherPlugin')

myPluginLazy.whenLoaded.then(myPlugin => {
    /* do something with myPlugin. 
       myPlugin receives the typings flow from LazyModule class
       This does NOT load the module during runtime
       The promise whenLoaded will be resolved whenever load() is called for the first time */
})

myPluginLazy.load().then(myPlugin => {
    /* do something with myPlugin. 
       myPlugin receives the typings flow from LazyModule class
       This DOES LOAD the module */
})
```
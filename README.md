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
import {LazyModule, loadNow } from 'smartsystem'

import * as myPluginType from 'myPlugin' // plugin does not get loaded here at runtime
let myPluginPromised = LazyModule<typeof myPlugin>('myPlugin')

import * as anotherPluginType from 'anotherPlugin' // plugin does not get loaded here at runtime
let anotherPluginPromised = LazyModule<typeof anotherPlugin>('anotherPlugin')

myPluginPromised.then(myPlugin => { /* do something with myPlugin */ })
myPlugin.also(anotherPluginPromised).then((m,a) => {}) // also takes multiple other plugins

loadNow.only('myPlugin') // loads myPlugin and resolved the lazy promise
loadNow.also('myPlugin') // loads myPlugin and any chained 'also' modules
```
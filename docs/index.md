---
name: smartsystem
description: simplifies lazy loading with TypeScript
---

# smartsystem

simplifies lazy loading with TypeScript

## Availabililty

[![npm](https://pushrocks.gitlab.io/assets/repo-button-npm.svg)](https://www.npmjs.com/package/smartsystem)
[![git](https://pushrocks.gitlab.io/assets/repo-button-git.svg)](https://GitLab.com/pushrocks/smartsystem)
[![git](https://pushrocks.gitlab.io/assets/repo-button-mirror.svg)](https://github.com/pushrocks/smartsystem)
[![docs](https://pushrocks.gitlab.io/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/smartsystem/)

## Status for master

[![build status](https://GitLab.com/pushrocks/smartsystem/badges/master/build.svg)](https://GitLab.com/pushrocks/smartsystem/commits/master)
[![coverage report](https://GitLab.com/pushrocks/smartsystem/badges/master/coverage.svg)](https://GitLab.com/pushrocks/smartsystem/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/smartsystem.svg)](https://www.npmjs.com/package/smartsystem)
[![Dependency Status](https://david-dm.org/pushrocks/smartsystem.svg)](https://david-dm.org/pushrocks/smartsystem)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/smartsystem/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/smartsystem/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/smartsystem/badges/code.svg)](https://www.bithound.io/github/pushrocks/smartsystem)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage

We recommend the use of TypeScript for best Intellisense

smartsystem supports both npm and SystemJs as module loader.

```javascript
import { LazyModule } from 'smartsystem';

// plugin does not get loaded here at runtime
import * as _myPlugin from 'myPlugin';

// define the lazy module
let myLazyModule = new LazyModule() < typeof _myPlugin > ('myPlugin', __dirname);

// another plugin
import * as _anotherPlugin from 'anotherPlugin'; // plugin does not get loaded here at runtime

// define lazy module
let anotherLazyModule = new LazyModule() < typeof _anotherPlugin > ('anotherPlugin', __dirname);

myLazyModule.whenLoaded.then(myPlugin => {
  /* do something with myPlugin. 
       myPlugin receives the typings flow from LazyModule class
       This does NOT load the module during runtime
       The promise whenLoaded will be resolved whenever load() is called for the first time */
});

myLazyModule.load().then(myPlugin => {
  /* do something with myPlugin. 
       myPlugin receives the typings flow from LazyModule class
       This DOES LOAD the module */
});
```

For further information read the linked docs at the top of this README.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
> | By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy.html)

[![repo-footer](https://pushrocks.gitlab.io/assets/repo-footer.svg)](https://push.rocks)

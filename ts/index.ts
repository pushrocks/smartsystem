import 'typings-global'

import * as path from 'path'
import * as smartq from 'smartq'
import { Objectmap } from 'lik'

class Smartsystem {
  lazyModules = new Objectmap<LazyModule<any>>()

  /**
   * add lazyModule to Smartsystem
   */
  addLazyModule (lazyModuleArg: LazyModule<any>) {
    this.lazyModules.add(lazyModuleArg)
  }
}

// create the internal smartsystem
let smartsystem = new Smartsystem()

/**
 * defines a LazyModule
 */

export type TLoader = 'npm' | 'systemjs'

export class LazyModule<T> {
  name: string
  cwd: string
  whenLoaded: Promise<T>
  private nameIsPath: boolean
  private whenLoadedDeferred: smartq.Deferred<T>
  constructor (nameArg: string, cwdArg: string) {
    if (!cwdArg) {
      throw new Error('You must specify a directory to resolve from!')
    }
    this.name = nameArg
    this.cwd = cwdArg
    smartsystem.addLazyModule(this) // add module to smartsystem instance
    this.nameIsPath = /\.\//.test(this.name) // figure out if name is path
    if (this.nameIsPath) {
      this.name = path.join(this.cwd, this.name)
    }
    this.whenLoadedDeferred = smartq.defer<T>()
    this.whenLoaded = this.whenLoadedDeferred.promise
  }

  /**
   * loads the module
   */
  async load (): Promise<T> {
    let loadedModule: T = require(this.name)
    this.whenLoadedDeferred.resolve(loadedModule)
    return loadedModule
  }
}

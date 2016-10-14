import 'typings-global'

import * as path from 'path'
import * as q from 'q'
import { Objectmap } from 'lik'
let systemjs = require('systemjs')

class Smartsystem {
    lazyModules = new Objectmap<LazyModule<any>>()

    /**
     * add lazyModule to Smartsystem
     */
    addLazyModule(lazyModuleArg: LazyModule<any>) {
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
    nameIsPath: boolean
    cwd: string
    whenLoaded: q.Promise<T>
    loader: TLoader = 'npm'
    private whenLoadedDeferred: q.Deferred<T>
    constructor(nameArg: string, cwdArg: string = process.cwd()) {
        this.name = nameArg
        this.cwd = cwdArg
        smartsystem.addLazyModule(this) // add module to smartsystem instance
        this.nameIsPath = /\.\//.test(this.name) // figure out if name is path
        if (this.nameIsPath) {
            this.name = path.join(this.cwd, this.name)
        }
        this.whenLoadedDeferred = q.defer<T>()
        this.whenLoaded = this.whenLoadedDeferred.promise
    }

    setLoader(loaderArg: TLoader) {
        this.loader = loaderArg
    }

    /**
     * loads the module
     */
    load(): q.Promise<T> {
        let done = q.defer<T>()
        let loadedModule: T
        let loadingPath: string
        if (this.loader === 'npm') {
            loadingPath = require.resolve(this.name)
        } else {
            loadingPath = this.name
        }
        systemjs.import(loadingPath).then((m) => {
            loadedModule = m
            this.whenLoadedDeferred.resolve(loadedModule)
            done.resolve(loadedModule)
        }).catch(err => { console.log(err) })
        return done.promise
    }

    /**
     * loads additional lazy modules specified as arguments and returns them in the promise for easy use
     */
    loadAlso(...args: LazyModule<any>[]) {

    }
}
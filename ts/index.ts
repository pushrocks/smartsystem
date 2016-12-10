import 'typings-global'

import * as path from 'path'
import * as q from 'q'
import { Objectmap } from 'lik'

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
    constructor(nameArg: string, cwdArg: string) {
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
        if (this.loader === 'npm') {
            loadedModule = require(this.name)
            done.resolve(loadedModule)
        } else if (this.loader === 'systemjs') {
            let systemjs = require('systemjs')
            systemjs.import(this.name).then((m) => {
                loadedModule = m
                this.whenLoadedDeferred.resolve(loadedModule)
                done.resolve(loadedModule)
            }).catch(err => { console.log(err) })
        } else {
            throw Error('loader not supported')
        }
        return done.promise
    }

    /**
     * loads additional lazy modules specified as arguments and returns them in the promise for easy use
     */
    loadAlso(...args: LazyModule<any>[]) {

    }
}

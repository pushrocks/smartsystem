import * as plugins from './smartsystem.plugins'

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
export class LazyModule<T> {
    name: string
    nameIsPath: boolean
    cwd: string
    whenLoaded: q.Promise<T>
    private whenLoadedDeferred: q.Deferred<T>
    constructor(nameArg: string, cwdArg: string = process.cwd()) {
        this.name = nameArg
        this.cwd = cwdArg
        smartsystem.addLazyModule(this) // add module to smartsystem instance
        this.nameIsPath = /\.\//.test(this.name) // figure out if name is path
        this.whenLoadedDeferred = q.defer<T>()
        this.whenLoaded = this.whenLoadedDeferred.promise
    }

    /**
     * loads the module
     */
    load(): q.Promise<T> {
        let done = q.defer<T>()
        let loadedModule: T
        systemjs.import(this.name).then((m) => {
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
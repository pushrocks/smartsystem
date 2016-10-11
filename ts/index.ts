import * as plugins from './smartsystem.plugins'

import * as q from 'q'
import { Objectmap } from 'lik'
let systemjs = require('systemjs')

class Smartsystem {
    lazyModules = new Objectmap<LazyModule>()

    /**
     * add lazyModule to Smartsystem
     */
    addLazyModule(lazyModuleArg: LazyModule) {
        this.lazyModules.add(lazyModuleArg)
    }

    loadLazyModule(lazyModuleArg: LazyModule)
}

// create the internal smartsystem
let smartsystem = new Smartsystem()

/**
 * defines a LazyModule
 */
export class LazyModule<T> {
    name: string
    cwd: string
    constructor(nameArg: string, cwdArg: string = process.cwd()){
        this.name = nameArg
        this.cwd = cwdArg
        smartsystem.addLazyModule(this)
    }

    /**
     * loads the module
     */
    load(): q.Promise<T> {
        let done = q.defer<T>()
        let loadedModule: T
        systemjs.import(this.name).then((m) => {
            loadedModule = m
            done.resolve(loadedModule)
        })
        return done.promise
    }

    /**
     * loads additional lazy modules specified as arguments and returns them in the promise for easy use
     */
    loadAlso(...args: LazyModule<any>[]) {
        
    }
}
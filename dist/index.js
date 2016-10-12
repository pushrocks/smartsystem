"use strict";
require("typings-global");
const path = require("path");
const q = require("q");
const lik_1 = require("lik");
let systemjs = require('systemjs');
class Smartsystem {
    constructor() {
        this.lazyModules = new lik_1.Objectmap();
    }
    /**
     * add lazyModule to Smartsystem
     */
    addLazyModule(lazyModuleArg) {
        this.lazyModules.add(lazyModuleArg);
    }
}
// create the internal smartsystem
let smartsystem = new Smartsystem();
/**
 * defines a LazyModule
 */
class LazyModule {
    constructor(nameArg, cwdArg = process.cwd()) {
        this.name = nameArg;
        this.cwd = cwdArg;
        smartsystem.addLazyModule(this); // add module to smartsystem instance
        this.nameIsPath = /\.\//.test(this.name); // figure out if name is path
        if (this.nameIsPath) {
            this.name = path.join(this.cwd, this.name);
        }
        this.whenLoadedDeferred = q.defer();
        this.whenLoaded = this.whenLoadedDeferred.promise;
    }
    /**
     * loads the module
     */
    load() {
        let done = q.defer();
        let loadedModule;
        systemjs.import(this.name).then((m) => {
            loadedModule = m;
            this.whenLoadedDeferred.resolve(loadedModule);
            done.resolve(loadedModule);
        }).catch(err => { console.log(err); });
        return done.promise;
    }
    /**
     * loads additional lazy modules specified as arguments and returns them in the promise for easy use
     */
    loadAlso(...args) {
    }
}
exports.LazyModule = LazyModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQXVCO0FBRXZCLDZCQUE0QjtBQUM1Qix1QkFBc0I7QUFDdEIsNkJBQStCO0FBQy9CLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUVsQztJQUFBO1FBQ0ksZ0JBQVcsR0FBRyxJQUFJLGVBQVMsRUFBbUIsQ0FBQTtJQVFsRCxDQUFDO0lBTkc7O09BRUc7SUFDSCxhQUFhLENBQUMsYUFBOEI7UUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDdkMsQ0FBQztDQUNKO0FBRUQsa0NBQWtDO0FBQ2xDLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUE7QUFFbkM7O0dBRUc7QUFDSDtJQU1JLFlBQVksT0FBZSxFQUFFLE1BQU0sR0FBVyxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQ3ZELElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFBO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFBO1FBQ2pCLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxxQ0FBcUM7UUFDckUsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLDZCQUE2QjtRQUN0RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0MsQ0FBQztRQUNELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFLLENBQUE7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFBO0lBQ3JELENBQUM7SUFFRDs7T0FFRztJQUNILElBQUk7UUFDQSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFLLENBQUE7UUFDdkIsSUFBSSxZQUFlLENBQUE7UUFDbkIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM5QixZQUFZLEdBQUcsQ0FBQyxDQUFBO1lBQ2hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUM5QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxRQUFRLENBQUMsR0FBRyxJQUF1QjtJQUVuQyxDQUFDO0NBQ0o7QUF0Q0QsZ0NBc0NDIn0=
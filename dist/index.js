"use strict";
require("typings-global");
const path = require("path");
const q = require("q");
const lik_1 = require("lik");
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
class LazyModule {
    constructor(nameArg, cwdArg) {
        this.loader = 'npm';
        if (!cwdArg) {
            throw new Error('You must specify a directory to resolve from!');
        }
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
    setLoader(loaderArg) {
        this.loader = loaderArg;
    }
    /**
     * loads the module
     */
    load() {
        let done = q.defer();
        let loadedModule;
        if (this.loader === 'npm') {
            loadedModule = require(this.name);
            done.resolve(loadedModule);
        }
        else if (this.loader === 'systemjs') {
            let systemjs = require('systemjs');
            systemjs.import(this.name).then((m) => {
                loadedModule = m;
                this.whenLoadedDeferred.resolve(loadedModule);
                done.resolve(loadedModule);
            }).catch(err => { console.log(err); });
        }
        else {
            throw Error('loader not supported');
        }
        return done.promise;
    }
    /**
     * loads additional lazy modules specified as arguments and returns them in the promise for easy use
     */
    loadAlso(...args) {
    }
}
exports.LazyModule = LazyModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQXVCO0FBRXZCLDZCQUE0QjtBQUM1Qix1QkFBc0I7QUFDdEIsNkJBQStCO0FBRS9CO0lBQUE7UUFDSSxnQkFBVyxHQUFHLElBQUksZUFBUyxFQUFtQixDQUFBO0lBUWxELENBQUM7SUFORzs7T0FFRztJQUNILGFBQWEsQ0FBQyxhQUE4QjtRQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0NBQ0o7QUFFRCxrQ0FBa0M7QUFDbEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQTtBQVFuQztJQU9JLFlBQVksT0FBZSxFQUFFLE1BQWM7UUFGM0MsV0FBTSxHQUFZLEtBQUssQ0FBQTtRQUduQixFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVixNQUFNLElBQUksS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUE7UUFDcEUsQ0FBQztRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFBO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFBO1FBQ2pCLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxxQ0FBcUM7UUFDckUsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLDZCQUE2QjtRQUN0RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDOUMsQ0FBQztRQUNELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFLLENBQUE7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFBO0lBQ3JELENBQUM7SUFFRCxTQUFTLENBQUMsU0FBa0I7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUE7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSTtRQUNBLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUssQ0FBQTtRQUN2QixJQUFJLFlBQWUsQ0FBQTtRQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDeEIsWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUM5QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDbEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDOUIsWUFBWSxHQUFHLENBQUMsQ0FBQTtnQkFDaEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtnQkFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUM5QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN6QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO1FBQ3ZDLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxRQUFRLENBQUMsR0FBRyxJQUF1QjtJQUVuQyxDQUFDO0NBQ0o7QUF0REQsZ0NBc0RDIn0=
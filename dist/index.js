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
class LazyModule {
    constructor(nameArg, cwdArg = process.cwd()) {
        this.loader = 'npm';
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
        let loadingPath;
        if (this.loader === 'npm') {
            loadingPath = require.resolve(this.name);
        }
        else {
            loadingPath = this.name;
        }
        systemjs.import(loadingPath).then((m) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQXVCO0FBRXZCLDZCQUE0QjtBQUM1Qix1QkFBc0I7QUFDdEIsNkJBQStCO0FBQy9CLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUVsQztJQUFBO1FBQ0ksZ0JBQVcsR0FBRyxJQUFJLGVBQVMsRUFBbUIsQ0FBQTtJQVFsRCxDQUFDO0lBTkc7O09BRUc7SUFDSCxhQUFhLENBQUMsYUFBOEI7UUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDdkMsQ0FBQztDQUNKO0FBRUQsa0NBQWtDO0FBQ2xDLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUE7QUFRbkM7SUFPSSxZQUFZLE9BQWUsRUFBRSxNQUFNLEdBQVcsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUYzRCxXQUFNLEdBQVksS0FBSyxDQUFBO1FBR25CLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFBO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFBO1FBQ2pCLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxxQ0FBcUM7UUFDckUsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLDZCQUE2QjtRQUN0RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDOUMsQ0FBQztRQUNELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFLLENBQUE7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFBO0lBQ3JELENBQUM7SUFFRCxTQUFTLENBQUMsU0FBa0I7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUE7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSTtRQUNBLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUssQ0FBQTtRQUN2QixJQUFJLFlBQWUsQ0FBQTtRQUNuQixJQUFJLFdBQW1CLENBQUE7UUFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLFdBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM1QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtRQUMzQixDQUFDO1FBQ0QsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLFlBQVksR0FBRyxDQUFDLENBQUE7WUFDaEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQzlCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNILFFBQVEsQ0FBQyxHQUFHLElBQXVCO0lBRW5DLENBQUM7Q0FDSjtBQWpERCxnQ0FpREMifQ==
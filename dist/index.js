"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsdUJBQXNCO0FBQ3RCLDZCQUErQjtBQUMvQixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7QUFFbEM7SUFBQTtRQUNJLGdCQUFXLEdBQUcsSUFBSSxlQUFTLEVBQW1CLENBQUE7SUFRbEQsQ0FBQztJQU5HOztPQUVHO0lBQ0gsYUFBYSxDQUFDLGFBQThCO1FBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7Q0FDSjtBQUVELGtDQUFrQztBQUNsQyxJQUFJLFdBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFBO0FBRW5DOztHQUVHO0FBQ0g7SUFNSSxZQUFZLE9BQWUsRUFBRSxNQUFNLEdBQVcsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUN2RCxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTtRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQTtRQUNqQixXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMscUNBQXFDO1FBQ3JFLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyw2QkFBNkI7UUFDdEUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUssQ0FBQTtRQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUE7SUFDckQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSTtRQUNBLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUssQ0FBQTtRQUN2QixJQUFJLFlBQWUsQ0FBQTtRQUNuQixRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlCLFlBQVksR0FBRyxDQUFDLENBQUE7WUFDaEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQzlCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNILFFBQVEsQ0FBQyxHQUFHLElBQXVCO0lBRW5DLENBQUM7Q0FDSjtBQW5DRCxnQ0FtQ0MifQ==
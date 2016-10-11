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
        smartsystem.addLazyModule(this);
    }
    /**
     * loads the module
     */
    load() {
        let done = q.defer();
        let loadedModule;
        systemjs.import(this.name).then((m) => {
            loadedModule = m;
            done.resolve(loadedModule);
        });
        return done.promise;
    }
    /**
     * loads additional lazy modules specified as arguments and returns them in the promise for easy use
     */
    loadAlso(...args) {
    }
}
exports.LazyModule = LazyModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsdUJBQXNCO0FBQ3RCLDZCQUErQjtBQUMvQixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7QUFFbEM7SUFBQTtRQUNJLGdCQUFXLEdBQUcsSUFBSSxlQUFTLEVBQWMsQ0FBQTtJQVU3QyxDQUFDO0lBUkc7O09BRUc7SUFDSCxhQUFhLENBQUMsYUFBeUI7UUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDdkMsQ0FBQztDQUdKO0FBRUQsa0NBQWtDO0FBQ2xDLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUE7QUFFbkM7O0dBRUc7QUFDSDtJQUdJLFlBQVksT0FBZSxFQUFFLE1BQU0sR0FBVyxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQ3ZELElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFBO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFBO1FBQ2pCLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSTtRQUNBLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUssQ0FBQTtRQUN2QixJQUFJLFlBQWUsQ0FBQTtRQUNuQixRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlCLFlBQVksR0FBRyxDQUFDLENBQUE7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUM5QixDQUFDLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNILFFBQVEsQ0FBQyxHQUFHLElBQXVCO0lBRW5DLENBQUM7Q0FDSjtBQTVCRCxnQ0E0QkMifQ==
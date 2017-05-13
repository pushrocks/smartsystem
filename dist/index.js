"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBCQUF1QjtBQUV2Qiw2QkFBNEI7QUFDNUIsdUJBQXNCO0FBQ3RCLDZCQUErQjtBQUUvQjtJQUFBO1FBQ0ksZ0JBQVcsR0FBRyxJQUFJLGVBQVMsRUFBbUIsQ0FBQTtJQVFsRCxDQUFDO0lBTkc7O09BRUc7SUFDSCxhQUFhLENBQUMsYUFBOEI7UUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDdkMsQ0FBQztDQUNKO0FBRUQsa0NBQWtDO0FBQ2xDLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUE7QUFRbkM7SUFPSSxZQUFZLE9BQWUsRUFBRSxNQUFjO1FBRjNDLFdBQU0sR0FBWSxLQUFLLENBQUE7UUFHbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFBO1FBQ3BFLENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTtRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQTtRQUNqQixXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMscUNBQXFDO1FBQ3JFLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyw2QkFBNkI7UUFDdEUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzlDLENBQUM7UUFDRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBSyxDQUFBO1FBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQTtJQUNyRCxDQUFDO0lBRUQsU0FBUyxDQUFDLFNBQWtCO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFBO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUk7UUFDQSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFLLENBQUE7UUFDdkIsSUFBSSxZQUFlLENBQUE7UUFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDOUIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ2xDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLFlBQVksR0FBRyxDQUFDLENBQUE7Z0JBQ2hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7Z0JBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDOUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDekMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtRQUN2QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsUUFBUSxDQUFDLEdBQUcsSUFBdUI7SUFFbkMsQ0FBQztDQUNKO0FBdERELGdDQXNEQyJ9
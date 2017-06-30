"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("typings-global");
const path = require("path");
const smartq = require("smartq");
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
        this.whenLoadedDeferred = smartq.defer();
        this.whenLoaded = this.whenLoadedDeferred.promise;
    }
    setLoader(loaderArg) {
        this.loader = loaderArg;
    }
    /**
     * loads the module
     */
    load() {
        let done = smartq.defer();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBCQUF1QjtBQUV2Qiw2QkFBNEI7QUFDNUIsaUNBQWdDO0FBQ2hDLDZCQUErQjtBQUUvQjtJQUFBO1FBQ0UsZ0JBQVcsR0FBRyxJQUFJLGVBQVMsRUFBbUIsQ0FBQTtJQVFoRCxDQUFDO0lBTkM7O09BRUc7SUFDSCxhQUFhLENBQUUsYUFBOEI7UUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDckMsQ0FBQztDQUNGO0FBRUQsa0NBQWtDO0FBQ2xDLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUE7QUFRbkM7SUFPRSxZQUFZLE9BQWUsRUFBRSxNQUFjO1FBRjNDLFdBQU0sR0FBWSxLQUFLLENBQUE7UUFHckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFBO1FBQ2xFLENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTtRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQTtRQUNqQixXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMscUNBQXFDO1FBQ3JFLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyw2QkFBNkI7UUFDdEUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVDLENBQUM7UUFDRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBSyxDQUFBO1FBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQTtJQUNuRCxDQUFDO0lBRUQsU0FBUyxDQUFFLFNBQWtCO1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFBO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUk7UUFDRixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFLLENBQUE7UUFDNUIsSUFBSSxZQUFlLENBQUE7UUFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzFCLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDNUIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ2xDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLFlBQVksR0FBRyxDQUFDLENBQUE7Z0JBQ2hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7Z0JBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDNUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdkMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtRQUNyQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsUUFBUSxDQUFFLEdBQUcsSUFBdUI7SUFFcEMsQ0FBQztDQUNGO0FBdERELGdDQXNEQyJ9
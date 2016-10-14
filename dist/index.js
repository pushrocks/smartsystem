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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQXVCO0FBRXZCLDZCQUE0QjtBQUM1Qix1QkFBc0I7QUFDdEIsNkJBQStCO0FBRS9CO0lBQUE7UUFDSSxnQkFBVyxHQUFHLElBQUksZUFBUyxFQUFtQixDQUFBO0lBUWxELENBQUM7SUFORzs7T0FFRztJQUNILGFBQWEsQ0FBQyxhQUE4QjtRQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0NBQ0o7QUFFRCxrQ0FBa0M7QUFDbEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQTtBQVFuQztJQU9JLFlBQVksT0FBZSxFQUFFLE1BQU0sR0FBVyxPQUFPLENBQUMsR0FBRyxFQUFFO1FBRjNELFdBQU0sR0FBWSxLQUFLLENBQUE7UUFHbkIsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUE7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUE7UUFDakIsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLHFDQUFxQztRQUNyRSxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsNkJBQTZCO1FBQ3RFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM5QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUssQ0FBQTtRQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUE7SUFDckQsQ0FBQztJQUVELFNBQVMsQ0FBQyxTQUFrQjtRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQTtJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJO1FBQ0EsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBSyxDQUFBO1FBQ3ZCLElBQUksWUFBZSxDQUFBO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN4QixZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQzlCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUNsQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixZQUFZLEdBQUcsQ0FBQyxDQUFBO2dCQUNoQixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO2dCQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQzlCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3pDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUE7UUFDdkMsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNILFFBQVEsQ0FBQyxHQUFHLElBQXVCO0lBRW5DLENBQUM7Q0FDSjtBQW5ERCxnQ0FtREMifQ==
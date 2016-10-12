/// <reference types="q" />
import 'typings-global';
import * as q from 'q';
/**
 * defines a LazyModule
 */
export declare class LazyModule<T> {
    name: string;
    nameIsPath: boolean;
    cwd: string;
    whenLoaded: q.Promise<T>;
    private whenLoadedDeferred;
    constructor(nameArg: string, cwdArg?: string);
    /**
     * loads the module
     */
    load(): q.Promise<T>;
    /**
     * loads additional lazy modules specified as arguments and returns them in the promise for easy use
     */
    loadAlso(...args: LazyModule<any>[]): void;
}

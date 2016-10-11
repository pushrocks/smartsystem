/// <reference types="q" />
import * as q from 'q';
/**
 * defines a LazyModule
 */
export declare class LazyModule<T> {
    name: string;
    cwd: string;
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

import 'typings-global';
/**
 * defines a LazyModule
 */
export declare type TLoader = 'npm' | 'systemjs';
export declare class LazyModule<T> {
    name: string;
    cwd: string;
    whenLoaded: Promise<T>;
    private nameIsPath;
    private whenLoadedDeferred;
    constructor(nameArg: string, cwdArg: string);
    /**
     * loads the module
     */
    load(): Promise<T>;
}

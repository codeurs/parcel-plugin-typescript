import TypescriptAsset from 'parcel-bundler/src/assets/TypeScriptAsset';
declare class TSAsset extends TypescriptAsset {
    private readonly config;
    constructor(name: string, options: any);
    parse(): Promise<any>;
    generateErrorMessage(err: any): any;
}
export = TSAsset;

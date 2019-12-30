import { Configuration } from '../../../backend/config-loader';
import { CompileResult } from '../../../interfaces';
import { JSAsset } from '../js-asset';
import TypescriptAsset from 'parcel-bundler/src/assets/TypeScriptAsset';
export interface TranspileAsset extends JSAsset {
    config: Promise<Configuration>;
    transpile(code: string): Promise<string>;
}
export declare class MakeTranspileAsset extends TypescriptAsset {
    readonly config: Promise<Configuration>;
    private readonly transpiler;
    constructor(name: string, options: any);
    parse(code: string): Promise<any>;
    transpile(code: string): Promise<string>;
}
export declare function processSourceMaps<T extends CompileResult['sources']>(asset: JSAsset, sources: T): T;

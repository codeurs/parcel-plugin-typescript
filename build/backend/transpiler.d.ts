import { CompileResult } from '../interfaces';
import { Configuration } from './config-loader';
export declare class Transpiler {
    private readonly compilerOptions;
    private readonly transformers;
    constructor({ typescript: { options }, plugin: { transformers } }: Configuration);
    transpile(code: string, fileName: string): CompileResult;
}

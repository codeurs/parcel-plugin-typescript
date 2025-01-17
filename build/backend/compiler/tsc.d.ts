import { CompileResult } from '../../interfaces';
import { Configuration } from '../config-loader';
export declare class TypeScriptCompiler {
    private readonly program;
    private readonly host;
    private readonly transformers;
    private firstRun;
    constructor({ typescript: { fileNames, options }, plugin: { transformers } }: Configuration);
    compile(path: string, reportErrors: boolean, root: string): CompileResult;
}

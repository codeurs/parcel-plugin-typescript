import { CompileRequest, CompileResult, Request, Response, TypeCheckResult } from '../../interfaces';
import { Server, Worker } from '../ipc';
export declare class TypeScriptWorker extends Worker<Request, Response> {
    constructor();
    compile(data: CompileRequest): Promise<CompileResult>;
    typeCheck(data: CompileRequest): Promise<TypeCheckResult>;
}
export declare class TypeScriptServer extends Server<Request, Response> {
    private readonly worker;
    constructor();
    close(): void;
}

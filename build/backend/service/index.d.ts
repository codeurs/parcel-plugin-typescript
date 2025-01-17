import * as ts from 'typescript';
import { TypeCheckResult } from '../../interfaces';
export declare class LanguageService {
    private readonly service;
    private readonly host;
    constructor(config: ts.ParsedCommandLine);
    check(path: string, reportErrors: boolean, root: string): TypeCheckResult;
}

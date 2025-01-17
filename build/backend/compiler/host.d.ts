import * as ts from 'typescript';
import { FileStore } from './store';
export declare class CompilerHost implements ts.CompilerHost {
    readonly store: FileStore;
    private readonly host;
    private setParentNodes;
    constructor(options: ts.CompilerOptions);
    getSourceFile(fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void): ts.SourceFile;
    getDefaultLibFileName(options: ts.CompilerOptions): string;
    readFile(fileName: string): string | undefined;
    writeFile(fileName: string, data: string): void;
    getCurrentDirectory(): string;
    getDirectories(path: string): string[];
    getCanonicalFileName(fileName: string): string;
    useCaseSensitiveFileNames(): boolean;
    getNewLine(): string;
    fileExists(path: string): boolean;
    private resolve;
}

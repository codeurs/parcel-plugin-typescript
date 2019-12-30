import * as ts from 'typescript';
export declare class LanguageServiceHost implements ts.LanguageServiceHost {
    fileExists: (path: string) => boolean;
    readFile: (path: string, encoding?: string | undefined) => string | undefined;
    readDirectory: (path: string, extensions?: readonly string[] | undefined, exclude?: readonly string[] | undefined, include?: readonly string[] | undefined, depth?: number | undefined) => string[];
    private readonly fileNames;
    private readonly files;
    private readonly options;
    constructor({ fileNames, options }: ts.ParsedCommandLine);
    invalidate(file: string): void;
    getScriptFileNames(): string[];
    getScriptVersion(fileName: string): string;
    getScriptSnapshot(fileName: string): ts.IScriptSnapshot | undefined;
    getCurrentDirectory(): string;
    getCompilationSettings(): ts.CompilerOptions;
    getDefaultLibFileName(projectOptions: ts.CompilerOptions): string;
}

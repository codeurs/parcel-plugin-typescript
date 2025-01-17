"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
const diagnostics_1 = require("../diagnostics");
const host_1 = require("./host");
// This should only be used for non-watch build
class TypeScriptCompiler {
    constructor({ typescript: { fileNames, options }, plugin: { transformers } }) {
        this.firstRun = true;
        const emitOptions = Object.assign({}, options, { noEmitOnError: false });
        this.host = new host_1.CompilerHost(emitOptions);
        this.program = ts.createProgram(fileNames, emitOptions, this.host);
        this.transformers = transformers;
    }
    compile(path, reportErrors, root) {
        const { program, transformers, host } = this;
        const diagnostics = [];
        if (this.firstRun) {
            this.firstRun = false;
            diagnostics.push(...program.getOptionsDiagnostics());
        }
        const sourceFile = program.getSourceFile(path);
        if (!sourceFile) {
            throw new Error(`Cannot find source file "${path}"`);
        }
        const result = program.emit(sourceFile, undefined, undefined, false, transformers);
        diagnostics.push(...result.diagnostics, ...program.getSemanticDiagnostics(sourceFile), ...program.getSyntacticDiagnostics(sourceFile));
        const formatted = diagnostics_1.formatDiagnostics(diagnostics, root);
        if (reportErrors && diagnostics.length > 0) {
            console.error(formatted);
        }
        const filePath = path.replace(/\.tsx?$/, '.js');
        const js = host.store.readFile(filePath);
        if (!js) {
            throw new Error(`Cannot find virtual file "${filePath}"`);
        }
        const sourceMap = host.store.readFile(filePath.replace(/\.js$/, '.js.map'));
        return {
            sources: { js, sourceMap },
            diagnostics: diagnostics.length > 0
                ? formatted
                : null
        };
    }
}
exports.TypeScriptCompiler = TypeScriptCompiler;
//# sourceMappingURL=tsc.js.map
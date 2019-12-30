"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
class Transpiler {
    constructor({ typescript: { options }, plugin: { transformers } }) {
        this.compilerOptions = options;
        this.transformers = transformers;
    }
    transpile(code, fileName) {
        const { compilerOptions, transformers } = this;
        const { outputText: js, sourceMapText: sourceMap } = ts.transpileModule(code, {
            compilerOptions, fileName, transformers
        });
        return {
            sources: { js, sourceMap },
            diagnostics: null
        };
    }
}
exports.Transpiler = Transpiler;
//# sourceMappingURL=transpiler.js.map
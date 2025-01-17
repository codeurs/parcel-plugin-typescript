"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
const diagnostics_1 = require("../diagnostics");
const host_1 = require("./host");
class LanguageService {
    constructor(config) {
        this.host = new host_1.LanguageServiceHost(config);
        this.service = ts.createLanguageService(this.host, ts.createDocumentRegistry());
    }
    check(path, reportErrors, root) {
        const { service } = this;
        this.host.invalidate(path);
        const diagnostics = [
            ...service.getSemanticDiagnostics(path),
            ...service.getSyntacticDiagnostics(path)
        ];
        const formatted = diagnostics_1.formatDiagnostics(diagnostics, root);
        if (reportErrors && diagnostics.length > 0) {
            diagnostics_1.reportDiagnostics(diagnostics, root);
        }
        return {
            diagnostics: diagnostics.length > 0
                ? formatted
                : null
        };
    }
}
exports.LanguageService = LanguageService;
//# sourceMappingURL=index.js.map
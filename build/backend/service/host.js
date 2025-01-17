"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
class LanguageServiceHost {
    constructor({ fileNames, options }) {
        this.fileExists = ts.sys.fileExists;
        this.readFile = ts.sys.readFile;
        this.readDirectory = ts.sys.readDirectory;
        this.files = {};
        this.options = options;
        this.fileNames = fileNames;
    }
    invalidate(file) {
        const entry = this.files[file];
        if (entry) {
            entry.version++;
        }
        else {
            this.files[file] = {
                version: 0
            };
        }
    }
    getScriptFileNames() {
        return this.fileNames;
    }
    getScriptVersion(fileName) {
        return this.files[fileName] && this.files[fileName].version.toString();
    }
    getScriptSnapshot(fileName) {
        if (!ts.sys.fileExists(fileName)) {
            return;
        }
        const content = ts.sys.readFile(fileName);
        if (content) {
            return ts.ScriptSnapshot.fromString(content);
        }
    }
    getCurrentDirectory() {
        return process.cwd();
    }
    getCompilationSettings() {
        return this.options;
    }
    getDefaultLibFileName(projectOptions) {
        return ts.getDefaultLibFilePath(projectOptions);
    }
}
exports.LanguageServiceHost = LanguageServiceHost;
//# sourceMappingURL=host.js.map
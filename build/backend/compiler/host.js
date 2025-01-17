"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
const store_1 = require("./store");
class CompilerHost {
    constructor(options) {
        this.store = store_1.FileStore.shared();
        this.setParentNodes = true;
        this.host = ts.createCompilerHost(options, this.setParentNodes);
    }
    getSourceFile(fileName, languageVersion, onError) {
        try {
            return this.store.readSource(fileName, languageVersion);
        }
        catch (err) {
            if (onError) {
                onError(err.message || err);
            }
            else {
                throw err;
            }
            return undefined;
        }
    }
    getDefaultLibFileName(options) {
        return this.host.getDefaultLibFileName(options);
    }
    readFile(fileName) {
        return this.store.readFile(fileName);
    }
    writeFile(fileName, data) {
        this.store.writeFile(fileName, data);
    }
    getCurrentDirectory() {
        return this.host.getCurrentDirectory();
    }
    getDirectories(path) {
        return this.store.getDirectories(path);
    }
    getCanonicalFileName(fileName) {
        return this.host.getCanonicalFileName(this.resolve(fileName));
    }
    useCaseSensitiveFileNames() {
        return this.host.useCaseSensitiveFileNames();
    }
    getNewLine() {
        return this.host.getNewLine();
    }
    fileExists(path) {
        return this.store.exists(path) || this.host.fileExists(path);
    }
    resolve(path) {
        return path;
    }
}
exports.CompilerHost = CompilerHost;
//# sourceMappingURL=host.js.map
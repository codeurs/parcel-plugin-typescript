"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = require("path");
const fs_1 = require("fs");
const ts = tslib_1.__importStar(require("typescript"));
class FileStore {
    constructor() {
        this.changedFiles = [];
        this.files = {};
        this.sources = {};
    }
    static shared() {
        let { sharedInstance } = this;
        if (sharedInstance) {
            return sharedInstance;
        }
        this.sharedInstance = sharedInstance = new FileStore();
        return sharedInstance;
    }
    exists(path) {
        return path in this.files;
    }
    readFile(path, onlyCache = false) {
        path = path.replace(/\\/g, '/');
        if (!path_1.isAbsolute(path)) {
            throw new Error('Path should be absolute');
        }
        const { files } = this;
        if (path in files) {
            return files[path];
        }
        const jsxPath = path + 'x';
        if (jsxPath in files) {
            return files[jsxPath];
        }
        let file = null;
        if (/\.ngfactory\.ts$/.test(path)) {
            file = files[path.replace(/\.ts$/, '.d.ts')];
            if (typeof file === 'string') {
                return file;
            }
        }
        if (onlyCache) {
            return;
        }
        try {
            file = fs_1.readFileSync(path, { encoding: 'utf-8' });
        }
        catch (_) {
            return;
        }
        files[path] = file;
        return file;
    }
    readSource(path, target) {
        let source = this.sources[path];
        if (source) {
            return source;
        }
        const file = this.readFile(path);
        if (typeof file !== 'string') {
            throw new Error(`Cannot find file ${path}`);
        }
        source = ts.createSourceFile(path, file, target, true);
        this.sources[path] = source;
        return source;
    }
    writeFile(path, contents) {
        if (!path_1.isAbsolute(path)) {
            throw new Error('Path should be absolute');
        }
        delete this.sources[path];
        this.files[path] = contents;
    }
    getDirectories(path = '/') {
        if (!path_1.isAbsolute(path)) {
            throw new Error('Path should be absolute');
        }
        return Object
            .keys(this.files)
            .filter(dir => dir.indexOf(path) === 0)
            .sort()
            .filter((item, index, dirs) => !index || item !== dirs[index - 1]);
    }
    invalidate(path) {
        this.changedFiles.push(path);
        if (path in this.files) {
            delete this.files[path];
            delete this.sources[path];
        }
    }
    getFiles(directory = '/') {
        return Object
            .keys(this.files)
            .filter(path => path.indexOf(directory) === 0);
    }
}
FileStore.sharedInstance = null;
exports.FileStore = FileStore;
//# sourceMappingURL=store.js.map
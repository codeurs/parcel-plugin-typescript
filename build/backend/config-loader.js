"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = require("path");
const ts = tslib_1.__importStar(require("typescript"));
const commentsJson = require("comment-json");
const findUp = require("find-up");
const resolveFrom = require("resolve-from");
const fs_1 = require("../utils/fs");
const paths_1 = require("./transformers/paths");
const configCache = {};
function loadConfiguration(path, rootDir) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const cached = Object.keys(configCache).find(cachePath => path.indexOf(cachePath) === 0);
        if (cached) {
            return configCache[cached];
        }
        const cwd = path_1.dirname(path);
        const configPath = yield findUp('tsconfig.json', { cwd });
        let tsconfig;
        if (!configPath) {
            tsconfig = {};
        }
        else {
            tsconfig = commentsJson.parse(yield fs_1.readFile(configPath));
        }
        // TODO: use the ParsedCommandLine for the type roots
        const { compilerOptions: { typeRoots } = {}, 'parcel-plugin-typescript': { transpileOnly = false, transformers } = {} } = tsconfig;
        if (typeRoots && Array.isArray(typeRoots)) {
            tsconfig.include = [
                ...(tsconfig.include || []),
                ...typeRoots.map((root) => `${root.replace(/(\/|\\)*$/, '')}/**/*`)
            ];
        }
        const base = configPath
            ? path_1.dirname(configPath)
            : rootDir;
        const typescript = ts.parseJsonConfigFileContent(tsconfig, ts.sys, base);
        const config = {
            typescript,
            plugin: {
                transpileOnly,
                transformers: getTransformerFactory(typescript.options, base, transformers)
            },
            path: configPath
        };
        let { options } = config.typescript;
        config.typescript.options = options = Object.assign({ module: ts.ModuleKind.CommonJS, moduleResolution: ts.ModuleResolutionKind.NodeJs }, options, { noEmit: false, outDir: undefined });
        return configCache[base] = config;
    });
}
exports.loadConfiguration = loadConfiguration;
function getTransformerFactory(options, dir, transformers) {
    const before = [paths_1.PathTransform(options, dir)];
    if (transformers === undefined) {
        return { before, after: [] };
    }
    if (typeof transformers !== 'string') {
        throw new Error('The transformers option should be a string');
    }
    const factoryPath = resolveFrom(dir, transformers);
    let factory = require(factoryPath);
    if (!factory) {
        throw new Error('Cannot import transformer factory');
    }
    if (factory.default) {
        factory = factory.default;
    }
    factory = factory();
    if (factory.before) {
        if (!Array.isArray(factory.before)) {
            throw new Error('Factory.before should be a TransformerFactory array');
        }
        before.push(...factory.before);
    }
    let after;
    if (factory.after) {
        if (!Array.isArray(factory.after)) {
            throw new Error('Factory.after should be a TransformerFactory array');
        }
        after = factory.after;
    }
    return { before, after };
}
//# sourceMappingURL=config-loader.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_loader_1 = require("../../../backend/config-loader");
const transpiler_1 = require("../../../backend/transpiler");
const TypeScriptAsset_1 = tslib_1.__importDefault(require("parcel-bundler/src/assets/TypeScriptAsset"));
class MakeTranspileAsset extends TypeScriptAsset_1.default {
    constructor(name, options) {
        super(name, options);
        this.config = config_loader_1.loadConfiguration(name, options.rootDir);
        this.transpiler = this.config.then(config => new transpiler_1.Transpiler(config));
    }
    parse(code) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.contents = yield this.transpile(code);
            // Parse result as ast format through babylon
            return _super.parse.call(this, this.contents);
        });
    }
    transpile(code) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const transpiler = yield this.transpiler;
            const { sources } = transpiler.transpile(code, this.name);
            return processSourceMaps(this, sources).js;
        });
    }
}
exports.MakeTranspileAsset = MakeTranspileAsset;
function processSourceMaps(asset, sources) {
    if (sources.sourceMap) {
        const sourceMapObject = JSON.parse(sources.sourceMap);
        sourceMapObject.sources = [asset.relativeName];
        sourceMapObject.sourcesContent = [asset.contents];
        asset.sourceMap = sourceMapObject;
        // Remove the source map URL
        sources.js = sources.js.substring(0, sources.js.lastIndexOf('//# sourceMappingURL'));
    }
    return sources;
}
exports.processSourceMaps = processSourceMaps;
//# sourceMappingURL=transpile.js.map
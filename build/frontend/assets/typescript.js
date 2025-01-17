"use strict";
const tslib_1 = require("tslib");
const config_loader_1 = require("../../backend/config-loader");
const client_1 = require("../../backend/worker/client");
const exports_1 = require("../../exports");
const TypeScriptAsset_1 = tslib_1.__importDefault(require("parcel-bundler/src/assets/TypeScriptAsset"));
class TSAsset extends TypeScriptAsset_1.default {
    constructor(name, options) {
        super(name, options);
        this.config = config_loader_1.loadConfiguration(name, options.rootDir);
    }
    parse() {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const config = yield this.config;
            const reportErrors = !config.typescript.options.noEmitOnError;
            const result = yield client_1.IPCClient.compile({
                file: this.name,
                rootDir: this.options.rootDir,
                reportErrors
            });
            if (!reportErrors) {
                const { diagnostics } = result;
                if (diagnostics) {
                    console.error(diagnostics);
                    // tslint:disable:no-string-throw
                    throw 'TypeScript errors were found while compiling';
                }
            }
            this.contents = exports_1.processSourceMaps(this, result.sources).js;
            // Parse result as ast format through babylon
            return _super.parse.call(this, this.contents);
        });
    }
    generateErrorMessage(err) {
        return err.stack || err.message || err;
    }
}
module.exports = TSAsset;
//# sourceMappingURL=typescript.js.map
"use strict";
const tslib_1 = require("tslib");
const client_1 = require("../../backend/worker/client");
const transpile_1 = require("./classes/transpile");
module.exports = function (name, options) {
    return new (class extends transpile_1.MakeTranspileAsset {
        transpile(code) {
            const _super = Object.create(null, {
                transpile: { get: () => super.transpile }
            });
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const config = yield this.config;
                const reportErrors = !config.typescript.options.noEmitOnError;
                const checkPromise = client_1.IPCClient.typeCheck({
                    file: this.name,
                    rootDir: this.options.rootDir,
                    reportErrors
                });
                if (!reportErrors) {
                    const { diagnostics } = yield checkPromise;
                    if (diagnostics) {
                        console.error(diagnostics);
                        // tslint:disable-next-line:no-string-throw
                        throw 'TypeScript errors were found while compiling';
                    }
                }
                return _super.transpile.call(this, code);
            });
        }
    })(name, options);
};
//# sourceMappingURL=forked.js.map
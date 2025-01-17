"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const filePath = process.argv[2];
// tslint:disable-next-line:no-var-requires
const handler = require(filePath);
process.on('message', (message) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const { id, method } = message;
    try {
        const result = yield handler[message.method](message.data);
        const response = {
            // don't quite understand how this type signature is supposed to
            // work (I think it's impossible to satisfy), so just cast to any.
            id, method, type: 'response', data: { result, error: null }
        };
        process.send(response);
    }
    catch (err) {
        const error = err ? (err.stack || err.message || err) : 'Unknown error';
        const response = {
            id, method, type: 'response', data: { error, result: null }
        };
        process.send(response);
    }
}));
//# sourceMappingURL=launcher.js.map
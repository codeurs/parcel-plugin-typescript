"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const child_process_1 = require("child_process");
const emitter_1 = require("../../../utils/emitter");
class Worker {
    constructor(path) {
        this.onMessage = new emitter_1.Emitter();
        this.child = child_process_1.fork(require.resolve('./launcher'), [path], {
            env: process.env
        });
        this.child.on('message', message => this.onMessage.emit(message));
    }
    request(method, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = Math.random().toString(36);
            const promise = this.onMessage.once(({ type, id: messageId }) => type === 'response' && messageId === id);
            const message = { id, method, data, type: 'request' };
            this.child.send(message);
            const result = yield promise;
            if (result.method !== method || result.type !== 'response') {
                throw new Error(`invariant error, received "${result.method}" response, expected "${method}"`);
            }
            if (result.data.error === null && result.data.result !== null) {
                return result.data.result;
            }
            throw new Error(result.data.error || 'Unknown error');
        });
    }
    kill() {
        this.child.kill();
    }
}
exports.Worker = Worker;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ipc_1 = require("../ipc");
class TypeScriptWorker extends ipc_1.Worker {
    constructor() {
        // We append the socket path to process.env beforce spawning the worker
        ipc_1.setSocketPath('typescript');
        super(require.resolve('./launcher'));
    }
    compile(data) {
        return this.request('compile', data);
    }
    typeCheck(data) {
        return this.request('typeCheck', data);
    }
}
tslib_1.__decorate([
    ipc_1.HandlerMethod
], TypeScriptWorker.prototype, "compile", null);
tslib_1.__decorate([
    ipc_1.HandlerMethod
], TypeScriptWorker.prototype, "typeCheck", null);
exports.TypeScriptWorker = TypeScriptWorker;
class TypeScriptServer extends ipc_1.Server {
    constructor() {
        const worker = new TypeScriptWorker();
        super('typescript', worker);
        this.worker = worker;
    }
    close() {
        this.worker.kill();
        super.close();
    }
}
exports.TypeScriptServer = TypeScriptServer;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ipc_1 = require("../ipc");
// This is when I dream about type introspection
exports.IPCClient = ipc_1.Client('typescript', [
    'compile', 'typeCheck'
]);
//# sourceMappingURL=client.js.map
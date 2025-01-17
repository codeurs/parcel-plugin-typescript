"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http = tslib_1.__importStar(require("http"));
const dynamic_1 = require("./dynamic");
function Client(name, keys) {
    const object = {};
    keys.forEach(key => object[key] = data => request(name, key, data));
    return object;
}
exports.Client = Client;
function request(name, endpoint, data) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const serialized = JSON.stringify({ data });
            const req = http.request({
                socketPath: dynamic_1.getSocketPath(name),
                path: `/${endpoint}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(serialized)
                }
            }, res => {
                const chunks = [];
                res
                    .setEncoding('utf8')
                    .on('end', () => {
                    const { error, result } = JSON.parse(chunks.join(''));
                    if (error) {
                        reject(new Error(error));
                    }
                    else {
                        resolve(result);
                    }
                })
                    .on('data', chunk => chunks.push(Buffer.isBuffer(chunk)
                    ? chunk.toString('utf-8')
                    : chunk));
            });
            req.on('error', reject);
            req.write(serialized);
            req.end();
        });
    });
}
//# sourceMappingURL=client.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bodyParser = require("body-parser");
const express = require("express");
const dynamic_1 = require("./dynamic");
const handler_1 = require("./handler");
class Server {
    constructor(name, handler) {
        this.app = express();
        const app = this.app.use(bodyParser.json({ limit: '10mb' }));
        handler_1.getHandlerMethods(handler).forEach(method => app.post(`/${method}`, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield handler[method](req.body.data);
                res.json({ result });
            }
            catch (error) {
                const message = error && (error.stack || error.message || error);
                res.json({
                    error: typeof message === 'string' ? message : 'Unknown error'
                });
                return;
            }
        })));
        this.server = app
            .listen(dynamic_1.setSocketPath(name))
            .on('error', err => console.error(err));
    }
    close() {
        this.server.close();
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map
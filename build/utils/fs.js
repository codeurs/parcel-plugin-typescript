"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { encoding: 'utf-8' }, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
exports.readFile = readFile;
//# sourceMappingURL=fs.js.map
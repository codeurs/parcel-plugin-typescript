"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const os_1 = require("os");
const code_frame_1 = require("@babel/code-frame");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const normalizePath = require("normalize-path");
const ts = tslib_1.__importStar(require("typescript"));
function formatDiagnostics(diagnostics, context) {
    return diagnostics.map(diagnostic => {
        const messageText = formatDiagnosticMessage(diagnostic.messageText, '', context);
        const { file } = diagnostic;
        let message = messageText;
        if (file != null && diagnostic.start != null) {
            const lineChar = file.getLineAndCharacterOfPosition(diagnostic.start);
            const source = file.text || diagnostic.source;
            const start = {
                line: lineChar.line + 1,
                column: lineChar.character + 1
            };
            const location = { start };
            const red = chalk_1.default.red(`🚨  ${file.fileName}(${start.line},${start.column})`);
            const messages = [`${red}\n${chalk_1.default.redBright(messageText)}`];
            if (source != null) {
                if (typeof diagnostic.length === 'number') {
                    const end = file.getLineAndCharacterOfPosition(diagnostic.start + diagnostic.length);
                    location.end = {
                        line: end.line + 1,
                        column: end.character + 1
                    };
                }
                const frame = code_frame_1.codeFrameColumns(source, location, {
                    linesAbove: 1,
                    linesBelow: 1,
                    highlightCode: true
                });
                messages.push(frame
                    .split('\n')
                    .map(str => `  ${str}`)
                    .join('\n'));
            }
            message = messages.join('\n');
        }
        return message + os_1.EOL;
    }).join(os_1.EOL) + os_1.EOL;
}
exports.formatDiagnostics = formatDiagnostics;
function formatDiagnosticMessage(diagnostic, delimiter, context) {
    const contextPath = normalizePath(context);
    return ts
        .flattenDiagnosticMessageText(diagnostic, delimiter)
        .replace(new RegExp(contextPath, 'g'), '.');
}
//# sourceMappingURL=format.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
const ts = tslib_1.__importStar(require("typescript"));
const resolver_1 = require("../modules/resolver");
// TODO: use options from the TransformationContext
function PathTransform(options, baseDir) {
    return function (context) {
        return (node) => {
            if (options.baseUrl) {
                ts.visitEachChild(node, child => {
                    if (ts.isImportDeclaration(child)) {
                        const specifier = child.moduleSpecifier;
                        if (!ts.isStringLiteral(specifier)) {
                            throw new Error('Expected child.moduleSpecifier to be StringLiteral');
                        }
                        let resolved = resolve(specifier.text, baseDir, options);
                        if (path.isAbsolute(resolved)) {
                            const sourceDir = path.dirname(node.fileName);
                            resolved = path.relative(sourceDir, resolved);
                            if (!/^\./.test(resolved)) {
                                resolved = `./${resolved}`;
                            }
                        }
                        child.moduleSpecifier = ts.createLiteral(resolved);
                        return child;
                    }
                    return undefined;
                }, context);
            }
            return node;
        };
    };
}
exports.PathTransform = PathTransform;
function resolve(modulePath, baseDir, { paths, baseUrl }) {
    if (!baseUrl) {
        return modulePath;
    }
    let resolved = resolver_1.findModule(path.resolve(baseUrl, modulePath));
    if (resolved) {
        return resolved;
    }
    if (paths) {
        const mappings = Object
            .keys(paths)
            .map(alias => getPathMappings(alias, paths[alias], baseDir, baseUrl))
            .reduce((a, b) => a.concat(b), [])
            .filter(mapping => mapping.pattern.test(modulePath));
        for (const mapping of mappings) {
            const local = modulePath.match(mapping.pattern)[1];
            resolved = resolver_1.findModule(mapping.target.replace(/\*/, local));
            if (resolved !== null) {
                return resolved;
            }
        }
    }
    return modulePath;
}
function getPathMappings(alias, targets, baseDir, baseUrl = '.') {
    const absoluteBase = path.resolve(baseDir, baseUrl);
    const moduleOnly = alias.indexOf('*') === -1;
    const escaped = escapeRegExp(alias);
    return targets.map(relativeTarget => {
        const target = path.resolve(absoluteBase, relativeTarget);
        let pattern;
        if (moduleOnly) {
            pattern = new RegExp(`^${escaped}$`);
        }
        else {
            const withStarCapturing = escaped.replace('\\*', '(.*)');
            pattern = new RegExp(`^${withStarCapturing}`);
        }
        return {
            moduleOnly, alias, pattern, target
        };
    });
}
function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
//# sourceMappingURL=paths.js.map
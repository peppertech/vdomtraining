define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isShallowEqual = exports.normalizeValue = exports.treatNull = exports.createMessageFromError = void 0;
    function createMessageFromError(error) {
        if (typeof error.getMessage === 'function') {
            return {
                severity: 'error',
                detail: error.getMessage().detail
            };
        }
        return { severity: 'error', detail: error.message };
    }
    exports.createMessageFromError = createMessageFromError;
    function treatNull(value, defaultValue) {
        if (value === null) {
            return defaultValue;
        }
        return value;
    }
    exports.treatNull = treatNull;
    function normalizeValue(value) {
        if (typeof value === 'string' && value === '') {
            return null;
        }
        return value;
    }
    exports.normalizeValue = normalizeValue;
    const isShallowEqual = (a, b) => a === b || (a.length === b.length && a.every((v, i) => v === b[i]));
    exports.isShallowEqual = isShallowEqual;
});

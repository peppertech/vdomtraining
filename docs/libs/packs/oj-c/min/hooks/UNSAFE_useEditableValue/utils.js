define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.treatNull = exports.normalizeValue = exports.isShallowEqual = exports.hasErrorMessages = exports.getVirtualKeyboardHintFromConverter = exports.createMessageFromError = void 0;
    const createMessageFromError = (error) => {
        if (typeof error.getMessage === 'function') {
            return {
                severity: 'error',
                detail: error.getMessage().detail
            };
        }
        return { severity: 'error', detail: error.message };
    };
    exports.createMessageFromError = createMessageFromError;
    const treatNull = (value, defaultValue) => {
        if (value === null) {
            return defaultValue;
        }
        return value;
    };
    exports.treatNull = treatNull;
    const normalizeValue = (value) => {
        if (typeof value === 'string' && value === '') {
            return null;
        }
        return value;
    };
    exports.normalizeValue = normalizeValue;
    const isShallowEqual = (a, b) => a === b || (a.length === b.length && a.every((v, i) => v === b[i]));
    exports.isShallowEqual = isShallowEqual;
    const hasErrorMessages = (messages) => {
        return !!messages && messages.some((message) => message.severity === 'error');
    };
    exports.hasErrorMessages = hasErrorMessages;
    const getVirtualKeyboardHintFromConverter = (converter) => {
        let virtualKeyboardHint;
        if (converter && converter.resolvedOptions) {
            const resOptions = converter.resolvedOptions();
            virtualKeyboardHint = resOptions?.virtualKeyboardHint ?? 'text';
        }
        else {
            virtualKeyboardHint = 'text';
        }
        return virtualKeyboardHint;
    };
    exports.getVirtualKeyboardHintFromConverter = getVirtualKeyboardHintFromConverter;
});

define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.format = format;
    exports.parse = parse;
    function parse(displayValue, converter, translateConverterParseError) {
        if (displayValue === undefined) {
            return { result: 'success', value: null };
        }
        if (shouldSkipParse(displayValue)) {
            return { result: 'success', value: displayValue };
        }
        try {
            return {
                result: 'success',
                value: converter.parse(displayValue)
            };
        }
        catch (error) {
            const message = translateConverterParseError?.(error) ?? (0, utils_1.createMessageFromError)(error);
            return {
                result: 'failure',
                error: message
            };
        }
    }
    function format(value, defaultValue, converter) {
        if (shouldSkipFormat(value)) {
            return { result: 'success', value: defaultValue };
        }
        try {
            return {
                result: 'success',
                value: converter.format(value)
            };
        }
        catch (error) {
            return {
                result: 'failure',
                error: (0, utils_1.createMessageFromError)(error)
            };
        }
    }
    function shouldSkipParse(value) {
        return value === '' || value === null;
    }
    function shouldSkipFormat(value) {
        return value === null;
    }
});

define(["require", "exports", "preact/hooks", "../utils/utils"], function (require, exports, hooks_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useConverterObject = exports.ConverterErrorSymbol = void 0;
    exports.ConverterErrorSymbol = Symbol('ConverterError');
    function useConverterObject({ componentMessagingState, validationState, converter }) {
        const parse = (0, hooks_1.useCallback)((displayValue) => {
            if (displayValue === undefined) {
                return null;
            }
            try {
                return converter.parse(displayValue);
            }
            catch (error) {
                const errorMsg = (0, utils_1.createMessageFromError)(error);
                componentMessagingState.setComponentMessages([errorMsg]);
                validationState.setValid('invalidShown');
                return exports.ConverterErrorSymbol;
            }
        }, [converter, componentMessagingState, validationState]);
        const format = (0, hooks_1.useCallback)((value, shouldSuppressError = false) => {
            if (value === null) {
                return undefined;
            }
            try {
                return converter.format(value);
            }
            catch (error) {
                if (!shouldSuppressError) {
                    componentMessagingState.setComponentMessages([(0, utils_1.createMessageFromError)(error)]);
                    validationState.setValid('invalidShown');
                }
                return value;
            }
        }, [componentMessagingState, converter, validationState]);
        return (0, hooks_1.useMemo)(() => ({
            format,
            parse
        }), [format, parse]);
    }
    exports.useConverterObject = useConverterObject;
});

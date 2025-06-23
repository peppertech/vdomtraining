define(["require", "exports", "ojs/ojconverter-nativenumber", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "../utils/utils"], function (require, exports, ojconverter_nativenumber_1, hooks_1, UNSAFE_useTranslationBundle_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useConverter = exports.ConverterErrorSymbol = void 0;
    exports.ConverterErrorSymbol = Symbol('ConverterError');
    function shouldSkipParse(value) {
        return value === '' || value === null;
    }
    function shouldSkipFormat(value) {
        return value === null;
    }
    function useConverter({ componentMessagingState, validationState, converter }) {
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const converterParseError = translations.inputNumber_converterParseError();
        const parse = (0, hooks_1.useCallback)((displayValue) => {
            if (!converter || shouldSkipParse(displayValue)) {
                return displayValue;
            }
            try {
                return converter.parse(displayValue);
            }
            catch (error) {
                const errorMsg = error?.cause === ojconverter_nativenumber_1.USER_INPUT_ERROR
                    ? {
                        severity: 'error',
                        detail: converterParseError
                    }
                    : (0, utils_1.createMessageFromError)(error);
                componentMessagingState.setComponentMessages([errorMsg]);
                validationState.setValid('invalidShown');
                return exports.ConverterErrorSymbol;
            }
        }, [converter, componentMessagingState, validationState]);
        const format = (0, hooks_1.useCallback)((value, shouldSuppressError = false) => {
            if (!converter || shouldSkipFormat(value)) {
                return (0, utils_1.treatNull)(value, '') ?? '';
            }
            try {
                return converter.format(value);
            }
            catch (error) {
                if (!shouldSuppressError) {
                    componentMessagingState.setComponentMessages([(0, utils_1.createMessageFromError)(error)]);
                    validationState.setValid('invalidShown');
                }
                return (0, utils_1.treatNull)(value, '');
            }
        }, [converter, componentMessagingState, validationState]);
        return (0, hooks_1.useMemo)(() => ({
            format,
            parse
        }), [format, parse]);
    }
    exports.useConverter = useConverter;
});

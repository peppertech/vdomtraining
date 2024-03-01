define(["require", "exports", "ojs/ojvalidator-required", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle"], function (require, exports, RequiredValidator, hooks_1, UNSAFE_useTranslationBundle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useDeferredValidators = void 0;
    function useDeferredValidators({ labelHint, required, requiredMessageDetail: propRequiredMessageDetail }) {
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const requiredMessageDetail = propRequiredMessageDetail || translations.formControl_requiredMessageDetail();
        const requiredValidator = (0, hooks_1.useMemo)(() => {
            if (required) {
                return new RequiredValidator({
                    label: labelHint,
                    messageDetail: requiredMessageDetail
                });
            }
            return null;
        }, [required]);
        return (0, hooks_1.useMemo)(() => [requiredValidator].filter(Boolean), [requiredValidator]);
    }
    exports.useDeferredValidators = useDeferredValidators;
});

define(["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext"], function (require, exports, UNSAFE_useFormContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useMergedFormContext = useMergedFormContext;
    function useMergedFormContext({ propContainerReadonly, propLabelWrapping, propReadonly, propUserAssistanceDensity }) {
        const formContext = (0, UNSAFE_useFormContext_1.useFormContext)();
        const uadValue = propUserAssistanceDensity ?? formContext.userAssistanceDensity;
        const readonlyValue = propReadonly ?? formContext.isReadonly;
        const { isFormLayout: formContextIsFormLayout, isReadonly: formContextIsReadonly, labelWrapping: formContextLabelWrapping, ...otherFormContextProps } = formContext;
        const containerProps = {
            ...otherFormContextProps,
            isFormLayout: propContainerReadonly !== undefined || formContextIsFormLayout,
            isReadonly: propContainerReadonly ?? formContextIsReadonly,
            labelWrapping: propLabelWrapping ?? formContextLabelWrapping
        };
        return {
            containerProps,
            readonlyValue,
            uadValue
        };
    }
});

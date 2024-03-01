define(["require", "exports", "preact/hooks", "../utils/utils"], function (require, exports, hooks_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useWrapValueState = void 0;
    function useWrapValueState({ arItemContexts, isLoading, preactValueItems, setPreactValueItems }) {
        const getValueForValidationFunc = (0, hooks_1.useCallback)((valueForValidation) => {
            return (valid) => {
                if (valid === 'invalidShown' && !isLoading) {
                    return (0, utils_1.isEmpty)(preactValueItems) ? null : valueForValidation;
                }
                return valueForValidation;
            };
        }, [isLoading, preactValueItems]);
        const refreshDisplayValue = (0, hooks_1.useCallback)(() => {
            setPreactValueItems(arItemContexts);
        }, [arItemContexts]);
        const wrapValueState = (0, hooks_1.useCallback)((valueState) => {
            return {
                ...valueState,
                getValueForValidation: getValueForValidationFunc(valueState.value),
                refreshDisplayValue
            };
        }, [getValueForValidationFunc, refreshDisplayValue]);
        return { wrapValueState };
    }
    exports.useWrapValueState = useWrapValueState;
});

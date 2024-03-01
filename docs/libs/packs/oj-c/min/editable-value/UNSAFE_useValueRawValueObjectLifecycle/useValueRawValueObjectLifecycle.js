define(["require", "exports", "preact/hooks", "../UNSAFE_useValidators/useValidators"], function (require, exports, hooks_1, useValidators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useValueRawValueObjectLifecycle = void 0;
    function useValueRawValueObjectLifecycle({ value, valueState, format, validateValueOnExternalChange }) {
        const previousValueRef = (0, hooks_1.useRef)(value);
        (0, hooks_1.useEffect)(() => {
            const { value, setDisplayValue } = valueState;
            setDisplayValue(format(value));
        }, []);
        (0, hooks_1.useEffect)(() => {
            if (previousValueRef.current === value) {
                return;
            }
            previousValueRef.current = value;
            if (value !== undefined && value !== valueState.value) {
                const { setDisplayValue, setValue } = valueState;
                const validationResult = validateValueOnExternalChange(value);
                if (validationResult === useValidators_1.ValidationResult.VALID) {
                    setValue(value);
                    setDisplayValue(format(value));
                }
            }
        }, [format, value, valueState]);
    }
    exports.useValueRawValueObjectLifecycle = useValueRawValueObjectLifecycle;
});

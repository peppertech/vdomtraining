define(["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useUncontrolledState", "preact/hooks", "../utils/utils"], function (require, exports, UNSAFE_useUncontrolledState_1, hooks_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useValue = void 0;
    function useValue({ value: valueProp, format, parse, onRawValueChanged, onTransientValueChanged, onValueChanged }) {
        const [displayValue, setDisplayValue] = (0, UNSAFE_useUncontrolledState_1.useUncontrolledState)(format(valueProp, true), onRawValueChanged);
        const [value, setValue] = (0, UNSAFE_useUncontrolledState_1.useUncontrolledState)(valueProp, onValueChanged);
        (0, hooks_1.useEffect)(() => {
            if (displayValue !== undefined) {
                onRawValueChanged?.(displayValue);
            }
        }, []);
        const [transientValue, setTransientValue] = (0, UNSAFE_useUncontrolledState_1.useUncontrolledState)(valueProp, onTransientValueChanged);
        (0, hooks_1.useEffect)(() => {
            if (valueProp !== undefined) {
                onTransientValueChanged?.(valueProp);
            }
        }, []);
        return {
            displayValue,
            transientValue,
            value,
            getValueForValidation: (0, hooks_1.useCallback)((valid) => {
                if (valid !== 'invalidShown') {
                    return value;
                }
                return parse((0, utils_1.normalizeValue)(displayValue));
            }, [displayValue, value, parse]),
            setValueAfterValidation: (0, hooks_1.useCallback)((value) => {
                setValue(value);
                setDisplayValue(format(value));
            }, [format]),
            setDisplayValue,
            setTransientValue,
            setValue,
            refreshDisplayValue: (0, hooks_1.useCallback)(() => {
                setDisplayValue(format(value));
            }, [value, format])
        };
    }
    exports.useValue = useValue;
});

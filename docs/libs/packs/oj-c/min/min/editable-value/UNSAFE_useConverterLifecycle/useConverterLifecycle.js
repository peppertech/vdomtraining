define(["require", "exports", "preact/hooks"], function (require, exports, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useConverterLifecycle = void 0;
    function useConverterLifecycle({ converter, validationState, refreshDisplayValue, runFullValidationAndUpdateValue }) {
        const prevConverterRef = (0, hooks_1.useRef)(converter);
        (0, hooks_1.useEffect)(() => {
            if (prevConverterRef.current === converter) {
                return;
            }
            prevConverterRef.current = converter;
            const { valid } = validationState;
            switch (valid) {
                case 'invalidShown':
                    runFullValidationAndUpdateValue();
                    break;
                case 'valid':
                case 'invalidHidden':
                default:
                    refreshDisplayValue();
                    break;
            }
        }, [converter, validationState, refreshDisplayValue, runFullValidationAndUpdateValue]);
    }
    exports.useConverterLifecycle = useConverterLifecycle;
});

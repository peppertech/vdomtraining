define(["require", "exports", "ojs/ojconverter-nativenumber", "preact/hooks"], function (require, exports, ojconverter_nativenumber_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useImplicitNumberConverter = void 0;
    function useImplicitNumberConverter({ converter }) {
        const implicitConverter = (0, hooks_1.useMemo)(() => {
            return converter ?? new ojconverter_nativenumber_1.NumberConverter();
        }, [converter]);
        return implicitConverter;
    }
    exports.useImplicitNumberConverter = useImplicitNumberConverter;
});

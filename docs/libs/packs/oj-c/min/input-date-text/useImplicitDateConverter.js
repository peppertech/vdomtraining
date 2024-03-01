define(["require", "exports", "preact/hooks", "ojs/ojconverter-localdate"], function (require, exports, hooks_1, ojconverter_localdate_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useImplicitDateConverter = void 0;
    function useImplicitDateConverter({ converter }) {
        const implicitConverter = (0, hooks_1.useMemo)(() => {
            return converter ?? new ojconverter_localdate_1.LocalDateConverter({ dateStyle: 'short' });
        }, [converter]);
        return implicitConverter;
    }
    exports.useImplicitDateConverter = useImplicitDateConverter;
});

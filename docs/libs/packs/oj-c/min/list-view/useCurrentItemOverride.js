define(["require", "exports", "preact/hooks"], function (require, exports, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useCurrentItemOverride = void 0;
    const useCurrentItemOverride = (currentItemOverride) => {
        const preactOverrideRef = (0, hooks_1.useRef)();
        const [, setInternalOverride] = (0, hooks_1.useState)();
        const updateCurrentItemOverride = (0, hooks_1.useCallback)((key) => {
            setInternalOverride({ rowKey: key });
            preactOverrideRef.current = { rowKey: key };
        }, []);
        const appOverrideRef = (0, hooks_1.useRef)();
        if (appOverrideRef.current !== currentItemOverride) {
            appOverrideRef.current = currentItemOverride;
            preactOverrideRef.current = currentItemOverride;
        }
        return {
            preactCurrentItemOverride: preactOverrideRef.current,
            updateCurrentItemOverride
        };
    };
    exports.useCurrentItemOverride = useCurrentItemOverride;
});

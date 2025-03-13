define(["require", "exports", "preact/hooks", "ojs/ojcontext"], function (require, exports, hooks_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useVisBusyState = useVisBusyState;
    function useVisBusyState(rootRef, baseDescription = '') {
        const addBusyState = (0, hooks_1.useCallback)((description) => {
            if (rootRef.current) {
                const busyContext = Context.getContext(rootRef.current).getBusyContext();
                return busyContext.addBusyState({ description: `${baseDescription}${description}` });
            }
            return () => { };
        }, [baseDescription, rootRef]);
        const busyStateContext = (0, hooks_1.useMemo)(() => ({ addBusyState }), [addBusyState]);
        return busyStateContext;
    }
});

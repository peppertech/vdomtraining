define(["require", "exports", "preact/hooks"], function (require, exports, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useHandleRemoveCurrentKey = void 0;
    function useHandleRemoveCurrentKey(dataState, currentKey, onChange) {
        const prevDataState = (0, hooks_1.useRef)();
        (0, hooks_1.useEffect)(() => {
            const oldDataState = prevDataState.current;
            if (currentKey &&
                onChange &&
                oldDataState &&
                dataState &&
                oldDataState.offset === dataState.offset &&
                oldDataState !== dataState) {
                const newKeys = dataState.data.map((dataMetadata) => {
                    return dataMetadata.metadata.key;
                });
                if (newKeys.indexOf(currentKey) === -1) {
                    const oldKeys = oldDataState?.data.map((dataMetadata) => {
                        return dataMetadata.metadata.key;
                    });
                    let index = oldKeys.indexOf(currentKey);
                    if (index > -1) {
                        const backward = index === oldKeys.length - 1;
                        while (index >= 0 && index < oldKeys.length) {
                            index = backward ? index - 1 : index + 1;
                            const newCurrentKey = oldKeys[index];
                            if (newKeys.indexOf(newCurrentKey) > -1) {
                                onChange({ value: newCurrentKey });
                                break;
                            }
                        }
                    }
                }
            }
            prevDataState.current = dataState;
        }, [dataState, currentKey, onChange]);
    }
    exports.useHandleRemoveCurrentKey = useHandleRemoveCurrentKey;
});

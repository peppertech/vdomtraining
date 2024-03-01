define(["require", "exports", "ojs/ojdataproviderfactory", "preact/hooks"], function (require, exports, ojdataproviderfactory_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useWrapDataProvider = void 0;
    function useWrapDataProvider(data) {
        const dataProvider = (0, hooks_1.useMemo)(() => {
            return data
                ? (0, ojdataproviderfactory_1.getEnhancedDataProvider)(data, {
                    fetchFirst: { caching: 'visitedByCurrentIterator' }
                })
                : data;
        }, [data]);
        return dataProvider;
    }
    exports.useWrapDataProvider = useWrapDataProvider;
});

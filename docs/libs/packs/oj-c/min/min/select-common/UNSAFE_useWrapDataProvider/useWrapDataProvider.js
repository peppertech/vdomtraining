define(["require", "exports", "ojs/ojdataproviderfactory", "preact/hooks", "../PRIVATE_DebouncingDataProviderView/DebouncingDataProviderView"], function (require, exports, ojdataproviderfactory_1, hooks_1, DebouncingDataProviderView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useWrapDataProvider = useWrapDataProvider;
    function useWrapDataProvider(data) {
        const dataProvider = (0, hooks_1.useMemo)(() => {
            if (!data) {
                return data;
            }
            const enhancedDP = (0, ojdataproviderfactory_1.getEnhancedDataProvider)(data, {
                fetchFirst: { caching: 'visitedByCurrentIterator' }
            });
            const filterCapability = enhancedDP.getCapability('fetchFirst');
            const isImmediate = filterCapability?.iterationSpeed === 'immediate';
            return isImmediate ? enhancedDP : new DebouncingDataProviderView_1.DebouncingDataProviderView(enhancedDP);
        }, [data]);
        return dataProvider;
    }
});

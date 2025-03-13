define(["require", "exports", "oj-c/hooks/UNSAFE_useListData/useListData", "preact/hooks", "../UNSAFE_useWrapDataProvider/index", "./useCollectionTemplateDataProviderView"], function (require, exports, useListData_1, hooks_1, index_1, useCollectionTemplateDataProviderView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useSelectData = void 0;
    const noOp = () => { };
    const useSelectData = ({ data, dataStateOverride: propDataStateOverride, filterCriterion, hasCollectionTemplate }) => {
        const dataProvider = (0, index_1.useWrapDataProvider)(data);
        const [listDataState, onLoadRange] = (0, useListData_1.useListData)(dataProvider ?? null, {
            filterCriterion,
            initialRowsFetched: 0
        });
        const dataStateOverride = (0, hooks_1.useMemo)(() => (propDataStateOverride ? { status: 'success', data: propDataStateOverride } : undefined), [propDataStateOverride]);
        const { dataState: templateDataState, dataProvider: templateDataProvider } = (0, useCollectionTemplateDataProviderView_1.useCollectionTemplateDataProviderView)({
            dataProvider,
            options: { dataStateOverride, filterCriterion }
        });
        return {
            dataProvider: hasCollectionTemplate ? templateDataProvider : dataProvider,
            dataState: hasCollectionTemplate ? dataStateOverride ?? templateDataState : listDataState,
            onLoadRange: hasCollectionTemplate ? noOp : onLoadRange
        };
    };
    exports.useSelectData = useSelectData;
});

define(["require", "exports", "../UNSAFE_useDataProvider/useDataProvider", "./dataUtil"], function (require, exports, useDataProvider_1, dataUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useChartData = void 0;
    function useChartData(dataProvider, addBusyState, itemTemplate, seriesTemplate, groupTemplate, itemElementName, seriesElementName, groupElementName, seriesComparator, groupComparator) {
        const { data } = (0, useDataProvider_1.useDataProvider)({
            data: dataProvider,
            addBusyState
        });
        const { series, groups } = (0, dataUtil_1.createGroupsAndSeries)(data, itemTemplate, seriesTemplate, groupTemplate, itemElementName, seriesElementName, groupElementName, seriesComparator, groupComparator);
        const getDataItem = (seriesIndex, groupIndex) => {
            const seriesItems = series[seriesIndex]['items'];
            return seriesItems[groupIndex];
        };
        return { series, groups, getDataItem };
    }
    exports.useChartData = useChartData;
});

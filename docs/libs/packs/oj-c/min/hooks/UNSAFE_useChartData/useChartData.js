define(["require", "exports", "./dataUtil", "../PRIVATE_useVisData/useVisData"], function (require, exports, dataUtil_1, useVisData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useChartData = useChartData;
    function useChartData(dataProvider, addBusyState, itemTemplate, seriesTemplate, groupTemplate, itemElementName, seriesElementName, groupElementName, seriesComparator, groupComparator) {
        const { data, isLoading } = (0, useVisData_1.useVisData)({
            dataProvider,
            addBusyState
        });
        const { series, groups } = (0, dataUtil_1.createGroupsAndSeries)(data, itemTemplate, seriesTemplate, groupTemplate, itemElementName, seriesElementName, groupElementName, seriesComparator, groupComparator);
        const idToDPItemMap = new Map(data.map((item) => [item.key, item.data]));
        const getDataItem = (seriesIndex, groupIndex) => {
            const seriesItems = series[seriesIndex]['items'];
            return seriesItems[groupIndex];
        };
        return { series, groups, getDataItem, isLoading, idToDPItemMap };
    }
});

define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getChartEventsHandler = exports.getIdFromDetail = void 0;
    const getItemDrillDetail = (series, groups, detail) => {
        const data = series[detail.seriesIndex];
        const group = groups[detail.groupIndex].id;
        const groupData = groups[detail.groupIndex];
        const id = detail.id;
        const itemData = series[detail.seriesIndex]['items'];
        const seriesId = series[detail.seriesIndex]['id'];
        const seriesData = series[detail.seriesIndex];
        const itemObj = { data, group, groupData, id, itemData, seriesId, seriesData };
        return itemObj;
    };
    const getGroupDrillDetail = (series, groups, detail) => {
        const group = groups[detail.groupIndex].id;
        const groupData = groups[detail.groupIndex];
        const id = detail.id;
        const items = series[detail.groupIndex]['items'];
        const groupObj = { group, groupData, id, items };
        return groupObj;
    };
    const getSeriesDrillDetail = (series, detail) => {
        const { itemIndex } = detail;
        return {
            id: series[itemIndex]['id'],
            items: series[itemIndex]['items'],
            series: series[itemIndex]['id'],
            seriesData: series
        };
    };
    function getIdFromDetail(detail, series, getDataItem) {
        const { seriesIndex, groupIndex } = detail;
        if (seriesIndex === undefined) {
            return;
        }
        if (groupIndex === undefined) {
            return series[seriesIndex]['id'];
        }
        return getDataItem(seriesIndex, groupIndex).id;
    }
    exports.getIdFromDetail = getIdFromDetail;
    const getChartEventsHandler = (series, groups, drilling, onOjItemDrill, onOjGroupDrill, onOjSeriesDrill) => {
        const itemDrillHandler = (detail) => {
            if (drilling === 'on') {
                onOjItemDrill?.(getItemDrillDetail(series, groups, detail));
            }
        };
        const groupDrillHandler = (detail) => {
            if (drilling === 'on' || drilling === 'groupsOnly') {
                onOjGroupDrill?.(getGroupDrillDetail(series, groups, detail));
            }
        };
        const seriesDrillHandler = (detail) => {
            if (drilling === 'seriesOnly' || drilling === 'on') {
                onOjSeriesDrill?.(getSeriesDrillDetail(series, detail));
            }
        };
        return {
            itemDrillHandler,
            groupDrillHandler,
            seriesDrillHandler
        };
    };
    exports.getChartEventsHandler = getChartEventsHandler;
});

define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LegendDefaults = void 0;
    exports.getLegendData = getLegendData;
    exports.getBLACCategoriesItems = getBLACCategoriesItems;
    exports.LegendDefaults = {
        rendered: 'off',
        position: 'auto'
    };
    function getLegendData(series) {
        return series.map((chartSeries) => {
            return {
                markerColor: chartSeries.color || chartSeries.areaColor,
                markerShape: chartSeries.markerShape != 'auto' ? chartSeries.markerShape : 'square',
                text: chartSeries.name || chartSeries.id,
                id: chartSeries.id
            };
        });
    }
    function getBLACCategoriesItems(series, groups, getDataItem, hoverBehavior, hideAndShowBehavior) {
        const categoriesItem = [];
        if (hoverBehavior === 'none' && hideAndShowBehavior === 'none') {
            return categoriesItem;
        }
        series.forEach((serie, seriesIndex) => {
            groups.forEach((_, groupIndex) => {
                const data = getDataItem(seriesIndex, groupIndex);
                categoriesItem.push({
                    id: data.id,
                    categories: data.categories || serie['categories'] || [serie['id']]
                });
            });
            categoriesItem.push({
                id: serie['id'],
                categories: serie['categories'] || [serie['id']]
            });
        });
        return categoriesItem;
    }
});

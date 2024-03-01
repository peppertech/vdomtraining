define(["require", "exports", "@oracle/oraclejet-preact/utils/UNSAFE_visUtils"], function (require, exports, UNSAFE_visUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformValueFormats = exports.transformGroup = exports.transformSeries = exports.transformItem = void 0;
    const colorRamp = (0, UNSAFE_visUtils_1.getColorRamp)();
    function transformItem(item, series) {
        return {
            markerColor: item.color || series.markerColor,
            accessibleLabel: item.shortDesc,
            value: item.value,
            label: item.label,
            id: item.id,
            drilling: item.drilling || series.drilling,
            isMarkerDisplayed: (item.markerDisplayed && item.markerDisplayed !== 'off') ||
                (series.markerDisplayed && series.markerDisplayed !== 'off'),
            markerType: (item.markerShape !== 'auto' && item.markerShape) ||
                (series.markerShape !== 'auto' && series.markerShape),
            markerSize: (item.markerSize !== undefined && item.markerSize) || series.markerSize
        };
    }
    exports.transformItem = transformItem;
    function transformSeries(series, seriesIndex) {
        return {
            lineColor: series.color || colorRamp[seriesIndex % colorRamp.length],
            areaColor: series.areaColor || series.color || colorRamp[seriesIndex % colorRamp.length],
            accessibleLabel: series.shortDesc,
            drilling: series.drilling,
            lineStyle: series.lineStyle,
            lineType: series.lineType,
            lineWidth: series.lineWidth,
            markerShape: series.markerShape,
            markerColor: series.markerColor || colorRamp[seriesIndex % colorRamp.length],
            markerDisplayed: series.markerDisplayed,
            markerSize: series.markerSize,
            id: series.id,
            name: series.name,
            items: series.items
        };
    }
    exports.transformSeries = transformSeries;
    function transformGroup(group) {
        return {
            drilling: group.drilling,
            name: group.name,
            id: group.id,
            accessibleLabel: group.shortDesc
        };
    }
    exports.transformGroup = transformGroup;
    function transformValueFormats(valueFormats) {
        if (!valueFormats)
            return;
        const formats = {};
        if (valueFormats.value) {
            formats.value = {
                isDisplayed: valueFormats.value?.tooltipDisplay !== 'off',
                label: valueFormats.value?.tooltipLabel,
                format: valueFormats.value?.converter?.format
            };
        }
        if (valueFormats.series) {
            formats.series = {
                isDisplayed: valueFormats.series?.tooltipDisplay !== 'off',
                label: valueFormats.series?.tooltipLabel
            };
        }
        if (valueFormats.group) {
            formats.group = {
                isDisplayed: valueFormats.group?.tooltipDisplay !== 'off',
                label: valueFormats.group?.tooltipLabel
            };
        }
        return formats;
    }
    exports.transformValueFormats = transformValueFormats;
});

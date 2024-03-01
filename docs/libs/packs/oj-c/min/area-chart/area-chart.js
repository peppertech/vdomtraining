define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/hooks", "@oracle/oraclejet-preact/UNSAFE_LineAreaChart", "ojs/ojcontext", "@oracle/oraclejet-preact/UNSAFE_Legend", "@oracle/oraclejet-preact/UNSAFE_ChartWithLegend", "ojs/ojvcomponent", "../hooks/UNSAFE_useChartData/useChartData", "../utils/PRIVATE_chartUtils/events", "../utils/PRIVATE_chartUtils/legendUtils", "../hooks/UNSAFE_useVizCategories/useVizCategories", "../hooks/UNSAFE_useLegendPosition/useLegendPosition", "../utils/PRIVATE_chartUtils/lineAreaUtils", "../utils/PRIVATE_chartUtils/plotAreaUtils", "css!oj-c/area-chart/area-chart-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, hooks_1, UNSAFE_LineAreaChart_1, Context, UNSAFE_Legend_1, UNSAFE_ChartWithLegend_1, ojvcomponent_1, useChartData_1, events_1, legendUtils_1, useVizCategories_1, useLegendPosition_1, lineAreaUtils_1, plotAreaUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AreaChart = void 0;
    function AreaChartComp({ data, hideAndShowBehavior = 'none', orientation = 'vertical', xAxis, yAxis, hoverBehavior = 'none', valueFormats, plotArea, zoomAndScroll, itemTemplate, seriesTemplate, groupTemplate, seriesComparator, groupComparator, drilling = 'off', hiddenCategories = [], highlightedCategories = [], highlightMatch = 'any', selection = [], selectionMode = 'none', stack = 'off', legend = {
        rendered: 'on',
        position: 'auto'
    }, ...props }) {
        const rootRef = (0, hooks_1.useRef)(null);
        const addBusyState = (0, hooks_1.useCallback)((description) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-area-chart: ${description}` })
                : () => { };
        }, []);
        const { series, groups, getDataItem } = (0, useChartData_1.useChartData)(data, addBusyState, itemTemplate, seriesTemplate, groupTemplate, 'oj-c-area-chart-item', 'oj-c-area-chart-series', 'oj-c-area-chart-group', seriesComparator, groupComparator);
        const { majorTick: xMajorTick, ...xAxisRest } = xAxis ?? {};
        const { majorTick: yMajorTick, minorTick: yMinorTick, ...yAxisRest } = yAxis ?? {};
        const { itemDrillHandler, groupDrillHandler, seriesDrillHandler } = (0, events_1.getChartEventsHandler)(series, groups, drilling, props.onOjItemDrill, props.onOjGroupDrill, props.onOjSeriesDrill);
        const selectionChangeHandler = (detail) => {
            props.onSelectionChanged?.(detail.ids);
        };
        const categoriesItems = (0, legendUtils_1.getBLACCategoriesItems)(series, groups, getDataItem, hoverBehavior, hideAndShowBehavior);
        const { hiddenIds, updateHidden, highlightedIds, updateHighlighted } = (0, useVizCategories_1.useVizCategories)(categoriesItems, (item) => item.categories, hiddenCategories, highlightedCategories, 'any', highlightMatch, props.onHiddenCategoriesChanged, props.onHighlightedCategoriesChanged);
        const onItemInput = (detail) => {
            if (hoverBehavior === 'none')
                return;
            const id = (0, events_1.getIdFromDetail)(detail, series, getDataItem);
            updateHighlighted(id);
        };
        const legendPosition = (0, useLegendPosition_1.useLegendPosition)(rootRef, legend.position || legendUtils_1.LegendDefaults.position);
        const isLegendRendered = (legend.rendered || legendUtils_1.LegendDefaults.rendered) != 'off';
        const legendData = (0, legendUtils_1.getLegendData)(series);
        const isLegendInteractive = hideAndShowBehavior != 'none' || hoverBehavior != 'none' || drilling === 'on';
        const legendItemActionHandler = (detail) => {
            if (hideAndShowBehavior != 'none') {
                updateHidden(detail.itemId);
                return;
            }
            seriesDrillHandler(detail);
        };
        const legendItemInputHandler = (detail) => {
            if (hoverBehavior != 'none') {
                updateHighlighted(detail.itemId);
            }
        };
        const chart = series.length > 0 && groups.length > 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_LineAreaChart_1.LineAreaChart, { type: "area", width: "100%", height: "100%", series: series, groups: groups, getDataItem: getDataItem, onItemInput: onItemInput, drilling: drilling, onItemDrill: itemDrillHandler, onGroupDrill: groupDrillHandler, onSelectionChange: selectionChangeHandler, selectionMode: selectionMode, selectedIds: selectionMode === 'none' ? undefined : selection, orientation: orientation, xAxis: xAxisRest, yAxis: yAxisRest, highlightedIds: highlightedIds.length === 0 ? undefined : highlightedIds, hiddenIds: hiddenIds, plotArea: (0, plotAreaUtils_1.getPlotArea)(plotArea, yMajorTick, yMinorTick, xMajorTick), hideAndShowBehavior: hideAndShowBehavior, hoverBehavior: hoverBehavior, isStacked: stack === 'on', valueFormats: (0, lineAreaUtils_1.transformValueFormats)(valueFormats), "aria-label": props['aria-label'], "aria-describedBy": props['aria-describedby'], "aria-labelledBy": props['aria-labelledby'] })) : undefined;
        const chartLegend = isLegendRendered && legendData.length > 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_Legend_1.Legend, { items: legendData, orientation: legendPosition === 'start' || legendPosition === 'end' ? 'vertical' : 'horizontal', isReadOnly: !isLegendInteractive, highlightedIds: highlightedIds.length === 0 ? undefined : highlightedIds, hiddenIds: hiddenIds.length === 0 ? undefined : hiddenIds, symbolHeight: legend.symbolHeight, symbolWidth: legend.symbolWidth, onItemAction: legendItemActionHandler, onInput: legendItemInputHandler })) : undefined;
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, children: (0, jsx_runtime_1.jsx)(UNSAFE_ChartWithLegend_1.ChartWithLegend, { chart: chart, position: legendPosition, maxSize: legend.maxSize, size: legend.size, legend: chartLegend }) }));
    }
    exports.AreaChart = (0, ojvcomponent_1.registerCustomElement)('oj-c-area-chart', AreaChartComp, "AreaChart", { "properties": { "data": { "type": "DataProvider|null" }, "seriesComparator": { "type": "function" }, "groupComparator": { "type": "function" }, "stack": { "type": "string", "enumValues": ["off", "on"] }, "drilling": { "type": "string", "enumValues": ["off", "on"] }, "orientation": { "type": "string", "enumValues": ["horizontal", "vertical"] }, "yAxis": { "type": "object", "properties": { "majorTick": { "type": "object", "properties": { "lineStyle": { "type": "string", "enumValues": ["dashed", "dotted", "solid"] }, "lineWidth": { "type": "number" }, "lineColor": { "type": "string" }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] } } }, "minorTick": { "type": "object", "properties": { "lineStyle": { "type": "string", "enumValues": ["dashed", "dotted", "solid"] }, "lineWidth": { "type": "number" }, "lineColor": { "type": "string" }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] } } } } }, "xAxis": { "type": "object", "properties": { "majorTick": { "type": "object", "properties": { "lineStyle": { "type": "string", "enumValues": ["dashed", "dotted", "solid"] }, "lineWidth": { "type": "number" }, "lineColor": { "type": "string" }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] } } } } }, "plotArea": { "type": "object", "properties": { "backgroundColor": { "type": "string" } } }, "zoomAndScroll": { "type": "string", "enumValues": ["off", "live"] }, "valueFormats": { "type": "object", "properties": { "group": { "type": "object", "properties": { "tooltipLabel": { "type": "string" }, "tooltipDisplay": { "type": "string", "enumValues": ["auto", "off"] } } }, "series": { "type": "object", "properties": { "tooltipLabel": { "type": "string" }, "tooltipDisplay": { "type": "string", "enumValues": ["auto", "off"] } } }, "value": { "type": "object", "properties": { "converter": { "type": "any" }, "tooltipLabel": { "type": "string" }, "tooltipDisplay": { "type": "string", "enumValues": ["auto", "off"] } } } } }, "selectionMode": { "type": "string", "enumValues": ["none", "multiple", "single"] }, "selection": { "type": "Array<any>", "writeback": true }, "hiddenCategories": { "type": "Array<string>", "writeback": true }, "highlightedCategories": { "type": "Array<string>", "writeback": true }, "hideAndShowBehavior": { "type": "string", "enumValues": ["none", "withoutRescale", "withRescale"] }, "hoverBehavior": { "type": "string", "enumValues": ["none", "dim"] }, "highlightMatch": { "type": "string", "enumValues": ["all", "any"] }, "legend": { "type": "object", "properties": { "position": { "type": "string", "enumValues": ["auto", "end", "start", "top", "bottom"] }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] }, "maxSize": { "type": "number|string" }, "size": { "type": "number|string" }, "symbolHeight": { "type": "number" }, "symbolWidth": { "type": "number" } } } }, "slots": { "itemTemplate": { "data": {} }, "seriesTemplate": { "data": {} }, "groupTemplate": { "data": {} } }, "events": { "ojViewportChange": {}, "ojItemDrill": {}, "ojGroupDrill": {}, "ojSeriesDrill": {} }, "extension": { "_WRITEBACK_PROPS": ["selection", "hiddenCategories", "highlightedCategories"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-describedby", "aria-labelledby"] } }, { "hideAndShowBehavior": "none", "orientation": "vertical", "hoverBehavior": "none", "drilling": "off", "hiddenCategories": [], "highlightedCategories": [], "highlightMatch": "any", "selection": [], "selectionMode": "none", "stack": "off", "legend": { "rendered": "on", "position": "auto" } }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

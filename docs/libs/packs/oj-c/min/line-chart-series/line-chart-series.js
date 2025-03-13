define(["require", "exports", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent"], function (require, exports, translationBundle_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LineChartSeries = exports.LineChartSeriesDefaults = void 0;
    exports.LineChartSeriesDefaults = {
        drilling: 'inherit'
    };
    exports.LineChartSeries = (0, ojvcomponent_1.registerCustomElement)('oj-c-line-chart-series', ({ drilling = exports.LineChartSeriesDefaults.drilling, ...props }) => {
        return null;
    }, "LineChartSeries", { "properties": { "categories": { "type": "Array<string>" }, "color": { "type": "string" }, "drilling": { "type": "string", "enumValues": ["inherit", "off", "on"] }, "lineStyle": { "type": "string", "enumValues": ["dashed", "solid", "dotted"] }, "lineType": { "type": "string", "enumValues": ["curved", "straight"] }, "lineWidth": { "type": "number" }, "markerShape": { "type": "string", "enumValues": ["auto", "square", "circle", "diamond", "human", "plus", "star", "triangleDown", "triangleUp"] }, "markerColor": { "type": "string" }, "markerDisplayed": { "type": "string" }, "markerSize": { "type": "number" }, "name": { "type": "string" }, "shortDesc": { "type": "string" } } }, { "drilling": "inherit" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define(["require", "exports", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent"], function (require, exports, translationBundle_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AreaChartSeries = exports.AreaChartSeriesDefaults = void 0;
    exports.AreaChartSeriesDefaults = {
        drilling: 'inherit'
    };
    exports.AreaChartSeries = (0, ojvcomponent_1.registerCustomElement)('oj-c-area-chart-series', ({ drilling = exports.AreaChartSeriesDefaults.drilling, ...props }) => {
        return null;
    }, "AreaChartSeries", { "properties": { "categories": { "type": "Array<string>" }, "color": { "type": "string" }, "drilling": { "type": "string", "enumValues": ["inherit", "off", "on"] }, "lineType": { "type": "string", "enumValues": ["curved", "straight"] }, "markerShape": { "type": "string", "enumValues": ["auto", "square", "circle", "diamond", "human", "plus", "star", "triangleDown", "triangleUp"] }, "markerColor": { "type": "string" }, "markerDisplayed": { "type": "string" }, "markerSize": { "type": "number" }, "name": { "type": "string" }, "shortDesc": { "type": "string" } } }, { "drilling": "inherit" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

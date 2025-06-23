define(["require", "exports", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent"], function (require, exports, translationBundle_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AreaChartItem = void 0;
    exports.AreaChartItem = (0, ojvcomponent_1.registerCustomElement)('oj-c-area-chart-item', ({}) => {
        return null;
    }, "AreaChartItem", { "properties": { "seriesId": { "type": "string" }, "groupId": { "type": "Array<string>" }, "value": { "type": "number" }, "x": { "type": "string" }, "color": { "type": "string" }, "markerDisplayed": { "type": "string", "enumValues": ["auto", "off", "on"] }, "markerShape": { "type": "string", "enumValues": ["auto", "square", "circle", "diamond", "human", "plus", "star", "triangleDown", "triangleUp"] }, "markerSize": { "type": "number" }, "categories": { "type": "Array<string>" }, "drilling": { "type": "string", "enumValues": ["inherit", "off", "on"] }, "shortDesc": { "type": "string" } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define(["require", "exports", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent"], function (require, exports, translationBundle_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LegendItem = exports.LegendItemDefaults = void 0;
    exports.LegendItemDefaults = {
        markerShape: 'square',
        symbolType: 'marker',
        borderColor: '',
        categories: [],
        lineStyle: 'solid',
        drilling: 'inherit'
    };
    exports.LegendItem = (0, ojvcomponent_1.registerCustomElement)('oj-c-legend-item', ({ markerShape = exports.LegendItemDefaults.markerShape, symbolType = exports.LegendItemDefaults.symbolType, borderColor = exports.LegendItemDefaults.borderColor, categories = exports.LegendItemDefaults.categories, lineStyle = exports.LegendItemDefaults.lineStyle, drilling = exports.LegendItemDefaults.drilling, ...props }) => {
        return null;
    }, "LegendItem", { "properties": { "text": { "type": "string" }, "categories": { "type": "Array<string>" }, "symbolType": { "type": "string", "enumValues": ["marker", "image", "line", "lineWithMarker"] }, "source": { "type": "string" }, "color": { "type": "string" }, "borderColor": { "type": "string" }, "lineStyle": { "type": "string", "enumValues": ["dashed", "solid", "dotted"] }, "lineWidth": { "type": "number" }, "markerShape": { "type": "string", "enumValues": ["square", "circle", "ellipse", "diamond", "human", "plus", "star", "triangleDown", "triangleUp", "rectangle"] }, "markerColor": { "type": "string" }, "shortDesc": { "type": "string" }, "drilling": { "type": "string", "enumValues": ["inherit", "off", "on"] } } }, { "markerShape": "square", "symbolType": "marker", "borderColor": "", "categories": [], "lineStyle": "solid", "drilling": "inherit" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define(["require", "exports", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent"], function (require, exports, translationBundle_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LineChartGroup = exports.LineChartGroupDefaults = void 0;
    exports.LineChartGroupDefaults = {
        drilling: 'inherit'
    };
    exports.LineChartGroup = (0, ojvcomponent_1.registerCustomElement)('oj-c-line-chart-group', ({ drilling = exports.LineChartGroupDefaults.drilling, ...props }) => {
        return null;
    }, "LineChartGroup", { "properties": { "drilling": { "type": "string", "enumValues": ["inherit", "off", "on"] }, "name": { "type": "string" }, "shortDesc": { "type": "string" } } }, { "drilling": "inherit" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

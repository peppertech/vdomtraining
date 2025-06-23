define(["require", "exports", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent"], function (require, exports, translationBundle_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AreaChartGroup = exports.AreaChartGroupDefaults = void 0;
    exports.AreaChartGroupDefaults = {
        drilling: 'inherit'
    };
    exports.AreaChartGroup = (0, ojvcomponent_1.registerCustomElement)('oj-c-area-chart-group', ({ drilling = exports.AreaChartGroupDefaults.drilling, ...props }) => {
        return null;
    }, "AreaChartGroup", { "properties": { "drilling": { "type": "string", "enumValues": ["inherit", "off", "on"] }, "name": { "type": "string" }, "shortDesc": { "type": "string" } } }, { "drilling": "inherit" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

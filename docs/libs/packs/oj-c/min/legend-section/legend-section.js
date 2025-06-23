define(["require", "exports", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent"], function (require, exports, translationBundle_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LegendSection = exports.LegendSectionDefaults = void 0;
    exports.LegendSectionDefaults = {
        text: ''
    };
    exports.LegendSection = (0, ojvcomponent_1.registerCustomElement)('oj-c-legend-section', ({ text = exports.LegendSectionDefaults.text, ...props }) => {
        return null;
    }, "LegendSection", { "properties": { "text": { "type": "string" } } }, { "text": "" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

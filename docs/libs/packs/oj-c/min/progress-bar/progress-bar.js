define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_ProgressBar", "ojs/ojvcomponent", "css!oj-c/progress-bar/progress-bar-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_ProgressBar_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProgressBar = void 0;
    exports.ProgressBar = (0, ojvcomponent_1.registerCustomElement)('oj-c-progress-bar', ({ max = 100, value = 0, edge = 'none', ...otherProps }) => {
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_ProgressBar_1.ProgressBar, { value: value === -1 ? 'indeterminate' : value, max: max, edge: edge, "aria-valuetext": otherProps['aria-valuetext'] }) }));
    }, "ProgressBar", { "properties": { "max": { "type": "number" }, "value": { "type": "number" }, "edge": { "type": "string", "enumValues": ["none", "top"] } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-valuetext"] } }, { "max": 100, "value": 0, "edge": "none" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

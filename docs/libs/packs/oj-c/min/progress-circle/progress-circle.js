define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_ProgressCircle", "ojs/ojvcomponent", "css!oj-c/progress-circle/progress-circle-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_ProgressCircle_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProgressCircle = void 0;
    exports.ProgressCircle = (0, ojvcomponent_1.registerCustomElement)('oj-c-progress-circle', ({ max = 100, value = 0, size = 'md', ...otherProps }) => {
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_ProgressCircle_1.ProgressCircle, { value: value === -1 ? 'indeterminate' : value, max: max, size: size, "aria-valuetext": otherProps['aria-valuetext'] }) }));
    }, "ProgressCircle", { "properties": { "max": { "type": "number" }, "value": { "type": "number" }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-valuetext"] } }, { "max": 100, "value": 0, "size": "md" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

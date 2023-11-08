define(["require", "exports", "preact/jsx-runtime", "./chart", "./chart-drill", "./legend"], function (require, exports, jsx_runtime_1, chart_1, chart_drill_1, legend_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const DataViz = () => {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex oj-sm-flex-items-1" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex-item oj-panel oj-sm-margin-2x demo-panel" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: " Chart " })), (0, jsx_runtime_1.jsx)(chart_1.default, {})] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex-item oj-panel oj-sm-margin-2x demo-panel" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: " Standalone Legend " })), (0, jsx_runtime_1.jsx)(legend_1.default, {})] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex-item oj-panel oj-sm-margin-2x demo-panel" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: " Drillable Chart " })), (0, jsx_runtime_1.jsx)(chart_drill_1.DrillChart, {})] }))] })) })));
    };
    exports.default = DataViz;
});

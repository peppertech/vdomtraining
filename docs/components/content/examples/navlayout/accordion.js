define(["require", "exports", "preact/jsx-runtime", "ojs/ojaccordion", "ojs/ojradioset", "ojs/ojlabel", "preact"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Accordion = void 0;
    const Accordion = () => {
        return ((0, jsx_runtime_1.jsx)("div", { class: "oj-web-applayout-max-width oj-web-applayout-content", children: (0, jsx_runtime_1.jsxs)("oj-accordion", { id: "a1", children: [(0, jsx_runtime_1.jsxs)("oj-collapsible", { id: "c1", children: [(0, jsx_runtime_1.jsxs)("h3", { slot: "header", children: [(0, jsx_runtime_1.jsx)("span", { class: "oj-ux-ico-cart oj-ux-icon-size-5x oj-sm-padding-2x-end" }), "Header 1"] }), (0, jsx_runtime_1.jsx)("p", { children: "Content 1." })] }), (0, jsx_runtime_1.jsxs)("oj-collapsible", { id: "c3", expanded: true, children: [(0, jsx_runtime_1.jsx)("h3", { slot: "header", children: "Header 2" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("oj-label", { id: "mainlabelid", children: "Colors" }), (0, jsx_runtime_1.jsxs)("oj-radioset", { id: "radiosetBasicDemoId", value: "red", "labelled-by": "mainlabelid", children: [(0, jsx_runtime_1.jsx)("oj-option", { id: "blueopt", value: "blue", children: "Blue" }), (0, jsx_runtime_1.jsx)("oj-option", { id: "greenopt", value: "green", children: "Green" }), (0, jsx_runtime_1.jsx)("oj-option", { id: "redopt", value: "red", children: "Red" })] })] })] }), (0, jsx_runtime_1.jsxs)("oj-collapsible", { id: "c4", children: [(0, jsx_runtime_1.jsx)("h3", { slot: "header", children: "Header 3" }), (0, jsx_runtime_1.jsx)("p", { children: "Content 3." })] })] }) }));
    };
    exports.Accordion = Accordion;
});

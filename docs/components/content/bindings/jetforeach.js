define(["require", "exports", "preact/jsx-runtime"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const JETforeach = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: "JET also provided a binding element for iterating over an array of data. The oj-bind-for-each element looked something like the below code." }), (0, jsx_runtime_1.jsx)("div", { class: "oj-panel oj-sm-margin-4x-bottom", children: (0, jsx_runtime_1.jsx)("code", { children: (0, jsx_runtime_1.jsxs)("div", { children: ['<oj-bind-for-each data="[[itemList]]">', (0, jsx_runtime_1.jsx)("br", {}), "\u00A0", '<template data-oj-as="item">', (0, jsx_runtime_1.jsx)("br", {}), "\u00A0\u00A0", '<div :id="[[item.detail.id]]">', (0, jsx_runtime_1.jsx)("br", {}), "\u00A0\u00A0\u00A0", '<oj-bind-text value="[[item.detail.message]]"></oj-bind-text>', (0, jsx_runtime_1.jsx)("br", {}), "\u00A0\u00A0", "</div>", (0, jsx_runtime_1.jsx)("br", {}), "\u00A0", "</template>", (0, jsx_runtime_1.jsx)("br", {}), "</oj-bind-for-each>"] }) }) })] }));
    };
    exports.default = JETforeach;
});

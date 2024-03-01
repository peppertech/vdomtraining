define(["require", "exports", "preact/jsx-runtime", "./attributes", "./jetattributes", "./jetforeach", "./foreach"], function (require, exports, jsx_runtime_1, attributes_1, jetattributes_1, jetforeach_1, foreach_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const BindingContent = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { class: "oj-web-applayout-max-width oj-web-applayout-content", children: [(0, jsx_runtime_1.jsx)("h1", { class: "oj-typography-heading-lg", children: " Bindings" }), (0, jsx_runtime_1.jsx)("h2", { class: "oj-typography-heading-sm", children: "All binding is done using JSX." }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("h3", { class: "oj-typography-heading-xs", children: "Attribute and Text" }), (0, jsx_runtime_1.jsx)(jetattributes_1.default, {}), (0, jsx_runtime_1.jsx)(attributes_1.default, { testId: "fred", message: "In VDOM, both the id and the content are defined using JSX and props" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("h3", { class: "oj-typography-heading-xs", children: "For-Each" }), (0, jsx_runtime_1.jsx)(jetforeach_1.default, {}), (0, jsx_runtime_1.jsx)(foreach_1.default, {})] }));
    };
    exports.default = BindingContent;
});

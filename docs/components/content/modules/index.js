define(["require", "exports", "preact/jsx-runtime", "./modules"], function (require, exports, jsx_runtime_1, modules_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ModulesContent = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { class: "oj-web-applayout-max-width oj-web-applayout-content", children: [(0, jsx_runtime_1.jsx)("h1", { class: "oj-typography-heading-lg", children: " Modules " }), (0, jsx_runtime_1.jsx)("h2", { class: "oj-typography-heading-sm", children: "oj-module element is replaced by components." }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("h3", { class: "oj-typography-heading-xs", children: "Modules / Templates" }), (0, jsx_runtime_1.jsx)(modules_1.default, {})] }));
    };
    exports.default = ModulesContent;
});

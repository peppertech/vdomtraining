define(["require", "exports", "preact/jsx-runtime", "./formelements"], function (require, exports, jsx_runtime_1, formelements_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Form = () => {
        return ((0, jsx_runtime_1.jsx)("div", { class: "oj-web-applayout-max-width oj-web-applayout-content", children: (0, jsx_runtime_1.jsx)("div", { class: "oj-flex", children: (0, jsx_runtime_1.jsxs)("div", { class: "oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6", children: [(0, jsx_runtime_1.jsx)("h2", { class: "oj-typography-heading-sm", children: " Form Elements " }), (0, jsx_runtime_1.jsx)(formelements_1.default, {})] }) }) }));
    };
    exports.default = Form;
});

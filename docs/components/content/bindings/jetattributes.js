define(["require", "exports", "preact/jsx-runtime"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const JETAttr = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: "When using JET, if you wanted to bind the id of a div, and the content inside of that div, you would use a : (colon) in front of the id attribute and an oj-bind-text element for the content. It would look something like this:" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-panel oj-sm-margin-4x-bottom" }, { children: (0, jsx_runtime_1.jsxs)("code", { children: ['<div :id="[[testId]]">', (0, jsx_runtime_1.jsx)("br", {}), "\u00A0", '<oj-bind-text value="[[message]]"></oj-bind-text>', (0, jsx_runtime_1.jsx)("br", {}), '</div>'] }) }))] }));
    };
    exports.default = JETAttr;
});

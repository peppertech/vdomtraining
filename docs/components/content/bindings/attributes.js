define(["require", "exports", "preact/jsx-runtime"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Attributes = (props) => {
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ id: props.testId }, { children: [(0, jsx_runtime_1.jsx)("p", { children: props.message }), (0, jsx_runtime_1.jsx)("p", { children: "The code will look something like this:" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-panel" }, { children: (0, jsx_runtime_1.jsxs)("code", { children: ["return (", (0, jsx_runtime_1.jsx)("br", {}), "\u00A0", "<div id={props.testId}>", (0, jsx_runtime_1.jsx)("br", {}), "\u00A0\u00A0", "{props.message}", (0, jsx_runtime_1.jsx)("br", {}), "\u00A0", "</div>", (0, jsx_runtime_1.jsx)("br", {}), ");"] }) })), (0, jsx_runtime_1.jsx)("p", { children: "with the value for the id and the message sent in as props" })] })));
    };
    exports.default = Attributes;
});

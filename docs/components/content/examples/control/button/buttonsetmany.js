define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "preact", "ojs/ojbutton", "ojs/ojoption"], function (require, exports, jsx_runtime_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ButtonSetMany = () => {
        const [selectedValues, setSelectedValues] = (0, hooks_1.useState)(["bold", "italic"]);
        const handleChange = (event) => {
            setSelectedValues(event.detail.value ? event.detail.value : []);
            console.log("ButtonSetMany Values: ", event.detail.value);
        };
        return ((0, jsx_runtime_1.jsxs)("oj-buttonset-many", { id: "formatsetMultipleButtons", value: selectedValues, onvalueChanged: handleChange, "aria-label": "Choose one or more format options.", children: [(0, jsx_runtime_1.jsx)("oj-option", { value: "bold", children: "Bold" }), (0, jsx_runtime_1.jsx)("oj-option", { value: "italic", children: "Italic" }), (0, jsx_runtime_1.jsx)("oj-option", { value: "underline", children: "Underline" })] }));
    };
    exports.default = ButtonSetMany;
});

define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "preact", "ojs/ojbutton", "ojs/ojoption"], function (require, exports, jsx_runtime_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ButtonSetOne = () => {
        const formatValues = [
            { id: "bold", label: "Bold" },
            { id: "italic", label: "Italic" },
            { id: "underline", label: "Underline" },
        ];
        const [selectedValue, setSelectedValue] = (0, hooks_1.useState)("bold");
        const changeHandler = (event) => {
            setSelectedValue(event.detail.value);
            console.log("Format value: ", event.detail.value);
        };
        return ((0, jsx_runtime_1.jsx)("oj-buttonset-one", { id: "setMultipleButtons", value: selectedValue, "aria-label": "Choose only one format", onvalueChanged: changeHandler, children: formatValues.map((format) => ((0, jsx_runtime_1.jsx)("oj-option", { value: format.id, children: format.label }, format.id))) }));
    };
    exports.default = ButtonSetOne;
});

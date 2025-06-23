define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "preact", "ojs/ojbutton", "ojs/ojmenu", "ojs/ojmenuselectmany"], function (require, exports, jsx_runtime_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const MenuSelectMany = () => {
        const [selectedOptions, setSelectedOptions] = (0, hooks_1.useState)([
            "large font",
        ]);
        const selectManyMenuChanged = (event) => {
            setSelectedOptions(event.detail.value);
            console.log("Select Many Menu values: ", event.detail.value);
        };
        return ((0, jsx_runtime_1.jsxs)("oj-menu-button", { id: "menuButton", class: "oj-sm-margin-5x-bottom", children: ["Page Settings", (0, jsx_runtime_1.jsx)("oj-menu", { id: "myMenu", slot: "menu", children: (0, jsx_runtime_1.jsxs)("oj-menu-select-many", { value: selectedOptions, onvalueChanged: selectManyMenuChanged, children: [(0, jsx_runtime_1.jsx)("oj-option", { value: "sliding navigation", children: "Sliding Navigation" }), (0, jsx_runtime_1.jsx)("oj-option", { value: "right-to-left reading direction", children: "Right-to-Left Reading Direction" }), (0, jsx_runtime_1.jsx)("oj-option", { value: "large font", children: "Large Font" }), (0, jsx_runtime_1.jsx)("oj-option", { value: "debug mode", children: "Debug Mode" }), (0, jsx_runtime_1.jsx)("oj-option", { value: "high contrast mode", children: "High Contrast Mode" })] }) })] }));
    };
    exports.default = MenuSelectMany;
});

define(["require", "exports", "preact/jsx-runtime", "preact", "ojs/ojbutton"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Button = () => {
        const handleOjAction = (event) => {
            const label = event.detail.originalEvent.currentTarget.innerText;
            console.log("Button clicked: ", label ? label : "Icon Only");
        };
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("oj-button", { label: "Button Text 1", onojAction: handleOjAction }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("oj-button", { label: "Icon Button", display: "icons", onojAction: handleOjAction, children: (0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-information" }) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("oj-button", { label: "Disabled Button", disabled: true }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("oj-button", { label: "Call To Action", chroming: "callToAction", class: "oj-button-full-width", onojAction: handleOjAction })] }));
    };
    exports.default = Button;
});

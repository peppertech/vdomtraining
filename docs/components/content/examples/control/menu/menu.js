define(["require", "exports", "preact/jsx-runtime", "preact", "ojs/ojmenu", "ojs/ojbutton", "ojs/ojoption"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Menu = () => {
        const menuItemAction = (event) => {
            const value = event.detail.selectedValue;
            console.log(`Selected menu item: ${value}`);
        };
        return ((0, jsx_runtime_1.jsxs)("oj-menu-button", { id: "menuButton2", class: "oj-sm-margin-5x-bottom", children: ["Actions", (0, jsx_runtime_1.jsxs)("oj-menu", { id: "myMenu2", slot: "menu", onojMenuAction: menuItemAction, children: [(0, jsx_runtime_1.jsxs)("oj-option", { id: "zoomin", value: "Zoom In", children: [(0, jsx_runtime_1.jsx)("span", { class: "oj-ux-ico-zoom-in", slot: "startIcon" }), "Zoom In"] }), (0, jsx_runtime_1.jsxs)("oj-option", { id: "zoomout", value: "Zoom Out", children: [(0, jsx_runtime_1.jsx)("span", { class: "oj-ux-ico-zoom-out", slot: "startIcon" }), "Zoom Out"] }), (0, jsx_runtime_1.jsx)("oj-option", { id: "divider" }), (0, jsx_runtime_1.jsxs)("oj-option", { id: "save", value: "Save", children: [(0, jsx_runtime_1.jsx)("span", { class: "oj-ux-ico-save", slot: "startIcon" }), "Save"] }), (0, jsx_runtime_1.jsxs)("oj-option", { id: "print", value: "Print...", disabled: true, children: [(0, jsx_runtime_1.jsx)("span", { class: "oj-ux-ico-print", slot: "startIcon" }), "Print..."] })] })] }));
    };
    exports.default = Menu;
});

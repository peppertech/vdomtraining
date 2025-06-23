define(["require", "exports", "preact/jsx-runtime", "preact", "ojs/ojmenu", "ojs/ojbutton"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const MenuButton = () => {
        const menuItems = [
            { id: "save", label: "Save", icon: "oj-ux-ico-print", disabled: false },
            {
                id: "zoomin",
                label: "Zoom In",
                icon: "oj-ux-ico-zoom-in",
                disabled: false,
            },
            {
                id: "zoomout",
                label: "Zoom Out",
                icon: "oj-ux-ico-zoom-out",
                disabled: false,
            },
            { id: "print", label: "Print...", icon: "oj-ux-ico-print", disabled: true },
        ];
        const handleMenuSelection = (event) => {
            console.log("Menu item: ", event.detail.selectedValue);
        };
        return ((0, jsx_runtime_1.jsxs)("oj-menu-button", { id: "menuButton1", children: ["Action", (0, jsx_runtime_1.jsx)("oj-menu", { id: "myMenu1", slot: "menu", onojMenuAction: handleMenuSelection, children: menuItems.map((item) => ((0, jsx_runtime_1.jsxs)("oj-option", { value: item.label, disabled: item.disabled, id: item.id, children: [item.icon && (0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: item.icon }), item.label] }))) })] }));
    };
    exports.default = MenuButton;
});

define(["require", "exports", "preact/jsx-runtime", "preact"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const IconFont = () => {
        const iconClasses = [
            "oj-ux-ico-heart-s",
            "oj-icon-color-primary",
            "oj-icon-color-secondary",
            "oj-icon-color-disabled",
            "oj-icon-color-danger",
            "oj-icon-color-warning",
            "oj-icon-color-success",
            "oj-icon-color-info",
        ];
        const icons = iconClasses.map((iconClass, index) => ((0, jsx_runtime_1.jsx)("div", { class: "oj-flex-item oj-sm-padding-2x-horizontal", children: (0, jsx_runtime_1.jsx)("span", { class: `${iconClass} oj-ux-icon-size-6x`, role: "img", "aria-label": iconClass.replace(/oj-|icon-|color-|-s/g, " ") }) }, index)));
        return (0, jsx_runtime_1.jsx)("div", { class: "oj-flex oj-sm-flex-items-initial", children: icons });
    };
    exports.default = IconFont;
});

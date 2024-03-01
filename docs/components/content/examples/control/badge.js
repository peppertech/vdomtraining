define(["require", "exports", "preact/jsx-runtime", "preact"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Badge = ({ text, color, subtle, small, end }) => {
        let classNames = "oj-badge";
        if (color) {
            classNames += ` oj-badge-${color}`;
        }
        if (subtle) {
            classNames += " oj-badge-subtle";
        }
        if (small) {
            classNames += " oj-badge-sm";
        }
        if (end) {
            classNames += " oj-badge-end";
        }
        return ((0, jsx_runtime_1.jsx)("span", { className: classNames, "aria-label": text, children: text }));
    };
    exports.default = Badge;
});

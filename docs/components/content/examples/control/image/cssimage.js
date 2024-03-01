define(["require", "exports", "preact/jsx-runtime", "preact"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const CSSImage = () => {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { children: "'bulletlist-bg': this uses a background image and the image disappears when printed if background graphics are disabled." }), (0, jsx_runtime_1.jsx)("div", { role: "img", class: "demo-bulletlist-bg", title: "background image", alt: "background image" }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("p", { children: "'bulletlist': the image still appears when printing" }), (0, jsx_runtime_1.jsx)("div", { role: "img", class: "oj-icon bulletlist", title: "bulleted list image", alt: "background image" }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("p", { children: "'bulletlist-hc': this uses an alternative .png in high contrast mode" }), (0, jsx_runtime_1.jsx)("div", { role: "img", class: "oj-icon bulletlist-hc", title: "bulleted list image", alt: "bulleted list image" }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("p", { children: "'bulletlist-hc-font': this uses an icon font alternative in high contrast mode" }), (0, jsx_runtime_1.jsx)("div", { role: "img", class: "oj-icon bulletlist-hc-font", title: "bulleted list image", alt: "bulleted list image" })] }));
    };
    exports.default = CSSImage;
});

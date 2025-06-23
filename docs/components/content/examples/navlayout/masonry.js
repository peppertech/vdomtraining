define(["require", "exports", "preact/jsx-runtime", "ojs/ojknockout", "ojs/ojmasonrylayout"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MasonryItem = exports.MasonryLayout = void 0;
    const MasonryItem = ({ sizeClass, children, }) => {
        return (0, jsx_runtime_1.jsx)("div", { class: `${sizeClass} oj-panel`, children: children });
    };
    exports.MasonryItem = MasonryItem;
    const MasonryLayout = ({ children }) => {
        return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("oj-masonry-layout", { id: "masonryLayout", children: children }) }));
    };
    exports.MasonryLayout = MasonryLayout;
});

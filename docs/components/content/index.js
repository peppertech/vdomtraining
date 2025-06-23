define(["require", "exports", "preact/jsx-runtime", "./bindings/index", "./modules/index", "./examples/index", "preact"], function (require, exports, jsx_runtime_1, index_1, index_2, index_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Content = ({ router, page }) => {
        let pageContent = (page) => {
            switch (page) {
                case "modules":
                    return (0, jsx_runtime_1.jsx)(index_2.default, {});
                case "bindings":
                    return (0, jsx_runtime_1.jsx)(index_1.default, {});
                case "examples":
                    return (0, jsx_runtime_1.jsx)(index_3.default, { router: router });
            }
        };
        return ((0, jsx_runtime_1.jsx)("div", { class: "oj-web-applayout-max-width oj-web-applayout-content", children: pageContent(page) }));
    };
    exports.default = Content;
});

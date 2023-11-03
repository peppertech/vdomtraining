define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojactioncard", "ojs/ojlabel", "preact"], function (require, exports, jsx_runtime_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TabBar = void 0;
    const TabBar = () => {
        const [logMsg, setLogMsg] = (0, hooks_1.useState)("none");
        const actionHandler = (event) => {
            setLogMsg("Action handler invoked - " + event.currentTarget.id);
        };
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-oj-typography-bold" }, { children: "See the /examples/index.tsx file for oj-tab-bar code used above." })) })));
    };
    exports.TabBar = TabBar;
});

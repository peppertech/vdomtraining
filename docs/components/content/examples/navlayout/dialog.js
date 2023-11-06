define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojdialog", "ojs/ojpopup", "ojs/ojbutton", "preact"], function (require, exports, jsx_runtime_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Popup = exports.Dialog = void 0;
    const Dialog = () => {
        const diag1 = (0, hooks_1.useRef)(null);
        const open = (event) => {
            var _a;
            (_a = diag1.current) === null || _a === void 0 ? void 0 : _a.open();
        };
        const close = () => {
            var _a;
            (_a = diag1.current) === null || _a === void 0 ? void 0 : _a.close();
        };
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-oj-typography-bold" }, { children: [(0, jsx_runtime_1.jsx)("oj-button", { onojAction: open, label: "Open Dialog" }), (0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsxs)("oj-dialog", Object.assign({ id: "dialog1", "dialog-title": "Example Dialog", "aria-describedby": "desc", ref: diag1 }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ slot: "body" }, { children: (0, jsx_runtime_1.jsx)("p", Object.assign({ id: "desc" }, { children: "This is the dialog content. User can change dialog resize behavior, cancel behavior and drag behavior by setting properties. Default property value depends on the theme." })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ slot: "footer" }, { children: (0, jsx_runtime_1.jsx)("oj-button", Object.assign({ id: "okButton", onojAction: close }, { children: "OK" })) }))] })) })] })) })));
    };
    exports.Dialog = Dialog;
    const Popup = () => {
        const [logMsg, setLogMsg] = (0, hooks_1.useState)("none");
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-oj-typography-bold" }, { children: "See the /examples/index.tsx file for oj-tab-bar code used above." })) })));
    };
    exports.Popup = Popup;
});

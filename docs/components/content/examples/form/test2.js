define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "oj-c/button", "ojs/ojdialog"], function (require, exports, jsx_runtime_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Content = void 0;
    function Content() {
        const helloDialogRef = (0, hooks_1.useRef)(null);
        const onLinkAction = () => {
            var _a;
            (_a = helloDialogRef.current) === null || _a === void 0 ? void 0 : _a.open();
        };
        const closeHelloDialog = () => {
            var _a;
            (_a = helloDialogRef.current) === null || _a === void 0 ? void 0 : _a.close();
        };
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("oj-c-button", { onojAction: onLinkAction, size: "lg", chroming: "borderless", display: "icons", label: "Show Greeting Dialog", children: (0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-emoji-smile" }) }), (0, jsx_runtime_1.jsx)("oj-c-button", { onojAction: onLinkAction, size: "lg", chroming: "borderless", display: "icons", label: "Show Acknowledgement Dialog", children: (0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-emoji-meh" }) }), (0, jsx_runtime_1.jsx)("oj-c-button", { onojAction: onLinkAction, size: "lg", chroming: "borderless", display: "icons", label: "Show Hello Dialog", children: (0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-emoji-sad" }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("oj-dialog", { id: "attachmentDeleteDialog", ref: helloDialogRef, dialogTitle: "Hello World!", cancelBehavior: "icon", children: [(0, jsx_runtime_1.jsx)("div", { slot: "body", children: "This is a test dialog" }), (0, jsx_runtime_1.jsx)("div", { slot: "footer", children: (0, jsx_runtime_1.jsx)("oj-c-button", { onojAction: closeHelloDialog, label: "Close" }) })] }) })] }));
    }
    exports.Content = Content;
});

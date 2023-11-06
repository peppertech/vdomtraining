define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojpopup", "ojs/ojbutton"], function (require, exports, jsx_runtime_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Popup = void 0;
    const positionConfig = {
        at: {
            horizontal: "end",
            vertical: "top",
        },
        my: {
            horizontal: "start",
            vertical: "bottom",
        },
    };
    const Popup = () => {
        const popRef = (0, hooks_1.useRef)(null);
        const open = (event) => {
            var _a;
            (_a = popRef.current) === null || _a === void 0 ? void 0 : _a.open("#btn1");
        };
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-oj-typography-bold" }, { children: [(0, jsx_runtime_1.jsx)("oj-button", { id: "btn1", onojAction: open, label: "Show popup" }), (0, jsx_runtime_1.jsx)("oj-popup", Object.assign({ id: "popupId1", ref: popRef, autoDismiss: "focusLoss", modality: "modeless", position: positionConfig, tail: "simple" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-flex" }, { children: (0, jsx_runtime_1.jsx)("pre", Object.assign({ class: "\r\n                oj-flex-item\r\n                demo-position\r\n                oj-typography-body-sm\r\n              " }, { children: "Something short and sweet goes here!" })) })) }))] })) })));
    };
    exports.Popup = Popup;
});

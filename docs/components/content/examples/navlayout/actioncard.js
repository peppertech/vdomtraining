define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojactioncard", "ojs/ojlabel", "preact", "css!./style/actioncard.css"], function (require, exports, jsx_runtime_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ActionCard = void 0;
    const ActionCard = () => {
        const [logMsg, setLogMsg] = (0, hooks_1.useState)("none");
        const actionHandler = (event) => {
            setLogMsg("Action handler invoked - " + event.currentTarget.id);
        };
        return ((0, jsx_runtime_1.jsxs)("div", { class: "oj-web-applayout-max-width oj-web-applayout-content", children: [(0, jsx_runtime_1.jsx)("oj-action-card", { id: "Default", onojAction: actionHandler, class: "oj-sm-margin-2x demo-card-content", children: "Non-interactive content goes in here" }), (0, jsx_runtime_1.jsxs)("div", { class: "oj-sm-padding-4x-vertical", children: [(0, jsx_runtime_1.jsx)("oj-label", { for: "changelog", children: "Event:" }), (0, jsx_runtime_1.jsx)("span", { id: "changelog", children: logMsg })] })] }));
    };
    exports.ActionCard = ActionCard;
});

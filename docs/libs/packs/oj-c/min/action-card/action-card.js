define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_ActionCard", "ojs/ojvcomponent", "css!oj-c/action-card/action-card-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_ActionCard_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ActionCard = void 0;
    exports.ActionCard = (0, ojvcomponent_1.registerCustomElement)('oj-c-action-card', ({ children, onOjAction }) => {
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_ActionCard_1.ActionCard, { onAction: onOjAction, width: "100%", height: "100%", children: children }) }));
    }, "ActionCard", { "slots": { "": {} }, "events": { "ojAction": { "bubbles": true } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

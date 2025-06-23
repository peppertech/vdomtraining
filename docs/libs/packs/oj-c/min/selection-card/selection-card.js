define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_SelectionCard", "ojs/ojvcomponent", "css!oj-c/selection-card/selection-card-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_SelectionCard_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectionCard = void 0;
    exports.SelectionCard = (0, ojvcomponent_1.registerCustomElement)('oj-c-selection-card', ({ children, selected }) => {
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_SelectionCard_1.SelectionCard, { isSelected: selected, width: "100%", height: "100%", children: children }) }));
    }, "SelectionCard", { "slots": { "": {} }, "properties": { "selected": { "type": "boolean" } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

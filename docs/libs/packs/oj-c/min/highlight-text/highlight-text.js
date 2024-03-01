define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_HighlightText", "css!oj-c/highlight-text/highlight-text-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, UNSAFE_HighlightText_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HighlightText = void 0;
    exports.HighlightText = (0, ojvcomponent_1.registerCustomElement)('oj-c-highlight-text', ({ matchText, text }) => {
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_HighlightText_1.HighlightText, { matchText: matchText, children: text }) }));
    }, "HighlightText", { "properties": { "matchText": { "type": "string" }, "text": { "type": "string" } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

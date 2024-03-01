define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_SelectorAll", "ojs/ojvcomponent", "../utils/UNSAFE_keyUtils/keySetUtils"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_SelectorAll_1, ojvcomponent_1, keySetUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectorAll = void 0;
    const SelectorAllImpl = ({ selectedKeys, onSelectedKeysChanged }) => {
        const keys = selectedKeys.keys;
        const selected = (keys.all
            ? keys.deletedKeys.size > 0
                ? 'partial-all'
                : 'all'
            : keys.keys.size > 0
                ? 'partial'
                : 'none');
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_SelectorAll_1.SelectorAll, { selected: selected, onChange: (detail) => {
                    onSelectedKeysChanged?.((0, keySetUtils_1.keysToKeySet)(detail.value));
                } }) }));
    };
    exports.SelectorAll = (0, ojvcomponent_1.registerCustomElement)('oj-c-selector-all', SelectorAllImpl, "SelectorAll", { "properties": { "selectedKeys": { "type": "object", "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["selectedKeys"], "_READ_ONLY_PROPS": [] } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

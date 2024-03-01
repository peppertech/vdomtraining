define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_Selector", "ojs/ojvcomponent", "../utils/UNSAFE_keyUtils/keySetUtils", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_Selector_1, ojvcomponent_1, keySetUtils_1, UNSAFE_useTabbableMode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Selector = void 0;
    const SelectorImpl = ({ rowKey, selectedKeys, indeterminate = false, selectionMode = 'multiple', onSelectedKeysChanged, ...otherProps }) => {
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_Selector_1.Selector, { isPartial: indeterminate, rowKey: rowKey, selectedKeys: (0, keySetUtils_1.keySetToKeys)(selectedKeys), selectionMode: selectionMode, "aria-label": otherProps['aria-label'], onChange: (detail) => {
                    onSelectedKeysChanged?.((0, keySetUtils_1.keysToKeySet)(detail.value));
                } }, rowKey) }));
    };
    exports.Selector = (0, ojvcomponent_1.registerCustomElement)('oj-c-selector', SelectorImpl, "Selector", { "properties": { "rowKey": { "type": "any" }, "selectedKeys": { "type": "object", "writeback": true }, "indeterminate": { "type": "boolean" }, "selectionMode": { "type": "string", "enumValues": ["multiple", "single"] } }, "extension": { "_WRITEBACK_PROPS": ["selectedKeys"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label"] } }, { "indeterminate": false, "selectionMode": "multiple" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

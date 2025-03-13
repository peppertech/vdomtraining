define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_Selector", "preact/hooks", "ojs/ojvcomponent", "../utils/PRIVATE_keyUtils/keySetUtils", "@oracle/oraclejet-preact/hooks/UNSAFE_useCollectionInteractionContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "../hooks/PRIVATE_useSelectionContext/useSelectionContext", "../hooks/PRIVATE_useSelectionContext/SelectionContext", "../hooks/PRIVATE_useSelectionContext/useItemKeyContext", "../hooks/PRIVATE_useSelectionContext/ItemKeyContext"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_Selector_1, hooks_1, ojvcomponent_1, keySetUtils_1, UNSAFE_useCollectionInteractionContext_1, UNSAFE_useTabbableMode_1, useSelectionContext_1, SelectionContext_1, useItemKeyContext_1, ItemKeyContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Selector = void 0;
    const SelectorImpl = ({ rowKey, selectedKeys, indeterminate = false, selectionMode, onSelectedKeysChanged, ...otherProps }) => {
        const itemKey = (0, useItemKeyContext_1.useItemKeyContext)();
        if (itemKey !== undefined) {
            rowKey = itemKey;
        }
        const selectionInfo = (0, useSelectionContext_1.useSelectionContext)();
        let keys = undefined;
        if (selectionInfo) {
            keys = selectionInfo.selected;
            onSelectedKeysChanged = selectionInfo.onSelectedChange;
            if (selectionInfo.selectionMode && selectionInfo.selectionMode !== 'none') {
                selectionMode = selectionInfo.selectionMode;
            }
        }
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_Selector_1.Selector, { isPartial: indeterminate, rowKey: rowKey, selectedKeys: keys == null ? (0, keySetUtils_1.keySetToKeys)(selectedKeys) : keys, selectionMode: selectionMode == null ? 'multiple' : selectionMode, "aria-label": otherProps['aria-label'], onChange: (0, hooks_1.useCallback)((detail) => {
                    const keySet = (0, keySetUtils_1.keysToKeySet)(detail.value);
                    if (onSelectedKeysChanged) {
                        onSelectedKeysChanged(keySet);
                    }
                }, [onSelectedKeysChanged]) }, rowKey) }));
    };
    exports.Selector = (0, ojvcomponent_1.registerCustomElement)('oj-c-selector', SelectorImpl, "Selector", { "properties": { "rowKey": { "type": "string|number" }, "selectedKeys": { "type": "object", "writeback": true }, "indeterminate": { "type": "boolean" }, "selectionMode": { "type": "string", "enumValues": ["multiple", "single"] } }, "extension": { "_WRITEBACK_PROPS": ["selectedKeys"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label"] } }, { "indeterminate": false }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, {
        consume: [UNSAFE_useCollectionInteractionContext_1.CollectionInteractionContext, UNSAFE_useTabbableMode_1.TabbableModeContext, SelectionContext_1.SelectionContext, ItemKeyContext_1.ItemKeyContext]
    });
});

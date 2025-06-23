define(["require", "exports", "preact/jsx-runtime", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "../hooks/PRIVATE_useSelectionContext/ItemKeyContext"], function (require, exports, jsx_runtime_1, UNSAFE_useTabbableMode_1, ItemKeyContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CardViewItem = void 0;
    const CardViewItem = ({ context, itemTemplate }) => {
        const { isTabbable } = (0, UNSAFE_useTabbableMode_1.useTabbableMode)();
        const itemContext = {
            isTabbable,
            data: context.data.data,
            item: context.data
        };
        return ((0, jsx_runtime_1.jsx)(ItemKeyContext_1.ItemKeyContext.Provider, { value: context.metadata.key, children: (0, jsx_runtime_1.jsx)(UNSAFE_useTabbableMode_1.TabbableModeContext.Provider, { value: { isTabbable }, children: itemTemplate && itemTemplate(itemContext) }) }));
    };
    exports.CardViewItem = CardViewItem;
});

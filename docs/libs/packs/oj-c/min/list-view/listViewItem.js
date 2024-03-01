define(["require", "exports", "preact/jsx-runtime", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle"], function (require, exports, jsx_runtime_1, UNSAFE_useTabbableMode_1, UNSAFE_useTranslationBundle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListItem = void 0;
    const ListItem = ({ context, itemTemplate }) => {
        const { isTabbable } = (0, UNSAFE_useTabbableMode_1.useTabbableMode)();
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const itemContext = {
            isTabbable,
            data: context.data.data,
            item: context.data
        };
        return ((0, jsx_runtime_1.jsxs)(UNSAFE_useTabbableMode_1.TabbableModeContext.Provider, { value: { isTabbable }, children: [itemTemplate && itemTemplate(itemContext), itemContext.item.metadata?.suggestion && ((0, jsx_runtime_1.jsx)("span", { class: "oj-helper-hidden-accessible", children: translations.list_suggestion() }))] }));
    };
    exports.ListItem = ListItem;
});

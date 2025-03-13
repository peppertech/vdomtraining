define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojcontext", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "@oracle/oraclejet-preact/UNSAFE_EmptyList", "@oracle/oraclejet-preact/UNSAFE_ListView", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "@oracle/oraclejet-preact/hooks/UNSAFE_useCollectionInteractionContext", "./useListViewPreact", "./DataFetchLiveRegion", "./listViewItem", "../utils/PRIVATE_ItemsMenu/items-menu", "../hooks/PRIVATE_useSelectionContext/SelectionContext", "css!oj-c/list-view/list-view-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, Context, ojvcomponent_1, compat_1, hooks_1, UNSAFE_EmptyList_1, UNSAFE_ListView_1, UNSAFE_useTranslationBundle_1, UNSAFE_useCollectionInteractionContext_1, useListViewPreact_1, DataFetchLiveRegion_1, listViewItem_1, items_menu_1, SelectionContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListView = void 0;
    const ListViewPreactWrapper = ({ addBusyState, isClickthroughDisabled, itemTemplate, noData, contextMenuConfig, onOjContextMenuAction, onOjContextMenuSelection, ...rest }) => {
        const { status, listViewProps } = (0, useListViewPreact_1.useListViewPreact)(rest, addBusyState, isClickthroughDisabled);
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const itemsRenderer = (0, hooks_1.useCallback)((context) => {
            const item = context.data;
            const itemDetail = { item, data: item.data };
            const items = contextMenuConfig?.items(itemDetail);
            return ((0, jsx_runtime_1.jsx)(items_menu_1.ItemsMenu, { items: items, onOjMenuAction: ({ key }) => {
                    onOjContextMenuAction?.({
                        menuItemKey: key,
                        contextMenuContext: itemDetail
                    });
                }, onOjMenuSelection: ({ value, menuSelectionGroupKey }) => {
                    onOjContextMenuSelection?.({
                        value,
                        menuSelectionGroupKey,
                        contextMenuContext: itemDetail
                    });
                } }));
        }, [contextMenuConfig?.items, onOjContextMenuAction, onOjContextMenuSelection]);
        const preactContextMenuConfig = (0, hooks_1.useMemo)(() => {
            return {
                itemsRenderer,
                accessibleLabel: contextMenuConfig?.accessibleLabel
            };
        }, [contextMenuConfig?.accessibleLabel, itemsRenderer]);
        if (status === 'success' && !listViewProps.hasMore && listViewProps.data?.length === 0) {
            if (noData) {
                return ((0, jsx_runtime_1.jsx)(UNSAFE_EmptyList_1.EmptyList, { "aria-label": listViewProps['aria-label'], "aria-labelledby": listViewProps['aria-labelledby'], children: noData(compat_1.Children) }));
            }
            else {
                const noDataContent = translations.noData_message();
                return ((0, jsx_runtime_1.jsx)(UNSAFE_EmptyList_1.EmptyList, { "aria-label": listViewProps['aria-label'], "aria-labelledby": listViewProps['aria-labelledby'], children: noDataContent }));
            }
        }
        const selectInfo = {
            selected: listViewProps.selectedKeys,
            selectionMode: listViewProps.selectionMode,
            onSelectedChange: rest.onSelectedChanged
        };
        return ((0, jsx_runtime_1.jsxs)(SelectionContext_1.SelectionContext.Provider, { value: selectInfo, children: [(0, jsx_runtime_1.jsx)(UNSAFE_ListView_1.ListView, { ...listViewProps, ...(contextMenuConfig && {
                        contextMenuConfig: preactContextMenuConfig
                    }), children: (0, hooks_1.useCallback)((context) => {
                        return (0, jsx_runtime_1.jsx)(listViewItem_1.ListItem, { context: context, itemTemplate: itemTemplate });
                    }, [itemTemplate]) }), (0, jsx_runtime_1.jsx)(DataFetchLiveRegion_1.DataFetchLiveRegion, { isFetching: status === 'loading' })] }));
    };
    const ListViewImpl = ({ selectionMode = 'none', reorderable = { items: 'disabled' }, item = { padding: 'disabled' }, ...rest }) => {
        const rootRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({
                    description: `oj-c-list-view: ${desc}`
                })
                : () => { };
        }, []);
        const isClickthroughDisabled = (0, hooks_1.useCallback)((target) => {
            if (target === null || rootRef.current === undefined) {
                return false;
            }
            return isEventClickthroughDisabled({ target }, rootRef.current);
        }, []);
        const props = {
            selectionMode,
            reorderable,
            item,
            ...rest
        };
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: rootRef, children: (0, jsx_runtime_1.jsx)(ListViewPreactWrapper, { addBusyState: addBusyState, isClickthroughDisabled: isClickthroughDisabled, ...props }) }));
    };
    exports.ListView = (0, ojvcomponent_1.registerCustomElement)('oj-c-list-view', ListViewImpl, "ListView", { "properties": { "currentItem": { "type": "string|number", "readOnly": true, "writeback": true }, "currentItemOverride": { "type": "object", "properties": { "rowKey": { "type": "string|number" } } }, "data": { "type": "DataProvider|null" }, "gridlines": { "type": "object", "properties": { "item": { "type": "string", "enumValues": ["hidden", "visible"] }, "top": { "type": "string", "enumValues": ["hidden", "visible"] }, "bottom": { "type": "string", "enumValues": ["hidden", "visible"] } } }, "scrollPolicyOptions": { "type": "object", "properties": { "fetchSize": { "type": "number" }, "scroller": { "type": "string" } } }, "selected": { "type": "object", "writeback": true }, "selectionMode": { "type": "string", "enumValues": ["none", "multiple", "single", "singleRequired"] }, "contextMenuConfig": { "type": "object", "properties": { "accessibleLabel": { "type": "string" }, "items": { "type": "function" } } }, "reorderable": { "type": "object", "properties": { "items": { "type": "string", "enumValues": ["disabled", "enabled"] } } }, "item": { "type": "object", "properties": { "padding": { "type": "string|object" } } } }, "slots": { "itemTemplate": { "data": {} }, "noData": { "data": {} } }, "events": { "ojItemAction": {}, "ojFirstSelectedItem": {}, "ojContextMenuAction": { "bubbles": true }, "ojContextMenuSelection": { "bubbles": true }, "ojReorder": {} }, "extension": { "_WRITEBACK_PROPS": ["currentItem", "selected"], "_READ_ONLY_PROPS": ["currentItem"], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-labelledby", "id"] } }, { "selectionMode": "none", "reorderable": { "items": "disabled" }, "item": { "padding": "disabled" } }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useCollectionInteractionContext_1.CollectionInteractionContext] });
    const isEventClickthroughDisabled = function (event, rootElement) {
        let node = event.target;
        while (node != null && node !== rootElement) {
            if (isClickthroughDisabled(node)) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };
    const isClickthroughDisabled = function (element) {
        return element.dataset['ojClickthrough'] === 'disabled';
    };
});

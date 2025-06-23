define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/hooks", "preact/compat", "@oracle/oraclejet-preact/UNSAFE_TagCloud", "@oracle/oraclejet-preact/hooks/UNSAFE_useVisBusyStateContext", "../hooks/UNSAFE_useVisBusyState/useVisBusyState", "./utils", "@oracle/oraclejet-preact/UNSAFE_VisStatusMessage", "../hooks/UNSAFE_useVizCategories/useVizCategories", "ojs/ojvcomponent", "./utils", "../hooks/UNSAFE_useDataProvider/useDataProvider", "../utils/UNSAFE_vizUtils/TemplateHandler", "oj-c/hooks/PRIVATE_useVisContextMenu/useVisContextMenu", "css!oj-c/tag-cloud/tag-cloud-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, hooks_1, compat_1, UNSAFE_TagCloud_1, UNSAFE_useVisBusyStateContext_1, useVisBusyState_1, utils_1, UNSAFE_VisStatusMessage_1, useVizCategories_1, ojvcomponent_1, utils_2, useDataProvider_1, TemplateHandler_1, useVisContextMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TagCloud = void 0;
    const HIGHLIGHTED_DEFAULT = [];
    const SELECTION_DEFAULT = [];
    const HIDDEN_DEFAULT = [];
    function TagCloudComp({ hiddenCategories = HIDDEN_DEFAULT, data = null, highlightedCategories = HIGHLIGHTED_DEFAULT, hoverBehavior = 'none', layout = 'rectangular', selection = SELECTION_DEFAULT, selectionMode = 'none', highlightMatch = 'all', contextMenuConfig, onOjContextMenuAction, onOjContextMenuSelection, ...props }) {
        const rootRef = (0, hooks_1.useRef)(null);
        const busyStateContext = (0, useVisBusyState_1.useVisBusyState)(rootRef, 'oj-c-tag-cloud: ');
        const { data: compData } = (0, useDataProvider_1.useDataProvider)({
            data: data ? data : undefined,
            addBusyState: busyStateContext.addBusyState
        });
        const isHighlightOn = hoverBehavior === 'dim';
        const getItemContext = (0, hooks_1.useCallback)((context, index) => {
            return {
                data: context.data,
                key: context.key,
                index
            };
        }, []);
        const idToDPItemMap = new Map(compData.map((item) => [item.key, item.data]));
        const items = (0, compat_1.useMemo)(() => {
            const items = props.itemTemplate
                ? (0, TemplateHandler_1.processTemplate)(compData, props.itemTemplate, getItemContext, 'oj-c-tag-cloud-item')
                : compData.map((item) => item.data);
            return items;
        }, [props.itemTemplate, compData, getItemContext]);
        const [idItemMap, preactItems] = (0, compat_1.useMemo)(() => {
            const idItemMap = new Map();
            const preactItems = items.map((item) => {
                if (item.id != null || item.key != null)
                    idItemMap.set(item.id || item.key, item);
                return (0, utils_2.transformItem)(item);
            });
            return [idItemMap, preactItems];
        }, [items]);
        const [hasUrl, categoriesItems] = (0, compat_1.useMemo)(() => {
            let hasUrl = false;
            const categories = items.map((item, itemIndex) => {
                hasUrl = hasUrl || item.url != null;
                return { id: preactItems[itemIndex].id, categories: item.categories || [] };
            });
            return [hasUrl, categories];
        }, [preactItems, items]);
        const { hiddenIds, highlightedIds, updateHighlighted } = (0, useVizCategories_1.useVizCategories)(categoriesItems, (item) => item.categories, hiddenCategories, highlightedCategories, 'any', highlightMatch, props.onHiddenCategoriesChanged, props.onHighlightedCategoriesChanged);
        const itemActionHandler = (detail) => {
            const item = idItemMap.get(detail.id);
            if (item?.url) {
                (0, utils_1.executeLink)(item.url);
            }
        };
        const selectionChangeHandler = (detail) => {
            props.onSelectionChanged?.(detail.ids);
        };
        const inputHandler = (detail) => {
            if (isHighlightOn)
                updateHighlighted(detail.id);
        };
        const datatip = props.datatip != undefined
            ? (d) => {
                return {
                    content: props.datatip?.({ id: d.data.id }),
                    borderColor: undefined
                };
            }
            : undefined;
        const { preactContextMenuConfig } = (0, useVisContextMenu_1.useVisContextMenu)(idToDPItemMap, contextMenuConfig, onOjContextMenuAction, onOjContextMenuSelection);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, children: (0, jsx_runtime_1.jsx)(UNSAFE_useVisBusyStateContext_1.VisBusyStateContext.Provider, { value: busyStateContext, children: !data || items.length === 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_VisStatusMessage_1.VisNoData, { "aria-label": props['aria-label'], "aria-describedby": props['aria-describedby'], "aria-labelledby": props['aria-labelledby'] })) : ((0, jsx_runtime_1.jsx)(UNSAFE_TagCloud_1.TagCloud, { layout: layout, datatip: datatip, highlightedIds: isHighlightOn ? highlightedIds : undefined, accessibleLabel: props['aria-label'], "aria-describedBy": props['aria-describedby'], "aria-labelledBy": props['aria-labelledby'], items: preactItems.filter((i) => !hiddenIds?.includes(i.id)), selectionMode: selectionMode, onSelectionChange: selectionChangeHandler, onItemAction: hasUrl ? itemActionHandler : undefined, onItemFocus: inputHandler, onItemHover: inputHandler, selectedIds: selectionMode === 'none' ? undefined : selection, width: "100%", height: "100%", contextMenuConfig: contextMenuConfig ? preactContextMenuConfig : undefined })) }) }));
    }
    exports.TagCloud = (0, ojvcomponent_1.registerCustomElement)('oj-c-tag-cloud', TagCloudComp, "TagCloud", { "properties": { "data": { "type": "DataProvider|null" }, "datatip": { "type": "function" }, "hiddenCategories": { "type": "Array<string>", "writeback": true }, "touchResponse": { "type": "string", "enumValues": ["auto", "touchStart"] }, "highlightMatch": { "type": "string", "enumValues": ["all", "any"] }, "highlightedCategories": { "type": "Array<string>", "writeback": true }, "hoverBehavior": { "type": "string", "enumValues": ["none", "dim"] }, "layout": { "type": "string", "enumValues": ["cloud", "rectangular"] }, "selectionMode": { "type": "string", "enumValues": ["none", "multiple", "single"] }, "selection": { "type": "Array<any>", "writeback": true }, "contextMenuConfig": { "type": "object", "properties": { "accessibleLabel": { "type": "string" }, "items": { "type": "function" } } } }, "slots": { "itemTemplate": { "data": {} } }, "events": { "ojContextMenuAction": { "bubbles": true }, "ojContextMenuSelection": { "bubbles": true } }, "extension": { "_WRITEBACK_PROPS": ["hiddenCategories", "highlightedCategories", "selection"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-describedby", "aria-labelledby"] } }, { "hiddenCategories": [], "data": null, "highlightedCategories": [], "hoverBehavior": "none", "layout": "rectangular", "selection": [], "selectionMode": "none", "highlightMatch": "all" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

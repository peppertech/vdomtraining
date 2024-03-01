define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/hooks", "preact/compat", "@oracle/oraclejet-preact/UNSAFE_TagCloud", "ojs/ojcontext", "./utils", "@oracle/oraclejet-preact/UNSAFE_VisStatusMessage", "../hooks/UNSAFE_useVizCategories/useVizCategories", "ojs/ojvcomponent", "./utils", "../hooks/UNSAFE_useDataProvider/useDataProvider", "../utils/UNSAFE_vizUtils/TemplateHandler", "css!oj-c/tag-cloud/tag-cloud-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, hooks_1, compat_1, UNSAFE_TagCloud_1, Context, utils_1, UNSAFE_VisStatusMessage_1, useVizCategories_1, ojvcomponent_1, utils_2, useDataProvider_1, TemplateHandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TagCloud = void 0;
    function TagCloudComp({ hiddenCategories = [], data = null, highlightedCategories = [], hoverBehavior = 'none', layout = 'rectangular', selection = [], selectionMode = 'none', highlightMatch = 'all', ...props }) {
        const rootRef = (0, hooks_1.useRef)(null);
        const addBusyState = (0, hooks_1.useCallback)((description) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: description })
                : () => { };
        }, []);
        const { data: compData } = (0, useDataProvider_1.useDataProvider)({
            data: data ? data : undefined,
            addBusyState: addBusyState
        });
        const isHighlightOn = hoverBehavior === 'dim';
        const getItemContext = (0, hooks_1.useCallback)((context, index) => {
            return {
                data: context.data,
                key: context.key,
                index
            };
        }, []);
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
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, children: !data || items.length === 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_VisStatusMessage_1.VisNoData, { "aria-label": props['aria-label'] })) : ((0, jsx_runtime_1.jsx)(UNSAFE_TagCloud_1.TagCloud, { layout: layout, datatip: datatip, highlightedIds: isHighlightOn ? highlightedIds : undefined, hiddenIds: hiddenIds, accessibleLabel: props['aria-label'], "aria-describedBy": props['aria-describedby'], "aria-labelledBy": props['aria-labelledby'], items: preactItems, selectionMode: selectionMode, onSelectionChange: selectionChangeHandler, onItemAction: hasUrl ? itemActionHandler : undefined, onItemInput: inputHandler, selectedIds: selectionMode === 'none' ? undefined : selection, width: "100%", height: "100%" })) }));
    }
    exports.TagCloud = (0, ojvcomponent_1.registerCustomElement)('oj-c-tag-cloud', TagCloudComp, "TagCloud", { "properties": { "data": { "type": "DataProvider|null" }, "datatip": { "type": "function" }, "hiddenCategories": { "type": "Array<string>", "writeback": true }, "touchResponse": { "type": "string", "enumValues": ["auto", "touchStart"] }, "highlightMatch": { "type": "string", "enumValues": ["all", "any"] }, "highlightedCategories": { "type": "Array<string>", "writeback": true }, "hoverBehavior": { "type": "string", "enumValues": ["none", "dim"] }, "layout": { "type": "string", "enumValues": ["cloud", "rectangular"] }, "selectionMode": { "type": "string", "enumValues": ["none", "multiple", "single"] }, "selection": { "type": "Array<any>", "writeback": true } }, "slots": { "itemTemplate": { "data": {} } }, "extension": { "_WRITEBACK_PROPS": ["hiddenCategories", "highlightedCategories", "selection"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-describedby", "aria-labelledby"] } }, { "hiddenCategories": [], "data": null, "highlightedCategories": [], "hoverBehavior": "none", "layout": "rectangular", "selection": [], "selectionMode": "none", "highlightMatch": "all" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

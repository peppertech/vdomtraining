define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojcontext", "preact/hooks", "ojs/ojvcomponent", "preact/compat", "@oracle/oraclejet-preact/UNSAFE_CardFlexView", "@oracle/oraclejet-preact/UNSAFE_CardGridView", "./useCardViewPreact", "./cardViewItem", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "@oracle/oraclejet-preact/UNSAFE_EmptyList", "../hooks/PRIVATE_useSelectionContext/SelectionContext", "css!oj-c/card-view/card-view-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, Context, hooks_1, ojvcomponent_1, compat_1, UNSAFE_CardFlexView_1, UNSAFE_CardGridView_1, useCardViewPreact_1, cardViewItem_1, UNSAFE_useTranslationBundle_1, UNSAFE_EmptyList_1, SelectionContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CardView = void 0;
    const CardViewPreactWrapper = ({ addBusyState, isClickthroughDisabled, itemTemplate, noData, ...rest }) => {
        const { status, cardViewProps } = (0, useCardViewPreact_1.useCardViewPreact)(rest, addBusyState, isClickthroughDisabled);
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        if (status === 'success' && !cardViewProps.hasMore && cardViewProps.data?.length === 0) {
            if (noData) {
                return (0, jsx_runtime_1.jsx)(UNSAFE_EmptyList_1.EmptyList, { children: noData(compat_1.Children) });
            }
            else {
                const noDataContent = translations.noData_message();
                return (0, jsx_runtime_1.jsx)(UNSAFE_EmptyList_1.EmptyList, { children: noDataContent });
            }
        }
        const selectInfo = {
            selected: cardViewProps.selectedKeys,
            selectionMode: cardViewProps.selectionMode,
            onSelectedChange: rest.onSelectedChanged
        };
        const itemRenderer = (0, hooks_1.useCallback)((context) => {
            return (0, jsx_runtime_1.jsx)(cardViewItem_1.CardViewItem, { context: context, itemTemplate: itemTemplate });
        }, [itemTemplate]);
        if (cardViewProps.columns) {
            return ((0, jsx_runtime_1.jsx)(SelectionContext_1.SelectionContext.Provider, { value: selectInfo, children: (0, jsx_runtime_1.jsx)(UNSAFE_CardGridView_1.CardGridView, { ...cardViewProps, children: itemRenderer }) }));
        }
        else {
            return ((0, jsx_runtime_1.jsx)(SelectionContext_1.SelectionContext.Provider, { value: selectInfo, children: (0, jsx_runtime_1.jsx)(UNSAFE_CardFlexView_1.CardFlexView, { ...cardViewProps, children: itemRenderer }) }));
        }
    };
    const CardViewImpl = ({ columns = 'auto', data = null, focusBehavior = 'card', gutterSize = 'sm', initialAnimation = 'slideUp', scrollPolicyOptions = { fetchSize: 25 }, selectionMode = 'none', reorderable = { items: 'disabled' }, ...rest }) => {
        const rootRef = (0, hooks_1.useRef)();
        const isClickthroughDisabled = (0, hooks_1.useCallback)((target) => {
            if (target === null || rootRef.current === undefined) {
                return false;
            }
            return isEventClickthroughDisabled({ target }, rootRef.current);
        }, []);
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({
                    description: `oj-c-card-view: ${desc}`
                })
                : () => { };
        }, []);
        const props = {
            columns,
            data,
            focusBehavior,
            gutterSize,
            initialAnimation,
            scrollPolicyOptions,
            selectionMode,
            reorderable,
            ...rest
        };
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: rootRef, children: (0, jsx_runtime_1.jsx)(CardViewPreactWrapper, { addBusyState: addBusyState, isClickthroughDisabled: isClickthroughDisabled, ...props }) }));
    };
    exports.CardView = (0, ojvcomponent_1.registerCustomElement)('oj-c-card-view', CardViewImpl, "CardView", { "properties": { "currentItem": { "type": "string|number", "readOnly": true, "writeback": true }, "data": { "type": "DataProvider|null" }, "gutterSize": { "type": "string", "enumValues": ["xs", "sm", "md", "lg", "xl"] }, "scrollPolicyOptions": { "type": "object", "properties": { "fetchSize": { "type": "number" }, "scroller": { "type": "string" } } }, "selected": { "type": "object", "writeback": true }, "selectionMode": { "type": "string", "enumValues": ["none", "multiple", "single", "singleRequired"] }, "initialAnimation": { "type": "string", "enumValues": ["slideUp", "slideDown"] }, "focusBehavior": { "type": "string", "enumValues": ["content", "card"] }, "columns": { "type": "number|string" }, "reorderable": { "type": "object", "properties": { "items": { "type": "string", "enumValues": ["disabled", "enabled"] } } } }, "slots": { "noData": { "data": {} }, "itemTemplate": { "data": {} }, "skeletonTemplate": { "data": {} } }, "events": { "ojReorder": {} }, "extension": { "_WRITEBACK_PROPS": ["currentItem", "selected"], "_READ_ONLY_PROPS": ["currentItem"], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-labelledby", "id"] } }, { "columns": "auto", "data": null, "focusBehavior": "card", "gutterSize": "sm", "initialAnimation": "slideUp", "scrollPolicyOptions": { "fetchSize": 25 }, "selectionMode": "none", "reorderable": { "items": "disabled" } }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
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

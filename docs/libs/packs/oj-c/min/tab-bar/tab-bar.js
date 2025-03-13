define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "oj-c/hooks/UNSAFE_useDataProvider/useDataProvider", "ojs/ojcontext", "./DataTabBar", "preact/hooks", "preact/compat"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, useDataProvider_1, Context, DataTabBar_1, hooks_1, compat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TabBar = void 0;
    function isDataProvider(data) {
        return data && 'fetchFirst' in data;
    }
    exports.TabBar = (0, ojvcomponent_1.registerCustomElement)('oj-c-tab-bar', (0, compat_1.forwardRef)(({ data = [], onOjBeforeSelect, onOjRemove, onOjReorder, onOjSelectionAction, onSelectionChanged, reorderable = 'disabled', overflow = 'hidden', truncation = 'none', selection, display = 'standard', layout = 'stretch', edge = 'top', 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, id }, ref) => {
        const rootRef = (0, hooks_1.useRef)(null);
        const addBusyState = (0, hooks_1.useCallback)((description = 'MessageBanner: busyState') => {
            return rootRef.current
                ? Context.getContext(rootRef.current).getBusyContext().addBusyState({ description })
                : () => { };
        }, []);
        const { data: dataProviderData } = (0, useDataProvider_1.useDataProvider)({
            data: !Array.isArray(data) && isDataProvider(data) ? data : undefined,
            addBusyState
        });
        const dataArr = (0, hooks_1.useMemo)(() => {
            let retDataArr = [];
            if (Array.isArray(data)) {
                retDataArr = data;
            }
            else {
                if (isDataProvider(data)) {
                    retDataArr = dataProviderData.map((item) => {
                        return { ...item.data };
                    });
                }
            }
            return retDataArr;
        }, [data, dataProviderData]);
        const handleRemove = (event) => {
            if (onOjRemove) {
                onOjRemove({ key: event.value });
            }
        };
        const handleReorder = (event) => {
            if (onOjReorder) {
                onOjReorder({ reorderedKeys: event.reorderedKeys });
            }
        };
        const handleSelect = (event) => {
            (async () => {
                handleOnSelectionChanged: {
                    if (onOjBeforeSelect) {
                        try {
                            await onOjBeforeSelect({ key: event.value });
                        }
                        catch {
                            break handleOnSelectionChanged;
                        }
                    }
                    if (onOjSelectionAction) {
                        onOjSelectionAction({ previousValue: selection || '', value: event.value });
                    }
                    if (selection === event.value) {
                        return;
                    }
                    if (onSelectionChanged) {
                        onSelectionChanged(event.value);
                    }
                }
            })();
        };
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            _doReorderHelper: (tabBarKeys) => {
                onOjReorder && onOjReorder({ reorderedKeys: tabBarKeys });
                return Promise.resolve();
            }
        }));
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, children: (0, jsx_runtime_1.jsx)(DataTabBar_1.DataTabBar, { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, data: dataArr, onRemove: handleRemove, onReorder: handleReorder, onSelect: handleSelect, reorderable: reorderable, selection: selection, display: display, edge: edge, layout: layout, overflow: overflow, truncation: truncation }) }));
    }), "TabBar", { "properties": { "data": { "type": "Array<object>|DataProvider" }, "selection": { "type": "string|number", "writeback": true }, "reorderable": { "type": "string", "enumValues": ["disabled", "enabled"] }, "overflow": { "type": "string", "enumValues": ["hidden", "popup", "conveyor"] }, "display": { "type": "string", "enumValues": ["standard", "icons", "stacked"] }, "layout": { "type": "string", "enumValues": ["stretch", "condense"] }, "edge": { "type": "string", "enumValues": ["top", "bottom"] }, "truncation": { "type": "string", "enumValues": ["none", "progressive"] } }, "events": { "ojBeforeSelect": { "cancelable": true }, "ojRemove": {}, "ojReorder": {}, "ojSelectionAction": {} }, "extension": { "_WRITEBACK_PROPS": ["selection"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "id", "aria-labelledby"] }, "methods": { "_doReorderHelper": {} } }, { "data": [], "reorderable": "disabled", "overflow": "hidden", "truncation": "none", "display": "standard", "layout": "stretch", "edge": "top" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

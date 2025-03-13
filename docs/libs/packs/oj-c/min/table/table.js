define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojcustomelement-registry", "ojs/ojcontext", "ojs/ojvcomponent", "preact/hooks", "../hooks/UNSAFE_useListData/useListData", "@oracle/oraclejet-preact/UNSAFE_TableView", "ojs/ojkeyset", "../utils/PRIVATE_keyUtils/keySetUtils", "@oracle/oraclejet-preact/hooks/UNSAFE_useCollectionInteractionContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "css!oj-c/table/table-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojcustomelement_registry_1, Context, ojvcomponent_1, hooks_1, useListData_1, UNSAFE_TableView_1, ojkeyset_1, keySetUtils_1, UNSAFE_useCollectionInteractionContext_1, UNSAFE_useFormVariantContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Table = void 0;
    const _SELECTION_COLUMN_KEY = 'oj-c-table_selection';
    const _selectedDefault = {};
    const _selectionModeDefault = { row: 'none', column: 'none' };
    const _scrollPolicyOptionsDefault = { fetchSize: 25 };
    const _isClickthroughDisabled = function (element) {
        return element.dataset['ojClickthrough'] === 'disabled';
    };
    const _isEventClickthroughDisabled = function (event, rootElement) {
        let node = event.target;
        while (node != null && node !== rootElement) {
            if (_isClickthroughDisabled(node)) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };
    function TableImpl({ 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, id, data, columns, row, horizontalGridVisible = 'enabled', verticalGridVisible = 'disabled', layout = 'contents', currentCellOverride, onCurrentCellChanged, selected = _selectedDefault, selectionMode = _selectionModeDefault, onSelectedChanged, selectAllControl = 'visible', columnOrder, cellTemplate, headerTemplate, footerTemplate, templates, onOjRowAction, noData, columnWidths, scrollPolicyOptions = _scrollPolicyOptionsDefault }) {
        const rootRef = (0, hooks_1.useRef)(null);
        const tableViewRef = (0, hooks_1.useRef)(null);
        const isClickthroughDisabled = (0, hooks_1.useCallback)((target) => {
            if (target == null || rootRef.current == null) {
                return false;
            }
            return _isEventClickthroughDisabled({ target }, rootRef.current);
        }, []);
        const [listDataState, onLoadRange] = (0, useListData_1.useListData)(data, {
            fetchSize: scrollPolicyOptions?.fetchSize
        });
        const onLoadMore = (0, hooks_1.useCallback)(() => {
            if (listDataState.status === 'success' && listDataState.data && onLoadRange) {
                const fetchSize = scrollPolicyOptions && scrollPolicyOptions.fetchSize != null
                    ? scrollPolicyOptions.fetchSize
                    : 25;
                onLoadRange({ offset: 0, count: listDataState.data.data.length + fetchSize });
            }
        }, [listDataState, onLoadRange, scrollPolicyOptions]);
        const hasMore = listDataState.status === 'loading' ||
            (listDataState.status === 'success' && listDataState.data.sizePrecision === 'atLeast');
        const realizedColumnWidths = (0, hooks_1.useMemo)(() => {
            const preactColumnWidths = { ...columnWidths };
            if (selectionMode?.row === 'multiple') {
                preactColumnWidths[_SELECTION_COLUMN_KEY] = 36;
            }
            return preactColumnWidths;
        }, [selectionMode?.row, columnWidths]);
        function getRowContext(context) {
            const { data } = context;
            return {
                item: data
            };
        }
        const tableCellSelectorRenderer = (context) => {
            return context.selector != null ? context.selector() : undefined;
        };
        const tableHeaderSelectorRenderer = (context) => {
            return context.selector != null ? ((0, jsx_runtime_1.jsx)("div", { "data-oj-table-selector": 'all', children: context.selector() })) : undefined;
        };
        function getPreactHeaderRenderer(headerTemplate) {
            if (headerTemplate) {
                return (context) => {
                    const templateContext = {
                        key: context.key,
                        headerText: context.headerText,
                        isTabbable: context.isTabbable
                    };
                    return headerTemplate(templateContext);
                };
            }
            return undefined;
        }
        function getPreactFooterRenderer(footerTemplate) {
            if (footerTemplate) {
                return (context) => {
                    const templateContext = {
                        key: context.key,
                        footerText: context.footerText,
                        isTabbable: context.isTabbable
                    };
                    return footerTemplate(templateContext);
                };
            }
            return undefined;
        }
        function getPreactNoDataRenderer(noData) {
            if (noData) {
                return (context) => {
                    return noData({ isTabbable: context.isTabbable });
                };
            }
            return undefined;
        }
        function getPreactCellRenderer(cellTemplate, field) {
            return (context) => {
                const templateContext = {
                    item: context.rowData,
                    columnKey: context.columnKey,
                    data: field != null ? context.rowData.data[field] : undefined,
                    isTabbable: context.isTabbable
                };
                return cellTemplate
                    ? cellTemplate(templateContext)
                    : templateContext.data != null
                        ? String(templateContext.data)
                        : undefined;
            };
        }
        function getPreactColumns(cols, globalCellTemplate, globalHeaderTemplate, globalFooterTemplate, templates) {
            const preactColumns = {};
            if (selectionMode?.row === 'multiple') {
                preactColumns[_SELECTION_COLUMN_KEY] = {
                    sticky: 'enabled',
                    selectable: 'disabled',
                    renderer: tableCellSelectorRenderer,
                    headerRenderer: selectAllControl !== 'hidden' ? tableHeaderSelectorRenderer : undefined,
                    padding: 'disabled',
                    headerPadding: 'disabled',
                    tooltip: 'disabled',
                    headerTooltip: 'disabled'
                };
            }
            Object.keys(cols).forEach((key) => {
                const colKey = key;
                const column = cols[colKey];
                const cellRenderer = column.template && templates && templates[column.template]
                    ? getPreactCellRenderer(templates[column.template], column.field)
                    : getPreactCellRenderer(globalCellTemplate, column.field);
                const headerCellRenderer = column.headerTemplate && templates && templates[column.headerTemplate]
                    ? getPreactHeaderRenderer(templates[column.headerTemplate])
                    : getPreactHeaderRenderer(globalHeaderTemplate);
                const footerCellRenderer = column.footerTemplate && templates && templates[column.footerTemplate]
                    ? getPreactFooterRenderer(templates[column.footerTemplate])
                    : getPreactFooterRenderer(globalFooterTemplate);
                const headerText = column.headerText ?? undefined;
                const footerText = column.footerText ?? undefined;
                const maxWidth = column.maxWidth ?? undefined;
                const minWidth = column.minWidth ?? undefined;
                const weight = column.weight ?? undefined;
                let padding;
                const columnPadding = column.padding;
                if (typeof columnPadding === 'function') {
                    padding = (context) => {
                        const internalContext = getRowContext(context);
                        return columnPadding(internalContext);
                    };
                }
                else {
                    padding = columnPadding ?? 'enabled';
                }
                const headerPadding = column.headerPadding ?? 'enabled';
                const footerPadding = column.footerPadding ?? 'enabled';
                let tooltip;
                const columnTooltip = column.tooltip;
                if (typeof columnTooltip === 'function') {
                    tooltip = (context) => {
                        const internalContext = getRowContext(context);
                        return columnTooltip(internalContext);
                    };
                }
                else {
                    tooltip = columnTooltip ?? 'enabled';
                }
                const headerTooltip = column.headerTooltip ?? 'enabled';
                const footerTooltip = column.footerTooltip ?? 'enabled';
                const sticky = column.sticky ?? 'disabled';
                const horizontalAlignment = column.horizontalAlignment ?? 'start';
                preactColumns[colKey] = {
                    headerText: headerText,
                    footerText: footerText,
                    renderer: cellRenderer,
                    headerRenderer: headerCellRenderer,
                    footerRenderer: footerCellRenderer,
                    maxWidth,
                    minWidth,
                    weight,
                    padding,
                    headerPadding,
                    footerPadding,
                    tooltip,
                    headerTooltip,
                    footerTooltip,
                    sticky,
                    horizontalAlignment
                };
            });
            return preactColumns;
        }
        const handleKeyDown = (0, hooks_1.useCallback)((event) => {
            if (event.key === ' ') {
                const targetElement = event.target;
                if (targetElement.children.length > 0 &&
                    targetElement.children[0].dataset['ojTableSelector'] === 'all' &&
                    !event.repeat) {
                    let newRowSelection;
                    if (selected.row?.isAddAll() && selected.row.keys.deletedKeys?.size === 0) {
                        newRowSelection = new ojkeyset_1.KeySetImpl();
                    }
                    else {
                        newRowSelection = new ojkeyset_1.AllKeySetImpl();
                    }
                    onSelectedChanged({
                        row: newRowSelection,
                        column: new ojkeyset_1.KeySetImpl()
                    });
                }
            }
        }, [onSelectedChanged, selected]);
        const selectAllHandlerProps = selectionMode?.row === 'multiple' && selectAllControl !== 'hidden'
            ? { onKeyDown: handleKeyDown }
            : {};
        const preactColumns = (0, hooks_1.useMemo)(() => {
            return columns
                ? getPreactColumns(columns, cellTemplate, headerTemplate, footerTemplate, templates)
                : {};
        }, [columns, cellTemplate, headerTemplate, footerTemplate, templates, selectionMode?.row]);
        const preactColumnOrder = (0, hooks_1.useMemo)(() => {
            const newColumnOrder = [];
            let hasSelectorColumn = false;
            if (selectionMode?.row === 'multiple') {
                newColumnOrder.push(_SELECTION_COLUMN_KEY);
                hasSelectorColumn = true;
            }
            if (columnOrder != null) {
                for (const key of columnOrder) {
                    if (preactColumns[key] != null && !newColumnOrder.includes(key)) {
                        newColumnOrder.push(key);
                    }
                }
            }
            else {
                for (const [key] of Object.entries(preactColumns)) {
                    if (key !== _SELECTION_COLUMN_KEY) {
                        newColumnOrder.push(key);
                    }
                }
            }
            return newColumnOrder.length === 1 && hasSelectorColumn ? [] : newColumnOrder;
        }, [columnOrder, selectionMode?.row, preactColumns]);
        const preactData = listDataState.status === 'success' ? listDataState?.data?.data || [] : [];
        const preactGetRowKey = (data) => {
            return data.metadata.key;
        };
        const preactGetAccessibleRowHeaders = (preactContext) => {
            const internalContext = getRowContext(preactContext);
            const rowHeaders = new Set();
            if (row != null && row.accessibleRowHeader != null) {
                if (typeof row.accessibleRowHeader === 'string') {
                    rowHeaders.add(row.accessibleRowHeader);
                }
                else if (Array.isArray(row.accessibleRowHeader)) {
                    row.accessibleRowHeader.forEach((header) => rowHeaders.add(header));
                }
                else if (typeof row.accessibleRowHeader === 'function') {
                    const result = row.accessibleRowHeader(internalContext);
                    if (typeof result === 'string') {
                        rowHeaders.add(result);
                    }
                    else if (Array.isArray(result)) {
                        result.forEach((header) => rowHeaders.add(header));
                    }
                }
            }
            else if (preactColumnOrder.length > 0) {
                if (selectionMode?.row === 'multiple') {
                    rowHeaders.add(preactColumnOrder[1]);
                }
                else {
                    rowHeaders.add(preactColumnOrder[0]);
                }
            }
            return rowHeaders;
        };
        const preactOnRowAction = (0, hooks_1.useCallback)((eventDetail) => {
            if (onOjRowAction && eventDetail != null && !isClickthroughDisabled(eventDetail.target)) {
                onOjRowAction({ context: getRowContext(eventDetail.context) });
            }
        }, [onOjRowAction, isClickthroughDisabled, getRowContext]);
        const gridlines = (0, hooks_1.useMemo)(() => ({
            horizontal: horizontalGridVisible === 'enabled' ? 'visible' : 'hidden',
            vertical: verticalGridVisible === 'enabled' ? 'visible' : 'hidden'
        }), [horizontalGridVisible, verticalGridVisible]);
        const noDataRenderer = (0, hooks_1.useMemo)(() => {
            return getPreactNoDataRenderer(noData);
        }, [noData]);
        const preactSelected = (0, hooks_1.useMemo)(() => {
            return selected
                ? {
                    row: selected.row ? (0, keySetUtils_1.keySetToKeys)(selected.row) : undefined,
                    column: selected.column ? (0, keySetUtils_1.keySetToKeys)(selected.column) : undefined
                }
                : undefined;
        }, [selected?.row, selected?.column]);
        const preactOnSelectionChange = (0, hooks_1.useCallback)((detail) => {
            if (!isClickthroughDisabled(detail.target)) {
                const value = detail.value;
                const rowKeySet = value.row
                    ? (0, keySetUtils_1.keysToKeySet)(value.row)
                    : undefined;
                const columnKeySet = value.column
                    ? (0, keySetUtils_1.keysToKeySet)(value.column)
                    : undefined;
                onSelectedChanged({
                    row: rowKeySet,
                    column: columnKeySet
                });
            }
        }, [onSelectedChanged, isClickthroughDisabled]);
        const onPersistCurrentCell = (0, hooks_1.useCallback)((detail) => {
            if (onCurrentCellChanged) {
                onCurrentCellChanged(detail.value);
            }
        }, [onCurrentCellChanged]);
        const busyContextRef = (0, hooks_1.useRef)();
        const childBusyContextRef = (0, hooks_1.useRef)();
        const resolveDataBusyStateRef = (0, hooks_1.useRef)();
        const resolveContentBusyStateRef = (0, hooks_1.useRef)();
        const [isInitialLoading, setIsInitialLoading] = (0, hooks_1.useState)(layout === 'contents');
        const isInitialLoadingRef = (0, hooks_1.useRef)(isInitialLoading);
        (0, hooks_1.useEffect)(() => {
            busyContextRef.current = Context.getContext(rootRef.current).getBusyContext();
            childBusyContextRef.current = Context.getContext(tableViewRef.current).getBusyContext();
        }, []);
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-table: ${desc}`
            });
        }, []);
        (0, hooks_1.useEffect)(() => {
            if (listDataState.status === 'loading') {
                resolveDataBusyStateRef.current = addBusyState('Table is loading data');
            }
            else {
                if (isInitialLoadingRef.current) {
                    resolveContentBusyStateRef.current = addBusyState('Table content is initializing');
                    childBusyContextRef.current.whenReady().then(function () {
                        if (resolveContentBusyStateRef.current) {
                            resolveContentBusyStateRef.current();
                            resolveContentBusyStateRef.current = undefined;
                        }
                        setIsInitialLoading(false);
                        isInitialLoadingRef.current = false;
                    });
                }
            }
            return () => {
                if (resolveDataBusyStateRef.current) {
                    resolveDataBusyStateRef.current();
                    resolveDataBusyStateRef.current = undefined;
                }
                if (resolveContentBusyStateRef.current) {
                    resolveContentBusyStateRef.current();
                    resolveContentBusyStateRef.current = undefined;
                }
            };
        }, [listDataState.status, addBusyState]);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, children: (0, jsx_runtime_1.jsx)("div", { ref: tableViewRef, "data-oj-context": true, ...selectAllHandlerProps, ...(cellTemplate ? { 'data-oj-ct': true } : {}), ...(headerTemplate ? { 'data-oj-ht': true } : {}), ...(footerTemplate ? { 'data-oj-ft': true } : {}), ...(noData ? { 'data-oj-ndt': true } : {}), style: "display: contents;", children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormVariantContext_1.FormVariantContext.Provider, { value: 'embedded', children: (0, jsx_runtime_1.jsx)(ojvcomponent_1.ReportBusyContext.Provider, { value: tableViewRef, children: (0, jsx_runtime_1.jsx)(UNSAFE_TableView_1.TableView, { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, columns: preactColumns, data: preactData, getRowKey: preactGetRowKey, getAccessibleRowHeaders: preactGetAccessibleRowHeaders, gridlines: gridlines, layout: isInitialLoading ? 'pending' : layout, selected: preactSelected, selectionMode: selectionMode, onSelectionChange: preactOnSelectionChange, columnOrder: preactColumnOrder, onRowAction: preactOnRowAction, noDataRenderer: noDataRenderer, columnWidths: realizedColumnWidths, onLoadMore: onLoadMore, hasMore: hasMore, currentCellOverride: currentCellOverride, onPersistCurrentCell: onPersistCurrentCell, width: '100%' }) }) }) }) }));
    }
    exports.Table = (0, ojvcomponent_1.registerCustomElement)('oj-c-table', TableImpl, "Table", { "properties": { "layout": { "type": "string", "enumValues": ["fixed", "contents"] }, "data": { "type": "DataProvider" }, "columns": { "type": "object" }, "row": { "type": "object", "properties": { "accessibleRowHeader": { "type": "string|Array<string>|function" } } }, "horizontalGridVisible": { "type": "string", "enumValues": ["disabled", "enabled"] }, "verticalGridVisible": { "type": "string", "enumValues": ["disabled", "enabled"] }, "selected": { "type": "object", "properties": { "column": { "type": "object" }, "row": { "type": "object" } }, "writeback": true }, "selectionMode": { "type": "object", "properties": { "column": { "type": "string", "enumValues": ["none", "multiple", "single"] }, "row": { "type": "string", "enumValues": ["none", "multiple", "single"] } } }, "selectAllControl": { "type": "string", "enumValues": ["hidden", "visible"] }, "columnOrder": { "type": "Array<string>", "writeback": true }, "currentCellOverride": { "type": "object" }, "currentCell": { "type": "object", "readOnly": true, "writeback": true }, "columnWidths": { "type": "object", "writeback": true }, "scrollPolicyOptions": { "type": "object", "properties": { "fetchSize": { "type": "number" } } } }, "slots": { "cellTemplate": { "data": {} }, "headerTemplate": { "data": {} }, "footerTemplate": { "data": {} }, "noData": { "data": {} } }, "extension": { "_DYNAMIC_SLOT": { "prop": "templates", "isTemplate": 1 }, "_WRITEBACK_PROPS": ["selected", "columnOrder", "currentCell", "columnWidths"], "_READ_ONLY_PROPS": ["currentCell"], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-labelledby", "id"] }, "events": { "ojRowAction": { "bubbles": true } } }, { "horizontalGridVisible": "enabled", "verticalGridVisible": "disabled", "layout": "contents", "selected": {}, "selectionMode": { "row": "none", "column": "none" }, "selectAllControl": "visible", "scrollPolicyOptions": { "fetchSize": 25 } }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useCollectionInteractionContext_1.CollectionInteractionContext] });
    const metadata = (0, ojcustomelement_registry_1.getMetadata)('oj-c-table');
    metadata.properties.__oj_private_do_not_use_userAssistanceDensity = {
        binding: {
            provide: [
                { name: 'containerUserAssistanceDensity', default: 'compact' },
                { name: 'userAssistanceDensity', default: 'compact' }
            ]
        }
    };
});

define(["require", "exports", "preact/jsx-runtime", "text!./data/groupdata.json", "ojs/ojmutablearraytreedataprovider", "ojs/ojflattenedtreedataproviderview", "ojs/ojkeyset", "ojs/ojtable", "ojs/ojrowexpander"], function (require, exports, jsx_runtime_1, groupData, ojmutablearraytreedataprovider_1, FlattenedTreeDataProviderView, ojkeyset_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const dataArray = JSON.parse(groupData);
    const setSelectionMode = {
        row: "multiple",
        column: "multiple",
    };
    const setScrollPolicy = {
        fetchSize: 10,
        maxCount: 500,
    };
    const columnsDef = [
        {
            headerText: "Probability",
            id: "probability",
            field: "probability",
        },
        {
            headerText: "Description",
            id: "description",
            field: "description",
        },
        {
            headerText: "Account",
            id: "account",
            field: "account",
        },
        {
            headerText: "Sales Stage",
            id: "salesStage",
            field: "salesstage",
        },
        {
            headerText: "Amount",
            headerClassName: "oj-helper-text-align-end",
            className: "oj-helper-text-align-end",
            id: "amount",
            field: "amount",
        },
        {
            headerText: "Payment Date",
            headerClassName: "oj-helper-text-align-end",
            className: "oj-helper-text-align-end",
            id: "paymentDate",
            field: "paymentdate",
        },
    ];
    const dataprovider = new ojmutablearraytreedataprovider_1.MutableArrayTreeDataProvider(dataArray, "id", {
        keyAttributeScope: "global",
    });
    const expanded = new ojkeyset_1.KeySetImpl(["3"]);
    const flattenedTreeDataProviderView = new FlattenedTreeDataProviderView(dataprovider, {
        expanded: expanded,
    });
    const setRowSelectable = (item) => {
        if (item.metadata.treeDepth === 0) {
            return "off";
        }
        return "on";
    };
    const setRowSticky = (item) => {
        if (item.metadata.treeDepth === 0) {
            return "on";
        }
        return "off";
    };
    const setRowOptions = {
        selectable: setRowSelectable,
        sticky: setRowSticky,
    };
    const rowItemTemplate = (row) => {
        return ((0, jsx_runtime_1.jsxs)("tr", { children: [row.item.metadata.treeDepth === 0 && ((0, jsx_runtime_1.jsx)("td", { colSpan: 6, "aria-label": row.item.data.accText, class: "oj-sm-padding-0-start", children: (0, jsx_runtime_1.jsxs)("div", { class: "oj-flex-bar oj-sm-align-items-center", children: [(0, jsx_runtime_1.jsx)("div", { class: "oj-sm-padding-2x-horizontal", children: (0, jsx_runtime_1.jsx)("oj-row-expander", { context: row, "data-oj-clickthrough": "disabled" }) }), (0, jsx_runtime_1.jsx)("div", { tabIndex: 0, class: "oj-typography-subheading-xs", children: row.item.data.salesstage }), (0, jsx_runtime_1.jsxs)("div", { class: "oj-flex-bar-end oj-sm-text-align-end", children: [(0, jsx_runtime_1.jsxs)("div", { tabIndex: 0, children: [(0, jsx_runtime_1.jsx)("span", { class: "oj-typography-body-xs oj-text-color-secondary oj-typography-semi-bold", children: "Results" }), (0, jsx_runtime_1.jsx)("div", { class: "oj-sm-margin-0 oj-typography-body-md oj-typography-semi-bold", children: row.item.data.count })] }), (0, jsx_runtime_1.jsxs)("div", { tabIndex: 0, class: "oj-sm-padding-10x-start", children: [(0, jsx_runtime_1.jsx)("span", { class: "oj-typography-body-xs oj-text-color-secondary oj-typography-semi-bold", children: "Amount" }), (0, jsx_runtime_1.jsx)("div", { class: "oj-sm-margin-0 oj-typography-body-md oj-typography-semi-bold", children: row.item.data.amount })] })] })] }) })), row.item.metadata.treeDepth === 1 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("span", { children: row.item.data.probability }) }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("span", { children: row.item.data.description }) }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("span", { children: row.item.data.account }) }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("span", { children: row.item.data.salesstage }) }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("span", { children: row.item.data.amount }) }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("span", { children: row.item.data.paymentdate }) })] }))] }));
    };
    const GroupByTable = () => {
        return ((0, jsx_runtime_1.jsx)("oj-table", { id: "table", class: "demo-table-container", "aria-label": "Group By Data Demo", accessibility: { rowHeader: "salesStage" }, scrollPolicyOptions: setScrollPolicy, data: flattenedTreeDataProviderView, selectionMode: setSelectionMode, row: setRowOptions, columns: columnsDef, children: (0, jsx_runtime_1.jsx)("template", { slot: "rowTemplate", render: rowItemTemplate }) }));
    };
    exports.default = GroupByTable;
});

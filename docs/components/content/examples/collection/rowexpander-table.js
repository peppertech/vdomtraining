define(["require", "exports", "preact/jsx-runtime", "text!./data/projectData.json", "ojs/ojmutablearraytreedataprovider", "ojs/ojflattenedtreedataproviderview", "ojs/ojrowexpander", "ojs/ojtable"], function (require, exports, jsx_runtime_1, jsonDataStr, ojmutablearraytreedataprovider_1, FlattenedTreeDataProviderView) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RowExpanderTable = void 0;
    const setSelectionMode = {
        row: "single",
        column: "none",
    };
    const RowExpanderTable = () => {
        const arrayTreeDataProvider = new FlattenedTreeDataProviderView(new ojmutablearraytreedataprovider_1.MutableArrayTreeDataProvider(JSON.parse(jsonDataStr), "id", {
            keyAttributeScope: "global",
        }));
        const columns = [
            {
                headerText: "Task Name",
                sortProperty: "name",
                weight: 2,
                minWidth: "13rem",
                id: "name",
            },
            {
                headerText: "Resource",
                sortProperty: "resource",
                minWidth: "9rem",
                id: "resource",
            },
            {
                headerText: "Start Date",
                sortProperty: "start",
                minWidth: "8rem",
                id: "start",
            },
            {
                headerText: "End Date",
                sortProperty: "end",
                minWidth: "8rem",
                id: "end",
            },
        ];
        const rowTemplate = (row) => {
            return ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsxs)("td", { children: [(0, jsx_runtime_1.jsx)("oj-row-expander", { "data-oj-clickthrough": "disabled", context: row }), (0, jsx_runtime_1.jsx)("span", { children: row.item.data.name })] }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("span", { children: row.item.data.resource }) }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("span", { children: row.item.data.start }) }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("span", { children: row.item.data.end }) })] }));
        };
        return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("oj-table", { id: "table", "aria-label": "Project tasks", selectionMode: setSelectionMode, data: arrayTreeDataProvider, columns: columns, class: "table-sizing", children: (0, jsx_runtime_1.jsx)("template", { slot: "rowTemplate", render: rowTemplate }) }) }));
    };
    exports.RowExpanderTable = RowExpanderTable;
});

define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "text!./data/projectData.json", "text!./data/peopleData.json", "ojs/ojmutablearraytreedataprovider", "ojs/ojflattenedtreedataproviderview", "ojs/ojrowexpander", "ojs/ojtable"], function (require, exports, jsx_runtime_1, hooks_1, jsonDataStr, jsonPeopleStr, ojmutablearraytreedataprovider_1, FlattenedTreeDataProviderView) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RowExpanderCustomTable = void 0;
    const setSelectionMode = {
        row: "single",
        column: "none",
    };
    const RowExpanderCustomTable = () => {
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
        const childRender = (0, hooks_1.useCallback)((row) => {
            const childData = JSON.parse(jsonPeopleStr);
            const currentRowName = row.item.data.id.slice(1, 2);
            return ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { colspan: 1, style: "padding-left:4rem", children: (0, jsx_runtime_1.jsx)("div", { style: "color:red", children: row.item.data.name }) }), (0, jsx_runtime_1.jsxs)("td", { colspan: 3, style: "padding-left:4rem", children: [(0, jsx_runtime_1.jsx)("div", { style: "color:red", children: childData[currentRowName].name }), (0, jsx_runtime_1.jsx)("div", { style: "color:purple", children: childData[currentRowName].department })] })] }));
        }, []);
        const rowTemplate = (row) => {
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [row.item.metadata.treeDepth === 0 && ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsxs)("td", { children: [(0, jsx_runtime_1.jsx)("oj-row-expander", { context: row, "data-oj-clickthrough": "disabled" }), (0, jsx_runtime_1.jsx)("span", { children: row.item.data.name })] }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("span", { children: row.item.data.resource }) }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("span", { children: row.item.data.start }) }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("span", { children: row.item.data.end }) })] })), row.item.metadata.treeDepth === 1 && childRender(row)] }));
        };
        return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("oj-table", { id: "table", "aria-label": "Project tasks", selectionMode: setSelectionMode, data: arrayTreeDataProvider, columns: columns, class: "table-sizing", children: (0, jsx_runtime_1.jsx)("template", { slot: "rowTemplate", render: rowTemplate }) }) }));
    };
    exports.RowExpanderCustomTable = RowExpanderCustomTable;
});

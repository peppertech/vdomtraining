define(["require", "exports", "preact/jsx-runtime", "text!./data/population.json", "ojs/ojmutablearraydataprovider", "ojs/ojrowdatagridprovider", "ojs/ojconverter-number", "ojs/ojdatagrid", "ojs/ojbutton", "ojs/ojtoolbar"], function (require, exports, jsx_runtime_1, popData, MutableArrayDataProvider, ojrowdatagridprovider_1, ojconverter_number_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const populationData = JSON.parse(popData);
    const mutableArrayDataProvider = new MutableArrayDataProvider(populationData);
    const getColumnHeaderClassName = (headerContext) => {
        return getAlignmentClassNameByIndex(headerContext.index);
    };
    const getCellClassName = (cellContext) => {
        return getAlignmentClassNameByIndex(cellContext.indexes.column);
    };
    const getAlignmentClassNameByIndex = (index) => { };
    const cellStyle = {
        className: getCellClassName,
    };
    const numberConverter = new ojconverter_number_1.IntlNumberConverter({ useGrouping: true });
    const headerStyle = {
        column: {
            className: getColumnHeaderClassName,
            resizable: {
                height: "disable",
            },
            label: {},
        },
        columnEnd: {
            label: {},
            resizable: {
                height: "disable",
            },
        },
        row: {
            label: {},
            style: "width:165px",
            resizable: {
                width: "disable",
            },
        },
        rowEnd: {
            label: {},
            resizable: {
                width: "disable",
            },
        },
    };
    const dataDP = new ojrowdatagridprovider_1.RowDataGridProvider(mutableArrayDataProvider, {
        columns: {
            rowHeader: ["states"],
        },
        columnHeaders: {
            column: "attributeName",
        },
        headerLabels: {
            column: ["Years"],
            row: ["States"],
        },
    });
    const cellRenderer = (cell) => {
        return (0, jsx_runtime_1.jsx)("span", { children: numberConverter.format(cell.item.data.data) });
    };
    const DataGrid = () => {
        const changePopulation = () => {
            let tempData = Object.assign([], populationData);
            tempData.unshift({
                states: "FreeState",
                "2000": 5160586,
                "2001": 5273477,
                "2002": 5396255,
                "2003": 5510364,
                "2004": 5652404,
                "2005": 5839077,
                "2006": 6029141,
                "2007": 6167681,
                "2008": 6280362,
                "2009": 6343154,
                "2010": 6407342,
                "2011": 6473416,
                "2012": 6556344,
                "2013": 6634690,
                "2014": 6732873,
                "2015": 6832810,
                "2016": 6944767,
                "2017": 7048088,
                "2018": 7164228,
                "2019": 7291843,
                "2020": 7421401,
            });
            mutableArrayDataProvider.data = tempData;
        };
        const resetPopulation = () => {
            mutableArrayDataProvider.data = populationData;
        };
        return ((0, jsx_runtime_1.jsxs)("div", { class: "oj-md-margin-4x-horizontal", children: [(0, jsx_runtime_1.jsx)("h3", { id: "dataGridLabel", class: "oj-typography-heading-xs", children: "State Population by Year" }), (0, jsx_runtime_1.jsx)("oj-data-grid", { id: "datagrid", class: "demo-data-grid", "aria-labelledby": "dataGridLabel", header: headerStyle, cell: cellStyle, data: dataDP, children: (0, jsx_runtime_1.jsx)("template", { slot: "cellTemplate", render: cellRenderer }) }), (0, jsx_runtime_1.jsxs)("oj-toolbar", { children: [(0, jsx_runtime_1.jsx)("oj-button", { onojAction: changePopulation, label: "Add new State" }), (0, jsx_runtime_1.jsx)("oj-button", { onojAction: resetPopulation, label: "Reset" })] })] }));
    };
    exports.default = DataGrid;
});

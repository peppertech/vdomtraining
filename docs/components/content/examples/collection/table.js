define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "text!./data/departmentData.json", "ojs/ojmutablearraydataprovider", "ojs/ojbutton", "ojs/ojtable", "ojs/ojmenu", "ojs/ojinputtext", "ojs/ojtoolbar"], function (require, exports, jsx_runtime_1, hooks_1, deptData, MutableArrayDataProvider) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Data = JSON.parse(deptData);
    const setColumnsDefault = {
        sortable: "disabled",
    };
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
            headerText: "Department Id",
            field: "DepartmentId",
            headerClassName: "oj-sm-only-hide",
            className: "oj-sm-only-hide",
            resizable: "enabled",
            sortable: "enabled",
        },
        {
            headerText: "Department Name",
            field: "DepartmentName",
            resizable: "enabled",
            template: "deptNameTemplate",
        },
        {
            headerText: "Location Id",
            field: "LocationId",
            headerClassName: "oj-sm-only-hide",
            className: "oj-sm-only-hide",
            resizable: "enabled",
        },
        { headerText: "Manager Id", field: "ManagerId", resizable: "enabled" },
        { headerText: "Action", resizable: "disabled", template: "actionTemplate" },
    ];
    const dataprovider = new MutableArrayDataProvider(Data, {
        keyAttributes: "DepartmentId",
        implicitSort: [{ attribute: "DepartmentId", direction: "ascending" }],
    });
    const menuListener = (event) => {
        console.log("Menu item " + event.detail.selectedValue + " was clicked");
    };
    const Table = () => {
        const [deptName, setDeptName] = (0, hooks_1.useState)();
        const [editRow, setEditRow] = (0, hooks_1.useState)();
        const cancelEdit = (0, hooks_1.useRef)(false);
        const submitRow = (key) => {
            let tempArray = [];
            for (let element of Data) {
                if (element.DepartmentId === key) {
                    console.log(element);
                    element.DepartmentName = deptName;
                }
                tempArray.push(element);
            }
            dataprovider.data = tempArray;
        };
        const beforeRowEditListener = (event) => {
            const rowContext = event.detail.rowContext;
            setDeptName(rowContext.item.data.DepartmentName);
        };
        const beforeRowEditEndListener = (event) => {
            if (!cancelEdit.current) {
                const key = event.detail.rowContext.item.data.DepartmentId;
                submitRow(key);
            }
        };
        const updateDeptName = (event) => {
            if (event.detail.updatedFrom === "internal") {
                setDeptName(event.detail.value);
            }
        };
        const editableTemplate = (cell) => {
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [cell.mode == "navigation" && cell.data, cell.mode == "edit" && ((0, jsx_runtime_1.jsx)("oj-input-text", { id: "it1", value: deptName, class: "editable", onvalueChanged: updateDeptName }))] }));
        };
        const actionColumn = (cell) => {
            const handleUpdate = (event) => {
                setEditRow({ rowKey: cell.item.data.DepartmentId });
            };
            const handleEditOption = (event) => {
                if (event.detail.updatedFrom === "internal") {
                    if (event.detail.value === "save") {
                        cancelEdit.current = false;
                        setEditRow({ rowKey: null });
                    }
                    else {
                        cancelEdit.current = true;
                        setEditRow({ rowKey: null });
                    }
                }
            };
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [cell.mode == "navigation" && ((0, jsx_runtime_1.jsxs)("oj-button", Object.assign({ "data-oj-clickthrough": "disabled", display: "icons", chroming: "borderless", onojAction: handleUpdate }, { children: [(0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-edit" }), "Edit"] }))), cell.mode == "edit" && ((0, jsx_runtime_1.jsxs)("oj-buttonset-one", Object.assign({ id: "formatsetWidth1", "aria-label": "Choose only one format", display: "icons", chroming: "borderless", onvalueChanged: handleEditOption, class: "oj-buttonset-width-auto" }, { children: [(0, jsx_runtime_1.jsxs)("oj-option", Object.assign({ value: "save" }, { children: [(0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-check" }), "Save"] })), (0, jsx_runtime_1.jsxs)("oj-option", Object.assign({ value: "cancel" }, { children: [(0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-multiply" }), "Cancel"] }))] })))] }));
        };
        return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("oj-table", Object.assign({ id: "table", "aria-label": "Departments Table", data: dataprovider, editMode: "rowEdit", editRow: editRow, selectionMode: setSelectionMode, scrollPolicy: "loadMoreOnScroll", scrollPolicyOptions: setScrollPolicy, columnsDefault: setColumnsDefault, columns: columnsDef, onojBeforeRowEdit: beforeRowEditListener, onojBeforeRowEditEnd: beforeRowEditEndListener, class: "oj-bg-body table-sizing" }, { children: [(0, jsx_runtime_1.jsx)("template", { slot: "actionTemplate", render: actionColumn }), (0, jsx_runtime_1.jsx)("template", { slot: "deptNameTemplate", render: editableTemplate })] })) }));
    };
    exports.default = Table;
});

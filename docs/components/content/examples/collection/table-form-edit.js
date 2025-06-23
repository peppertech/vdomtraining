define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "text!./data/departmentData.json", "ojs/ojmutablearraydataprovider", "ojs/ojvalidationgroup", "ojs/ojknockout", "oj-c/input-text", "oj-c/input-number", "oj-c/text-area", "oj-c/form-layout", "oj-c/input-date-picker", "ojs/ojcheckboxset", "ojs/ojtable", "ojs/ojbutton", "oj-c/button", "oj-c/select-multiple", "oj-c/select-single", "ojs/ojformlayout", "ojs/ojlabelvalue"], function (require, exports, jsx_runtime_1, hooks_1, deptData, MutableArrayDataProvider) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Data = JSON.parse(deptData);
    const setColumnsDefault = {
        sortable: "disabled",
    };
    const setSelectionMode = {
        row: "none",
        column: "none",
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
        }
    ];
    const dataprovider = new MutableArrayDataProvider(Data, {
        keyAttributes: "DepartmentId",
        implicitSort: [{ attribute: "DepartmentId", direction: "ascending" }],
    });
    const menuListener = (event) => {
        console.log("Menu item " + event.detail.selectedValue + " was clicked");
    };
    const TableWithFormEdit = () => {
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
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [cell.mode == "navigation" && ((0, jsx_runtime_1.jsxs)("oj-button", { "data-oj-clickthrough": "disabled", display: "icons", chroming: "borderless", onojAction: handleUpdate, children: [(0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-edit" }), "Edit"] })), cell.mode == "edit" && ((0, jsx_runtime_1.jsxs)("oj-buttonset-one", { id: "formatsetWidth1", "aria-label": "Choose only one format", display: "icons", chroming: "borderless", onvalueChanged: handleEditOption, class: "oj-buttonset-width-auto", children: [(0, jsx_runtime_1.jsxs)("oj-option", { value: "save", children: [(0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-check" }), "Save"] }), (0, jsx_runtime_1.jsxs)("oj-option", { value: "cancel", children: [(0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-multiply" }), "Cancel"] })] }))] }));
        };
        const handleCancel = () => { };
        const handleDone = () => { };
        const handleUpdate = () => { };
        const editRowTemplate = (row) => {
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [row.mode === 'navigation' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("td", { children: row.item.data.DepartmentId }), (0, jsx_runtime_1.jsx)("td", { children: row.item.data.DepartmentName }), (0, jsx_runtime_1.jsx)("td", { children: row.item.data.LocationId }), (0, jsx_runtime_1.jsx)("td", { class: "oj-sm-padding-0-vertical", children: (0, jsx_runtime_1.jsxs)("oj-button", { display: "icons", class: "oj-button-sm", chroming: "borderless", onojAction: handleUpdate, disabled: row.editable === 'off', "data-oj-clickthrough": "disabled", children: [(0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-edit" }), "Edit"] }) })] })), row.mode === 'edit' && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("td", { colspan: 3, class: "oj-form-control-default oj-sm-padding-2x oj-table-data-cell-padding", children: [(0, jsx_runtime_1.jsx)("oj-validation-group", { id: "tracker", children: (0, jsx_runtime_1.jsxs)("oj-form-layout", { id: "ofl1", maxColumns: 4, direction: "row", children: [(0, jsx_runtime_1.jsx)("oj-c-input-text", { id: "it1", labelHint: "Dept Name", value: row.item.data.DepartmentId, class: "editable" }), (0, jsx_runtime_1.jsx)("oj-c-input-text", { id: "it2", value: row.item.data.LocationId, labelHint: "Location Id", class: "editable" })] }) }), (0, jsx_runtime_1.jsx)("oj-c-button", { id: "cancel", size: "sm", label: "Cancel", chroming: "borderless", onojAction: handleCancel, "data-oj-clickthrough": "disabled" }), (0, jsx_runtime_1.jsx)("oj-c-button", { id: "update", size: "sm", label: "Apply", chroming: "outlined", onojAction: handleDone, "data-oj-clickthrough": "disabled" })] }) }))] }));
        };
        return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("oj-table", { id: "table", "aria-label": "Departments Table", data: dataprovider, editMode: "rowEdit", editRow: editRow, selectionMode: setSelectionMode, scrollPolicy: "loadMoreOnScroll", scrollPolicyOptions: setScrollPolicy, columnsDefault: setColumnsDefault, columns: columnsDef, onojBeforeRowEdit: beforeRowEditListener, onojBeforeRowEditEnd: beforeRowEditEndListener, class: "table-sizing", children: (0, jsx_runtime_1.jsx)("template", { slot: "rowTemplate", "data-oj-as": "row", render: editRowTemplate }) }) }));
    };
    exports.default = TableWithFormEdit;
});

import { h, ComponentProps } from "preact";
import { useState, useRef } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojtable";
import "ojs/ojmenu";
import "ojs/ojinputtext";
import "ojs/ojtoolbar";
import { ojMenu } from "ojs/ojmenu";
import { ojTable } from "ojs/ojtable";
import { ojButton, ojButtonsetOne } from "ojs/ojbutton";
import { ojInputText } from "ojs/ojinputtext";
import * as deptData from "text!./data/departmentData.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

type Dept = {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
};

type Row = {
  rowKey: number | null;
};

const Data = JSON.parse(deptData);
type TableProps = ComponentProps<"oj-table">;

const setColumnsDefault: TableProps["columnsDefault"] = {
  sortable: "disabled",
};
const setSelectionMode: TableProps["selectionMode"] = {
  row: "multiple",
  column: "multiple",
};
const setScrollPolicy: TableProps["scrollPolicyOptions"] = {
  fetchSize: 10,
  maxCount: 500,
};

const columnsDef: TableProps["columns"] = [
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

const dataprovider: MutableArrayDataProvider<Dept["DepartmentId"], Dept> =
  new MutableArrayDataProvider(Data, {
    keyAttributes: "DepartmentId",
    implicitSort: [{ attribute: "DepartmentId", direction: "ascending" }],
  });

const menuListener = (event: ojMenu.ojMenuAction) => {
  console.log("Menu item " + event.detail.selectedValue + " was clicked");
};

const Table = () => {
  const [deptName, setDeptName] = useState<Dept["DepartmentName"]>();
  const [editRow, setEditRow] = useState<Row>();
  const cancelEdit = useRef(false);

  const submitRow = (key: Dept["DepartmentId"]) => {
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

  const beforeRowEditListener = (
    event: ojTable.ojBeforeRowEdit<Dept["DepartmentId"], Dept>
  ) => {
    const rowContext = event.detail.rowContext;
    setDeptName(rowContext.item.data.DepartmentName);
  };
  const beforeRowEditEndListener = (
    event: ojTable.ojBeforeRowEditEnd<Dept["DepartmentId"], Dept>
  ) => {
    if (!cancelEdit.current) {
      const key = event.detail.rowContext.item.data.DepartmentId;
      submitRow(key);
    }
  };

  const updateDeptName = (event: ojInputText.valueChanged) => {
    if (event.detail.updatedFrom === "internal") {
      setDeptName(event.detail.value);
    }
  };

  const editableTemplate = (
    cell: ojTable.CellTemplateContext<Dept["DepartmentId"], Dept>
  ) => {
    return (
      <>
        {cell.mode == "navigation" && cell.data}
        {cell.mode == "edit" && (
          <oj-input-text
            id="it1"
            value={deptName}
            class="editable"
            onvalueChanged={updateDeptName}></oj-input-text>
        )}
      </>
    );
  };

  const actionColumn = (
    cell: ojTable.CellTemplateContext<Dept["DepartmentId"], Dept>
  ) => {
    const handleUpdate = (event: ojButton.ojAction) => {
      setEditRow({ rowKey: cell.item.data.DepartmentId });
    };

    const handleEditOption = (event: ojButtonsetOne.valueChanged) => {
      if (event.detail.updatedFrom === "internal") {
        if (event.detail.value === "save") {
          cancelEdit.current = false;
          setEditRow({ rowKey: null });
        } else {
          cancelEdit.current = true;
          setEditRow({ rowKey: null });
        }
      }
    };

    return (
      <>
        {cell.mode == "navigation" && (
          <oj-button
            data-oj-clickthrough="disabled"
            display="icons"
            chroming="borderless"
            onojAction={handleUpdate}>
            <span slot="startIcon" class="oj-ux-ico-edit"></span>
            Edit
          </oj-button>
        )}

        {cell.mode == "edit" && (
          <oj-buttonset-one
            id="formatsetWidth1"
            aria-label="Choose only one format"
            display="icons"
            chroming="borderless"
            onvalueChanged={handleEditOption}
            class="oj-buttonset-width-auto">
            <oj-option value="save">
              <span slot="startIcon" class="oj-ux-ico-check"></span>
              Save
            </oj-option>
            <oj-option value="cancel">
              <span slot="startIcon" class="oj-ux-ico-multiply"></span>
              Cancel
            </oj-option>
          </oj-buttonset-one>
        )}
      </>
    );
  };
  return (
    <div>
      <oj-table
        id="table"
        aria-label="Departments Table"
        data={dataprovider}
        editMode="rowEdit"
        editRow={editRow}
        selectionMode={setSelectionMode}
        scrollPolicy="loadMoreOnScroll"
        scrollPolicyOptions={setScrollPolicy}
        columnsDefault={setColumnsDefault}
        columns={columnsDef}
        onojBeforeRowEdit={beforeRowEditListener}
        onojBeforeRowEditEnd={beforeRowEditEndListener}
        class="oj-bg-body table-sizing">
        <template slot="actionTemplate" render={actionColumn}></template>
        <template slot="deptNameTemplate" render={editableTemplate}></template>
      </oj-table>
    </div>
  );
};
export default Table;

import { h, ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojtable";
import "ojs/ojmenu";
import "ojs/ojinputtext";
import { ojMenu } from "ojs/ojmenu";
import { ojTable } from "ojs/ojtable";
import * as deptData from "text!./departmentData.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

type Dept = {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
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

const dataprovider: MutableArrayDataProvider<
  Dept["DepartmentId"],
  Dept
> = new MutableArrayDataProvider(Data, {
  keyAttributes: "DepartmentId",
  implicitSort: [{ attribute: "DepartmentId", direction: "ascending" }],
});

const menuListener = (event: ojMenu.ojMenuAction) => {
  console.log("Menu item " + event.detail.selectedValue + " was clicked");
};

const actionColumn = (
  cell: ojTable.CellTemplateContext<Dept["DepartmentId"], Dept>
) => {
  return (
    <oj-menu-button
      chroming="borderless"
      display="icons"
      data-oj-clickthrough="disabled">
      Action
      <oj-menu slot="menu" onojMenuAction={menuListener}>
        <oj-option value="approve" disabled={cell.row.LocationId === 100}>
          <span class="oj-ux-ico-check" slot="startIcon"></span>Approve
        </oj-option>
        <oj-option value="delete">
          <span class="oj-ux-ico-delete-circle" slot="startIcon"></span>
          Delete
        </oj-option>
      </oj-menu>
    </oj-menu-button>
  );
};

const Table = () => {
  const [deptName, setDeptName] = useState(null);

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
  const beforeRowEditListener = (
    event: ojTable.ojBeforeRowEdit<Dept["DepartmentId"], Dept>
  ) => {
    const rowContext = event.detail.rowContext;
    setDeptName(rowContext.item.data.DepartmentName);
  };
  const beforeRowEditEndListener = (
    event: ojTable.ojBeforeRowEditEnd<Dept["DepartmentId"], Dept>
  ) => {
    const key = event.detail.rowContext.item.data.DepartmentId;
    submitRow(key);
  };

  const updateDeptName = (event) => {
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

  return (
    <div class="oj-md-margin-4x-horizontal">
      <oj-table
        id="table"
        aria-label="Departments Table"
        data={dataprovider}
        editMode={"rowEdit"}
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

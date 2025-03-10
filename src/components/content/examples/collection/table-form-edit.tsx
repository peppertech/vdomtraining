import { ComponentProps } from "preact";
import { useState, useRef, useCallback } from "preact/hooks";
import 'ojs/ojvalidationgroup';
import 'ojs/ojknockout';
import 'oj-c/input-text';
import "oj-c/input-number";
import "oj-c/text-area";
import "oj-c/form-layout"
import 'oj-c/input-date-picker';
import 'ojs/ojcheckboxset';
import 'ojs/ojtable';
import 'ojs/ojbutton';
import 'oj-c/button';
import 'oj-c/select-multiple';
import 'oj-c/select-single';
import 'ojs/ojformlayout';
import 'ojs/ojlabelvalue';
import 'ojs/ojinputtext';
import { ojMenu } from "ojs/ojmenu";
import { ojTable } from "ojs/ojtable";
import { ojButton, ojButtonsetOne } from "ojs/ojbutton";
import { ojInputText } from "ojs/ojinputtext";
import * as deptData from "text!./data/departmentData.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { FormVariantContext } from '@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext'

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
  row: "none",
  column: "none",
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
  }];

const dataprovider: MutableArrayDataProvider<Dept["DepartmentId"], Dept> =
  new MutableArrayDataProvider(Data, {
    keyAttributes: "DepartmentId",
    implicitSort: [{ attribute: "DepartmentId", direction: "ascending" }],
  });

const menuListener = (event: ojMenu.ojMenuAction) => {
  console.log("Menu item " + event.detail.selectedValue + " was clicked");
};

const TableWithFormEdit = () => {
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

  const handleCancel = () => { }
  const handleDone = () => { }
  const handleUpdate = () => { }
  const editRowTemplate = useCallback((row: ojTable.RowTemplateContext<Dept["DepartmentId"], Dept>) => {

    return (
      <>
        {row.mode === 'navigation' && (
          <>
            <td>
              {row.item.data.DepartmentId}
            </td>
            <td>
              {row.item.data.DepartmentName}
            </td>
            <td>
              {row.item.data.LocationId}
            </td>
            <td class="oj-sm-padding-0-vertical">
              <oj-button
                display="icons"
                class="oj-button-sm"
                chroming="borderless"
                onojAction={handleUpdate}
                disabled={row.editable === 'off'}
                data-oj-clickthrough="disabled">
                <span slot="startIcon" class="oj-ux-ico-edit"></span>
                Edit
              </oj-button>
            </td>
          </>
        )}
        {row.mode === 'edit' && (
          <>
            <td colspan={3} class="oj-form-control-default oj-sm-padding-2x oj-table-data-cell-padding">
               <FormVariantContext.Provider value={'default'}> {/* This is not ideal, but it works for development.  Not for production. */}
                <oj-validation-group id="tracker">
                  <oj-form-layout id="ofl1" maxColumns={4} direction="row">
                    <span>
                      <oj-c-input-text
                        id="it1"
                        labelHint="Dept Name"
                        value={row.item.data.DepartmentId}
                        class="editable"></oj-c-input-text>
                      <oj-c-input-text
                        id="it2"
                        value={row.item.data.LocationId}
                        labelHint="Location Id"
                        class="editable"></oj-c-input-text>
                    </span>
                  </oj-form-layout>
                </oj-validation-group>
                <oj-c-button
                  id="cancel"
                  size="sm"
                  label="Cancel"
                  chroming="borderless"
                  onojAction={handleCancel}
                  data-oj-clickthrough="disabled">
                </oj-c-button>
                <oj-c-button
                  id="update"
                  size="sm"
                  label="Apply"
                  chroming="outlined"
                  onojAction={handleDone}
                  data-oj-clickthrough="disabled">
                </oj-c-button>
              </FormVariantContext.Provider>
            </td>
          </>
        )}
      </>)
  }, [])

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
        class="table-sizing">
        <template slot="rowTemplate" data-oj-as="row" render={editRowTemplate}></template>
      </oj-table>
    </div>
  );
};
export default TableWithFormEdit;

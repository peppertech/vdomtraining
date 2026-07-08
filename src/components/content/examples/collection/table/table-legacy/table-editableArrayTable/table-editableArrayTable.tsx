import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import * as Context from 'ojs/ojcontext';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import BufferingDataProvider = require('ojs/ojbufferingdataprovider');
import NumberRangeValidator = require('ojs/ojvalidator-numberrange');
import 'ojs/ojinputtext';
import 'ojs/ojdatetimepicker';
import 'ojs/ojselectcombobox';
import 'ojs/ojcheckboxset';
import 'ojs/ojtable';
import 'ojs/ojtoolbar';
import 'ojs/ojbutton';
import 'ojs/ojmessages';
import 'ojs/ojselectsingle';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import { ojTable } from 'ojs/ojtable';
import { ojInputText } from 'ojs/ojinputtext';
import { ojInputDate } from 'ojs/ojdatetimepicker';
import { ojSelectSingle } from 'ojs/ojselectsingle';
import { ojComboboxOne } from 'ojs/ojselectcombobox';
import * as deptData from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import 'ojs/ojformlayout';
import 'ojs/ojlabelvalue';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import 'ojs/ojinputnumber';
import 'ojs/ojselectcombobox';
import 'ojs/ojoption';
import 'ojs/ojdatetimepicker';
import 'ojs/ojlabel';
import 'ojs/ojinputtext';
import "css!./demo.css";

interface DepartmentData {
    DepartmentId: number;
    DepartmentName: string;
    LocationId: number;
    Type: string;
    Currency: string;
    StartDate: string;
    Primary: Array<string>;
}

interface SelectSingleData {
    label: string;
}

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;
type TableColumns = ComponentProps<'oj-table'>['columns'];
type DelayMode = 'off' | 'on';
type EditRowState = ComponentProps<'oj-table'>['editRow'];
type EditableRowTemplateContext = ojTable.RowTemplateContext<DepartmentData['DepartmentId'], DepartmentData> & {
  mode?: 'navigation' | 'edit';
};
const formatPrimaryValue = (primary: DepartmentData['Primary']) =>
    primary.includes('checked') ? 'Checked' : 'Unchecked';

export const TableEditableArrayTable = () => {
  const [deptObservableArray, setDeptObservableArray] = useState<DepartmentData[]>(
    () => JSON.parse(deptData as string) as DepartmentData[]
  );
  const [simulatedDelays, setSimulatedDelays] = useState<DelayMode>('off');
  const [editDelay, setEditDelay] = useState(2000);
  const [editEndDelay, setEditEndDelay] = useState(2000);
  const [rowData, setRowData] = useState<DepartmentData | null>(null);
  const [editedData, setEditedData] = useState<string>('');
  const [editRow, setEditRow] = useState<EditRowState>({ rowKey: null });

  const originalDataRef = useRef<DepartmentData | null>(null);
  const cancelEditRef = useRef<boolean>(false);
  const tableRef = useRef<ojTable<DepartmentData['DepartmentId'], DepartmentData> | null>(null);

  const dataprovider = useMemo(() => new BufferingDataProvider<DepartmentData['DepartmentId'], DepartmentData>(new ArrayDataProvider<DepartmentData['DepartmentId'], DepartmentData>(deptObservableArray, {
      keyAttributes: 'DepartmentId'
  })), [deptObservableArray]);
  const departments = useMemo(() => new ArrayDataProvider([{ label: 'Sales' }, { label: 'HR' }, { label: 'Marketing' }, { label: 'Finance' }], { keyAttributes: 'label' }), []);
  const isDelayDisabled = simulatedDelays === 'off';
  const columnArray = useMemo<TableColumns>(() => [
      {
          field: 'DepartmentId',
          headerText: 'ReadOnly',
          headerClassName: 'oj-helper-text-align-end',
          className: 'oj-helper-text-align-end oj-table-data-cell-padding',
          id: 'depId',
          minWidth: '7rem'
      },
      {
          field: 'DepartmentName',
          weight: 3,
          minWidth: '10rem',
          headerText: 'InputText',
          id: 'depName'
      },
      {
          field: 'LocationId',
          weight: 2,
          showRequired: true,
          headerText: 'InputText Number',
          headerClassName: 'oj-helper-text-align-end',
          className: 'oj-helper-text-align-end',
          id: 'locId',
          minWidth: '10rem'
      },
      {
          field: 'Type',
          headerText: 'SelectSingle',
          weight: 2,
          minWidth: '10rem',
          id: 'type'
      },
      {
          field: 'Currency',
          headerText: 'Combobox',
          minWidth: '8rem',
          weight: 2,
          id: 'currency'
      },
      {
          field: 'StartDate',
          weight: 2,
          minWidth: '10rem',
          headerText: 'InputDate',
          id: 'start'
      },
      {
          field: 'Primary',
          headerText: 'Checkboxset',
          headerStyle: 'text-align: center;',
          minWidth: '8rem',
          style: 'padding-top: 0px; padding-bottom: 0px; text-align: center;',
          id: 'primary'
      },
      {
          headerText: 'Action',
          width: '6.2rem',
          style: 'padding-top: 0px; padding-bottom: 0px;',
          headerClassName: 'oj-helper-text-align-end',
          className: 'oj-helper-text-align-end',
          id: 'action'
      }
  ], []);
  const numberConverter = useMemo(() => new IntlNumberConverter(), []);
  const dateConverter = useMemo(() => new IntlDateTimeConverter({
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
  }), []);
  const rangeValidator = useMemo(() => new NumberRangeValidator({ min: 100, max: 500 }), []);
  const validators = useMemo(() => [rangeValidator], [rangeValidator]);

  const handleSimulatedDelaysValueChanged = (event: PropertyChangedEvent<DelayMode>) => {
    setSimulatedDelays(event.detail.value ?? 'off');
  };

  const handleEditDelayValueChanged = (event: PropertyChangedEvent<number | null>) => {
    setEditDelay(event.detail.value ?? 2000);
  };

  const handleEditEndDelayValueChanged = (event: PropertyChangedEvent<number | null>) => {
    setEditEndDelay(event.detail.value ?? 2000);
  };

  const handleEditRowEditRowChanged = (event: Parameters<NonNullable<ComponentProps<'oj-table'>['oneditRowChanged']>>[0]) => {
    setEditRow(event.detail.value ?? { rowKey: null });
  };

  const updateRowData = <K extends keyof DepartmentData>(field: K, value: DepartmentData[K]) => {
      setRowData((currentRowData) => currentRowData ? { ...currentRowData, [field]: value } : currentRowData);
  };

  const beforeRowEditListener = (event: ojTable.ojBeforeRowEdit<DepartmentData['DepartmentId'], DepartmentData>) => {
      event.detail.accept(new Promise<void>((resolve) => {
          if (simulatedDelays === 'on') {
              setTimeout(() => {
                  prepareEdit(event);
                  resolve();
              }, editDelay);
          }
          else {
              prepareEdit(event);
              resolve();
          }
      }));
  };

  const prepareEdit = (event: ojTable.ojBeforeRowEdit<DepartmentData['DepartmentId'], DepartmentData>) => {
      cancelEditRef.current = false;
      const itemData = event.detail.rowContext.item.data;
      originalDataRef.current = Object.assign({}, itemData);
      setRowData(Object.assign({}, itemData));
  };

  const beforeRowEditEndListener = (event: ojTable.ojBeforeRowEditEnd<DepartmentData['DepartmentId'], DepartmentData>) => {
      setEditedData('');
      const detail = event.detail;
      // an edit cancel via the 'cancel' button is a submit as far as the table is concerned,
      // so we prevent an extra fetch by pushing the existing item data back into the table.
      // this is NOT needed when detail.cancelEdit is set as no fetch is triggered in that case.
      if (cancelEditRef.current) {
          detail.setUpdatedItem(new Promise((resolve) => {
              resolve({ updatedItem: detail.rowContext.item });
          }));
      }
      else if (!detail.cancelEdit) {
          const validateAndUpdate = async () => {
              const invalidInput = await validateEdits(event);
              if (invalidInput != null) {
                  // if an invalid input is found, prevent edit mode from exiting and queue focus
                  // to be moved back to the invalid input once the table is ready.
                  applyFocus(invalidInput);
                  throw new Error('validation failed');
              }
              else {
                  // validation succeeded. prevent an extra fetch by pushing the new item data back
                  // into the table. otherwise, the table will need to trigger its own fetch.
                  detail.setUpdatedItem(new Promise((resolve) => {
                      resolve({
                          updatedItem: {
                              data: rowData ?? detail.rowContext.item.data,
                              metadata: detail.rowContext.item.metadata
                          }
                      });
                  }));
              }
          };
          // utilizing the detail.accept functionality ensures that the table properly waits for
          // any async input validation to occur before exiting edit mode fully. a loading bar will
          // be rendered in place of the edited row while any pending validation is still running.
          detail.accept(simulatedDelays === 'off'
              ? validateAndUpdate()
              : new Promise<void>((resolve, reject) => {
                  const validate = () => {
                      validateAndUpdate()
                          .then(() => {
                          resolve();
                      })
                          .catch(() => {
                          // catch and reject validation promise if any invalid inputs are present
                          reject();
                      });
                  };
                  if (simulatedDelays === 'on') {
                      setTimeout(() => {
                          validate();
                      }, editEndDelay);
                  }
                  else {
                      validate();
                  }
              }));
      }
  };

  const validateEdits = async (event: ojTable.ojBeforeRowEditEnd<DepartmentData['DepartmentId'], DepartmentData>) => {
      if (!tableRef.current) {
          return;
      }
      let invalidInputs = await getValidationErrorElementsInRow(tableRef.current);
      if (invalidInputs.length > 0) {
          return invalidInputs[0];
      }
      else {
          if (isRowDataUpdated()) {
              const key = event.detail.rowContext.item.data.DepartmentId;
              submitRow(key);
          }
      }
  };

  const applyFocus = (element: HTMLElement) => {
      const tableElement = tableRef.current;
      if (!tableElement) {
          return;
      }
      let busyContext = Context.getContext(tableElement).getBusyContext();
      busyContext.whenReady().then(function () {
          element.focus();
      });
  };

  const submitRow = (key: DepartmentData['DepartmentId']) => {
      if (!rowData) {
          return;
      }
      dataprovider.updateItem({
          metadata: { key: key },
          data: rowData
      });
      const editItem = dataprovider.getSubmittableItems()[0];
      if (!editItem) {
          return;
      }
	      dataprovider.setItemStatus(editItem, 'submitting');
	      const itemData = editItem.item.data;
	      if (itemData == null) {
	          dataprovider.setItemStatus(editItem, 'submitted');
	          return;
	      }
      setDeptObservableArray((currentData) =>
          currentData.map((department) =>
              department.DepartmentId === editItem.item.metadata.key ? itemData : department
          )
      );
      // Set the edit item to "submitted" if successful
      dataprovider.setItemStatus(editItem, 'submitted');
      setEditedData(JSON.stringify(editItem.item.data));
  };

  const isRowDataUpdated = () => {
      if (!rowData || !originalDataRef.current) {
          return false;
      }
      const propNames = Object.keys(rowData) as Array<keyof DepartmentData>;
      for (let i = 0; i < propNames.length; i++) {
          if (rowData[propNames[i]] !== originalDataRef.current[propNames[i]]) {
              return true;
          }
      }
      return false;
  };

  const getValidationErrorElementsInRow = async (table: ojTable<DepartmentData['DepartmentId'], DepartmentData>) => {
      let invalidInputs = [];
      const editables = table.querySelectorAll('.editable');
      for (let i = 0; i < editables.length; i++) {
          const inputControl = editables.item(i) as ojInputText | ojInputDate | ojSelectSingle<SelectSingleData['label'], SelectSingleData> | ojComboboxOne<string, string>;
          // make sure to call 'validate' on each input control to ensure component is fully
          // validated prior to checking its 'valid' state below. otherwise pending edits could
          // be missed due to race conditions between the table's edit mode ending due to focus
          // loss and the input control's new value being submitted due to the same focus loss
          await inputControl.validate();
          if (inputControl.valid !== 'valid') {
              invalidInputs.push(inputControl);
          }
      }
      return invalidInputs;
  };

  const handleUpdate = (rowKey: DepartmentData['DepartmentId']) => () => {
      const itemData = deptObservableArray.find((department) => department.DepartmentId === rowKey);
      if (itemData) {
          cancelEditRef.current = false;
          originalDataRef.current = Object.assign({}, itemData);
          setRowData(Object.assign({}, itemData));
      }
      setEditRow({ rowKey });
  };

  const handleDone = () => {
      setEditRow({ rowKey: null });
  };

  const handleCancel = () => {
      cancelEditRef.current = true;
      setEditRow({ rowKey: null });
  };

  const rowTemplateRenderer = (row: EditableRowTemplateContext) => {
      const rowItem = row.item.data;
      const currentRowData = rowData?.DepartmentId === rowItem.DepartmentId ? rowData : rowItem;
      const isEditing = row.mode === 'edit' || editRow?.rowKey === row.item.metadata.key;

      if (isEditing) {
          return (
              <tr>
                  <td class="oj-helper-text-align-end oj-table-data-cell-padding">
                      {numberConverter.format(rowItem.DepartmentId)}
                  </td>
                  <td>
                      <oj-input-text
                          id="it1"
                          aria-label="Input Text"
                          value={currentRowData.DepartmentName}
                          class="editable"
                          onvalueChanged={(event) => updateRowData('DepartmentName', event.detail.value ?? '')}
                      />
                  </td>
                  <td class="oj-helper-text-align-end">
                      <oj-input-text
                          id="it2"
                          aria-label="Input Text Number"
                          required
                          value={currentRowData.LocationId}
                          validators={validators}
                          converter={numberConverter}
                          class="editable"
                          onvalueChanged={(event) => updateRowData('LocationId', Number(event.detail.value ?? 0))}
                      />
                  </td>
                  <td>
                      <oj-select-single
                          id="ss1"
                          aria-label="Select Single"
                          value={currentRowData.Type}
                          data={departments}
                          class="editable"
                          onvalueChanged={(event) => updateRowData('Type', event.detail.value ?? '')}
                      />
                  </td>
                  <td>
                      <oj-combobox-one
                          id="co1"
                          aria-label="Combobox"
                          value={currentRowData.Currency}
                          class="editable"
                          onvalueChanged={(event) => updateRowData('Currency', event.detail.value ?? '')}
                      >
                          <oj-option value="USD">USD</oj-option>
                          <oj-option value="JPY">JPY</oj-option>
                          <oj-option value="EUR">EUR</oj-option>
                      </oj-combobox-one>
                  </td>
                  <td>
                      <oj-input-date
                          id="id1"
                          aria-label="Input Date"
                          value={currentRowData.StartDate}
                          class="editable"
                          onvalueChanged={(event) => updateRowData('StartDate', event.detail.value ?? '')}
                      />
                  </td>
                  <td class="oj-helper-text-align-center demo-edit-checkbox-cell">
                      <div class="demo-edit-checkbox-aligner">
                          <oj-checkboxset
                              id="cs2"
                              aria-label="Checkboxset"
                              value={currentRowData.Primary}
                              class="oj-choice-direction-row demo-table-checkbox editable"
                              onvalueChanged={(event) => updateRowData('Primary', event.detail.value ?? [])}
                          >
                              <oj-option value="checked" />
                          </oj-checkboxset>
                      </div>
                  </td>
                  <td class="oj-helper-text-align-end demo-edit-action-cell">
                      <oj-toolbar data-oj-clickthrough="disabled" chroming="borderless" class="demo-edit-action-toolbar">
                          <oj-button display="icons" label="Submit" class="oj-button-sm" onojAction={handleDone} data-oj-clickthrough="disabled">
                              <span slot="startIcon" class="oj-ux-ico-check" />
                              Save
                          </oj-button>
                          <oj-button display="icons" label="Cancel" class="oj-button-sm" onojAction={handleCancel} data-oj-clickthrough="disabled">
                              <span slot="startIcon" class="oj-ux-ico-multiply" />
                              Cancel
                          </oj-button>
                      </oj-toolbar>
                  </td>
              </tr>
          );
      }

      return (
          <tr>
              <td class="oj-helper-text-align-end oj-table-data-cell-padding">{numberConverter.format(rowItem.DepartmentId)}</td>
              <td>{rowItem.DepartmentName}</td>
              <td class="oj-helper-text-align-end">{numberConverter.format(rowItem.LocationId)}</td>
              <td>{rowItem.Type}</td>
              <td>{rowItem.Currency}</td>
              <td>{dateConverter.format(rowItem.StartDate)}</td>
              <td class="oj-helper-text-align-center">{formatPrimaryValue(rowItem.Primary)}</td>
              <td class="oj-helper-text-align-end">
                  <oj-button
                      data-oj-clickthrough="disabled"
                      class="oj-button-sm"
                      display="icons"
                      label="Edit"
                      chroming="borderless"
                      onojAction={handleUpdate(row.item.metadata.key)}
                  >
                      <span slot="startIcon" class="oj-ux-ico-edit" />
                      Edit
                  </oj-button>
              </td>
          </tr>
      );
  };

  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
      accessibility: { rowHeader: 'depName' },
      columnsDefault: { sortable: 'disabled' }
  };

  return (
      <div id="tableWrapper">
            <div class="oj-panel oj-bg-neutral-30">
                    <h2 id="table-controls-heading" class="oj-typography-subheading-md">Options To Control The Table Below</h2>
                    <oj-form-layout aria-controls="table" max-columns="3" class="oj-formlayout-full-width">
                              <demo-radioset-enum direction="row" label-hint="Simulated Delays" onvalueChanged={handleSimulatedDelaysValueChanged} value={simulatedDelays} enum-values={JSON.stringify(['off', 'on'])} />
                              <oj-input-number id="edit-delay-input" min={0} disabled={isDelayDisabled} step={200} onvalueChanged={handleEditDelayValueChanged} value={editDelay} label-hint="Simulated Enter Edit Mode Delay (ms)" />
                              <oj-input-number id="edit-end-delay-input" min={0} disabled={isDelayDisabled} step={200} onvalueChanged={handleEditEndDelayValueChanged} value={editEndDelay} label-hint="Simulated Submit Add / Edit Delay (ms)" />
                          </oj-form-layout>
                </div>
            <oj-table ref={tableRef} id="table" aria-label="Departments Table" class="demo-table-container" data={dataprovider} editMode="rowEdit" oneditRowChanged={handleEditRowEditRowChanged} editRow={editRow} onojBeforeRowEdit={beforeRowEditListener} onojBeforeRowEditEnd={beforeRowEditEndListener} layout="fixed" columns={columnArray} {...ojTableProps}>
                    <template slot="rowTemplate" render={rowTemplateRenderer} />
                </oj-table>
            <br />
            <br />
            <oj-label for="editedContent">Edited Data:</oj-label>
            <oj-text-area id="editedContent" rows={3} value={editedData} />
        </div>
    );
};

export default TableEditableArrayTable;

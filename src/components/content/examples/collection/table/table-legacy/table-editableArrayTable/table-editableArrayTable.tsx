/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
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
import { ojButton } from 'ojs/ojbutton';
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

export const TableEditableArrayTable = () => {
  const deptArray: any = JSON.parse(deptData);
  const [deptObservableArray, setDeptObservableArray] = useState<any[]>(deptArray);
  const [simulatedDelays, setSimulatedDelays] = useState<any>('off');
  const [editDelay, setEditDelay] = useState<any>(2000);
  const [editEndDelay, setEditEndDelay] = useState<any>(2000);
  const [rowData, setRowData] = useState<DepartmentData | null>(null);
  const [editedData, setEditedData] = useState<string>('');
  const [editRow, setEditRow] = useState<any>({ rowKey: null });

  const originalDataRef = useRef<DepartmentData | null>(null);
  const cancelEditRef = useRef<boolean>(false);

  const dataprovider = useMemo(() => new BufferingDataProvider(new ArrayDataProvider(deptObservableArray, {
      keyAttributes: 'DepartmentId'
  })), [deptObservableArray]);
  const departments = useMemo(() => new ArrayDataProvider([{ label: 'Sales' }, { label: 'HR' }, { label: 'Marketing' }, { label: 'Finance' }], { keyAttributes: 'label' }), []);
  const isDelayDisabled = simulatedDelays === 'off';
  const columnArray = useMemo(() => [
      {
          field: 'DepartmentId',
          headerText: 'ReadOnly',
          headerClassName: 'oj-helper-text-align-end',
          className: 'oj-helper-text-align-end oj-table-data-cell-padding',
          template: 'deptIdTemplate',
          id: 'depId',
          minWidth: '7rem'
      },
      {
          field: 'DepartmentName',
          weight: 3,
          minWidth: '10rem',
          headerText: 'InputText',
          template: 'deptNameTemplate',
          id: 'depName'
      },
      {
          field: 'LocationId',
          weight: 2,
          showRequired: true,
          headerText: 'InputText Number',
          headerClassName: 'oj-helper-text-align-end',
          className: 'oj-helper-text-align-end',
          template: 'locIdTemplate',
          id: 'locId',
          minWidth: '10rem'
      },
      {
          field: 'Type',
          headerText: 'SelectSingle',
          weight: 2,
          minWidth: '10rem',
          template: 'typeTemplate',
          id: 'type'
      },
      {
          field: 'Currency',
          headerText: 'Combobox',
          minWidth: '8rem',
          weight: 2,
          template: 'currencyTemplate',
          id: 'currency'
      },
      {
          field: 'StartDate',
          weight: 2,
          minWidth: '10rem',
          headerText: 'InputDate',
          template: 'dateTemplate',
          id: 'start'
      },
      {
          field: 'Primary',
          headerText: 'Checkboxset',
          headerStyle: 'text-align: center;',
          minWidth: '8rem',
          style: 'padding-top: 0px; padding-bottom: 0px; text-align: center;',
          template: 'primaryTemplate',
          id: 'primary'
      },
      {
          headerText: 'Action',
          width: '6.2rem',
          style: 'padding-top: 0px; padding-bottom: 0px;',
          headerClassName: 'oj-helper-text-align-end',
          className: 'oj-helper-text-align-end',
          template: 'actionTemplate',
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

  const handleSimulatedDelaysValueChanged = (event: PropertyChangedEvent<any>) => {
    setSimulatedDelays(event.detail.value);
  };

  const handleEditDelayValueChanged = (event: PropertyChangedEvent<any>) => {
    setEditDelay(event.detail.value);
  };

  const handleEditEndDelayValueChanged = (event: PropertyChangedEvent<any>) => {
    setEditEndDelay(event.detail.value);
  };

  const handleEditRowEditRowChanged = (event: PropertyChangedEvent<any>) => {
    setEditRow(event.detail.value);
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
      let invalidInputs = await getValidationErrorElementsInRow(document.getElementById('table') as ojTable<DepartmentData['DepartmentId'], DepartmentData>);
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
      const tableElement = document.getElementById('table');
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
      const editItem = dataprovider.getSubmittableItems()[0] as BufferingDataProvider.EditItem<DepartmentData['DepartmentId'], DepartmentData>;
      dataprovider.setItemStatus(editItem, 'submitting');
      for (let idx = 0; idx < deptObservableArray.length; idx++) {
          if (deptObservableArray[idx].DepartmentId === editItem.item.metadata.key) {
              deptObservableArray.splice(idx, 1, editItem.item.data);
              break;
          }
      }
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
      setEditRow({ rowKey });
  };

  const handleDone = () => {
      setEditRow({ rowKey: null });
  };

  const handleCancel = () => {
      cancelEditRef.current = true;
      setEditRow({ rowKey: null });
  };

  return (
      <div id="tableWrapper">
            <div class="oj-panel oj-bg-neutral-30">
                    <h2 id="table-controls-heading" class="oj-typography-subheading-md">Options To Control The Table Below</h2>
                    <oj-form-layout aria-controls="table" max-columns="3" class="oj-formlayout-full-width">
                              <demo-radioset-enum direction="row" label-hint="Simulated Delays" onvalueChanged={handleSimulatedDelaysValueChanged} value={simulatedDelays} enum-values={JSON.stringify(['off', 'on'])} />
                              <oj-input-number id="edit-delay-input" min={0} disabled={isDelayDisabled} step={200} onvalueChanged={handleEditDelayValueChanged} value={editDelay} label-hint="Simulated Enter Edit Mode Delay (ms)" />
                              <oj-input-number id="edit-end-delay-input" min={0} disabled={isDelayDisabled} step={200} onvalueChanged={handleEditEndDelayValueChanged} value={editEndDelay} label-hint="Simulated Submit Edit Delay (ms)" />
                          </oj-form-layout>
                </div>
            <oj-table id="table" aria-label="Departments Table" class="demo-table-container" data={dataprovider} edit-mode="rowEdit" oneditRowChanged={handleEditRowEditRowChanged} edit-row={editRow} onojBeforeRowEdit={beforeRowEditListener} onojBeforeRowEditEnd={beforeRowEditEndListener} layout="fixed" columns={columnArray} {...{ 'accessibility.row-header': "depName", 'columns-default.sortable': "disabled" }}>
                    <template slot="deptIdTemplate" render={(cell) => (
                            <>
                                {numberConverter.format(cell.data)}
                            </>
                          )} />
                    <template slot="deptNameTemplate" render={(cell) => (
                            <>
                                {
                                            cell.mode == "navigation" ? (
                                              <>
                                                {cell.data}
                                              </>
                                            ) : null
                                          }
                                {
                                            cell.mode == "edit" ? (
                                              <>
                                                <oj-input-text id="it1" aria-label="Input Text" value={rowData?.DepartmentName ?? ''} class="editable" onvalueChanged={(event) => updateRowData('DepartmentName', event.detail.value ?? '')} />
                                              </>
                                            ) : null
                                          }
                            </>
                          )} />
                    <template slot="locIdTemplate" render={(cell) => (
                            <>
                                {
                                            cell.mode == "navigation" ? (
                                              <>
                                                {numberConverter.format(cell.data)}
                                              </>
                                            ) : null
                                          }
                                {
                                            cell.mode == "edit" ? (
                                              <>
                                                <oj-input-text id="it2" aria-label="Input Text Number" required value={rowData?.LocationId ?? null} validators={validators} converter={numberConverter} class="editable" onvalueChanged={(event) => updateRowData('LocationId', Number(event.detail.value ?? 0))} />
                                              </>
                                            ) : null
                                          }
                            </>
                          )} />
                    <template slot="typeTemplate" render={(cell) => (
                            <>
                                {
                                            cell.mode == "navigation" ? (
                                              <>
                                                {cell.data}
                                              </>
                                            ) : null
                                          }
                                {
                                            cell.mode == "edit" ? (
                                              <>
                                                <oj-select-single id="ss1" aria-label="Select Single" value={rowData?.Type ?? ''} data={departments} class="editable" onvalueChanged={(event) => updateRowData('Type', event.detail.value ?? '')} />
                                              </>
                                            ) : null
                                          }
                            </>
                          )} />
                    <template slot="currencyTemplate" render={(cell) => (
                            <>
                                {
                                            cell.mode == "navigation" ? (
                                              <>
                                                {cell.data}
                                              </>
                                            ) : null
                                          }
                                {
                                            cell.mode == "edit" ? (
                                              <>
                                                <oj-combobox-one id="co1" aria-label="Combobox" value={rowData?.Currency ?? ''} class="editable" onvalueChanged={(event) => updateRowData('Currency', event.detail.value ?? '')}>
                                                                <oj-option value="USD">USD</oj-option>
                                                                <oj-option value="JPY">JPY</oj-option>
                                                                <oj-option value="EUR">EUR</oj-option>
                                                            </oj-combobox-one>
                                              </>
                                            ) : null
                                          }
                            </>
                          )} />
                    <template slot="dateTemplate" render={(cell) => (
                            <>
                                {
                                            cell.mode == "navigation" ? (
                                              <>
                                                {dateConverter.format(cell.data)}
                                              </>
                                            ) : null
                                          }
                                {
                                            cell.mode == "edit" ? (
                                              <>
                                                <oj-input-date id="id1" aria-label="Input Date" value={rowData?.StartDate ?? ''} class="editable" onvalueChanged={(event) => updateRowData('StartDate', event.detail.value ?? '')} />
                                              </>
                                            ) : null
                                          }
                            </>
                          )} />
                    <template slot="primaryTemplate" render={(cell) => (
                            <>
                                {
                                            cell.mode == "navigation" ? (
                                              <>
                                                {cell.data == 'checked' ? 'Checked' : 'Unchecked'}
                                              </>
                                            ) : null
                                          }
                                {
                                            cell.mode == "edit" ? (
                                              <>
                                                <div oj-sm-justify-content-center>
                                                                <oj-checkboxset id="cs2" aria-label="Checkboxset" value={rowData?.Primary ?? []} class="oj-choice-direction-row demo-table-checkbox editable" onvalueChanged={(event) => updateRowData('Primary', event.detail.value ?? [])}><oj-option value="checked" /></oj-checkboxset>
                                                            </div>
                                              </>
                                            ) : null
                                          }
                            </>
                          )} />
                    <template slot="actionTemplate" render={(cell) => (
                            <>
                                {
                                            cell.mode == "navigation" ? (
                                              <>
                                                <oj-button data-oj-clickthrough="disabled" class="oj-button-sm" display="icons" label="Edit" chroming="borderless" onojAction={handleUpdate(cell.item.metadata.key)}>
                                                                <span slot="startIcon" class="oj-ux-ico-edit" />
                                                                Edit
                                                            </oj-button>
                                              </>
                                            ) : null
                                          }
                                {
                                            cell.mode == "edit" ? (
                                              <>
                                                <oj-toolbar data-oj-clickthrough="disabled" chroming="borderless" class="oj-sm-padding-0-vertical oj-sm-padding-4x-end oj-sm-float-end">
                                                                <oj-button display="icons" label="Submit" class="oj-button-sm" onojAction={handleDone} data-oj-clickthrough="disabled">
                                                                                  <span slot="startIcon" class="oj-ux-ico-check" />
                                                                                  Save
                                                                              </oj-button>
                                                                <oj-button display="icons" label="Cancel" class="oj-button-sm" onojAction={handleCancel} data-oj-clickthrough="disabled">
                                                                                  <span slot="startIcon" class="oj-ux-ico-multiply" />
                                                                                  Cancel
                                                                              </oj-button>
                                                            </oj-toolbar>
                                              </>
                                            ) : null
                                          }
                            </>
                          )} />
                </oj-table>
            <br />
            <br />
            <oj-label for="editedContent">Edited Data:</oj-label>
            <oj-text-area id="editedContent" rows={3} value={editedData} />
        </div>
    );
};

export default TableEditableArrayTable;

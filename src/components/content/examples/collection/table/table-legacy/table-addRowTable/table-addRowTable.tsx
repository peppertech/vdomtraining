import "css!./demo.css";
import 'ojs/ojbutton';
import { ojButton } from 'ojs/ojbutton';
import 'ojs/ojcheckboxset';
import * as Context from 'ojs/ojcontext';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojdatetimepicker';
import { ojInputDate } from 'ojs/ojdatetimepicker';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import { ojInputText } from 'ojs/ojinputtext';
import 'ojs/ojlabel';
import 'ojs/ojlabelvalue';
import 'ojs/ojmessages';
import 'ojs/ojoption';
import 'ojs/ojselectcombobox';
import { ojComboboxOne } from 'ojs/ojselectcombobox';
import 'ojs/ojselectsingle';
import { ojSelectSingle } from 'ojs/ojselectsingle';
import 'ojs/ojtable';
import { ojTable } from 'ojs/ojtable';
import 'ojs/ojtoolbar';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import * as deptData from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import BufferingDataProvider = require('ojs/ojbufferingdataprovider');
import NumberRangeValidator = require('ojs/ojvalidator-numberrange');

interface DepartmentData {
    DepartmentId: number;
    DepartmentName: string;
    LocationId: number;
    Type: string;
    Currency: string;
    StartDate: string;
    Primary?: Array<string>;
}

interface SelectSingleData {
    label: string;
}

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;
type TableColumns = ComponentProps<'oj-table'>['columns'];
type AddRowContext = { submitAddRow: (cancelAdd: boolean) => void };
type DelayMode = 'off' | 'on';
type EditRowState = ComponentProps<'oj-table'>['editRow'];
type AddRowDisplay = 'top' | 'hidden';
type EditableRowTemplateContext = ojTable.RowTemplateContext<DepartmentData['DepartmentId'], DepartmentData> & {
    mode?: 'navigation' | 'edit';
};
type EditableDepartmentData = Omit<DepartmentData, 'DepartmentId' | 'LocationId'> & {
    DepartmentId: number | null;
    LocationId: number | null;
    Primary: string[];
};
type CompleteEditableDepartmentData = EditableDepartmentData & DepartmentData;

const isCompleteDepartmentData = (data: EditableDepartmentData): data is CompleteEditableDepartmentData =>
    data.DepartmentId != null && data.LocationId != null;

export const TableAddRowTable = () => {
  const [deptObservableArray, setDeptObservableArray] = useState<DepartmentData[]>(
      () => JSON.parse(deptData as string) as DepartmentData[]
  );
  const [rowData, setRowData] = useState<DepartmentData | null>(null);
  const [editedData, setEditedData] = useState<string>('');
  const [simulatedDelays, setSimulatedDelays] = useState<DelayMode>('off');
  const [editDelay, setEditDelay] = useState(2000);
  const [editEndDelay, setEditEndDelay] = useState(2000);
  const [editRow, setEditRow] = useState<EditRowState>({ rowKey: null });
  const [displayRow, setDisplayRow] = useState<AddRowDisplay>('top');
  const [addRowData, setAddRowData] = useState<EditableDepartmentData>({
      DepartmentId: null,
      DepartmentName: '',
      LocationId: null,
      Type: '',
      Currency: '',
      StartDate: '',
      Primary: []
  });

  const originalDataRef = useRef<DepartmentData | null>(null);
  const cancelEditRef = useRef<boolean>(false);
  const tableRef = useRef<ojTable<DepartmentData['DepartmentId'], DepartmentData> | null>(null);

  const dataprovider = useMemo(() => new BufferingDataProvider<DepartmentData['DepartmentId'], DepartmentData>(new ArrayDataProvider<DepartmentData['DepartmentId'], DepartmentData>(deptObservableArray, {
      keyAttributes: 'DepartmentId'
  })), [deptObservableArray]);
  const departments = useMemo(() => new ArrayDataProvider([{ label: 'Sales' }, { label: 'HR' }, { label: 'Marketing' }, { label: 'Finance' }], { keyAttributes: 'label' }), []);
  const numberConverter = useMemo(() => new IntlNumberConverter(), []);
  const dateConverter = useMemo(() => new IntlDateTimeConverter({
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
  }), []);
  const rangeValidator = useMemo(() => new NumberRangeValidator({ min: 100, max: 500 }), []);
  const validators = useMemo(() => [rangeValidator], [rangeValidator]);
  const isDelayDisabled = simulatedDelays === 'off';
  const buttonText = displayRow === 'top' ? 'Hide Add Row' : 'Display Add Row';
  const columnArray = useMemo<TableColumns>(() => [
      {
          field: 'DepartmentId',
          headerText: 'ReadOnly',
          showRequired: true,
          headerClassName: 'oj-helper-text-align-end',
          className: 'oj-helper-text-align-end oj-table-data-cell-padding',
          sortable: 'enabled',
          id: 'depId',
          minWidth: '10rem'
      },
      {
          field: 'DepartmentName',
          weight: 3,
          minWidth: '10rem',
          headerText: 'InputText',
          sortable: 'enabled',
          id: 'depName'
      },
      {
          field: 'LocationId',
          headerText: 'InputText Number',
          weight: 2,
          headerClassName: 'oj-helper-text-align-end',
          className: 'oj-helper-text-align-end',
          sortable: 'enabled',
          id: 'locId',
          minWidth: '11rem'
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
          headerText: 'Action',
          width: '6.2rem',
          headerClassName: 'oj-helper-text-align-end',
          className: 'oj-helper-text-align-end oj-sm-padding-0-vertical',
          id: 'action'
      }
  ], []);

  const updateRowData = <K extends keyof DepartmentData>(field: K, value: DepartmentData[K]) => {
      setRowData((currentRowData) => currentRowData ? { ...currentRowData, [field]: value } : currentRowData);
  };

  const updateAddRowData = <K extends keyof EditableDepartmentData>(field: K, value: EditableDepartmentData[K]) => {
      setAddRowData((currentData) => ({ ...currentData, [field]: value }));
  };

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

  const clearRowData = () => {
      setAddRowData({
          DepartmentId: null,
          DepartmentName: '',
          LocationId: null,
          Type: '',
          Currency: '',
          StartDate: '',
          Primary: []
      });
  };

  const beforeRowAddEndListener = async (event: ojTable.ojBeforeRowAddEnd) => {
      const detail = event.detail;
      if (detail.cancelAdd === true) {
          if (tableRef.current) {
              resetAddRowElements(tableRef.current);
          }
          clearRowData();
      }
      else {
          const validateAndUpdate = async () => {
              const invalidInput = await validateInputs(event, true);
              if (invalidInput != null) {
                  // if an invalid input is found, prevent edit mode from exiting and queue focus
                  // to be moved back to the invalid input once the table is ready.
                  applyFocus(invalidInput);
                  throw new Error('validation failed');
              }
          };
          // utilizing the detail.accept functionality ensures that the table properly waits for
          // any async input validation to occur before finalizing the submit. a loading bar will
          // be rendered in place of the add row while any pending validation is still running.
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
              const invalidInput = await validateInputs(event, false);
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

  const validateInputs = async (event: ojTable.ojBeforeRowEditEnd<DepartmentData['DepartmentId'], DepartmentData> | ojTable.ojBeforeRowAddEnd, isAdd: boolean) => {
      if (!tableRef.current) {
          return;
      }
      let invalidInputs = await getValidationErrorElementsInRow(tableRef.current, isAdd ? '.addRowEditable' : '.editable');
      if (invalidInputs.length > 0) {
          return invalidInputs[0];
      }
      else if (!isAdd) {
          if (isRowDataUpdated()) {
              const editEvent = event as ojTable.ojBeforeRowEditEnd<DepartmentData['DepartmentId'], DepartmentData>;
              const key = editEvent.detail.rowContext.item.data.DepartmentId;
              submitRow(key);
          }
	      }
	      else {
	          if (!isCompleteDepartmentData(addRowData)) {
	              return;
	          }
	          let addItem = {
	              metadata: { key: addRowData.DepartmentId },
	              data: addRowData
	          };
	          dataprovider.addItem(addItem);
	          const editItem = dataprovider.getSubmittableItems()[0] as BufferingDataProvider.EditItem<DepartmentData['DepartmentId'], DepartmentData>;
	          dataprovider.setItemStatus(editItem, 'submitting');
	          const itemData = editItem.item.data;
	          if (itemData != null) {
	              setDeptObservableArray((currentData) => [itemData, ...currentData]);
	          }
          dataprovider.setItemStatus(editItem, 'submitted');
          clearRowData();
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
	      const editItem = dataprovider.getSubmittableItems()[0] as BufferingDataProvider.EditItem<DepartmentData['DepartmentId'], DepartmentData>;
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

  const getValidationErrorElementsInRow = async (table: ojTable<DepartmentData['DepartmentId'], DepartmentData>, editableClassName: string) => {
      let invalidInputs = [];
      const editables = table.querySelectorAll(editableClassName);
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

  const resetAddRowElements = (table: ojTable<DepartmentData['DepartmentId'], DepartmentData>) => {
      const editables = table.querySelectorAll('.addRowEditable');
      for (let i = 0; i < editables.length; i++) {
          const editable = editables.item(i) as ojInputText | ojInputDate | ojSelectSingle<SelectSingleData['label'], SelectSingleData> | ojComboboxOne<string, string>;
          editable.reset();
      }
  };

  const handleUpdate = (_event: ojButton.ojAction, context: ojTable.CellTemplateContext<DepartmentData['DepartmentId'], DepartmentData>) => {
      setEditRow({ rowKey: context.item.metadata.key });
  };
  const handleUpdateRow = (rowKey: DepartmentData['DepartmentId']) => () => {
      setEditRow({ rowKey });
  };

  const handleDone = () => {
      setEditRow({ rowKey: null });
  };

  const handleCancel = () => {
      cancelEditRef.current = true;
      setEditRow({ rowKey: null });
  };

  const handleDisplay = () => {
      displayRow === 'hidden' ? setDisplayRow('top') : setDisplayRow('hidden');
  };

  const handleAddSubmit = (context: AddRowContext) => () => {
      context.submitAddRow(false);
  };

  const handleAddCancel = (context: AddRowContext) => () => {
      context.submitAddRow(true);
  };

  const rowTemplateRenderer = (row: EditableRowTemplateContext) => {
      const rowItem = row.item.data;
      const currentRowData = rowData?.DepartmentId === rowItem.DepartmentId ? rowData : rowItem;

      if (row.mode === 'edit') {
          return (
              <tr>
                  <td class="oj-helper-text-align-end oj-table-data-cell-padding">
                      {numberConverter.format(rowItem.DepartmentId)}
                  </td>
                  <td>
                      <oj-input-text
                          id="it1"
                          aria-label="Department Name"
                          value={currentRowData.DepartmentName}
                          class="editable"
                          onvalueChanged={(event) => updateRowData('DepartmentName', event.detail.value ?? '')}
                      />
                  </td>
                  <td class="oj-helper-text-align-end">
                      <oj-input-text
                          id="it2"
                          aria-label="Location Id"
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
                          aria-label="Type"
                          value={currentRowData.Type}
                          data={departments}
                          class="editable"
                          onvalueChanged={(event) => updateRowData('Type', event.detail.value ?? '')}
                      />
                  </td>
                  <td>
                      <oj-combobox-one
                          id="co1"
                          aria-label="Currency"
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
                          aria-label="Start Date"
                          value={currentRowData.StartDate}
                          class="editable"
                          onvalueChanged={(event) => updateRowData('StartDate', event.detail.value ?? '')}
                      />
                  </td>
                  <td class="oj-helper-text-align-end demo-edit-action-cell">
                      <oj-toolbar chroming="borderless" class="demo-edit-action-toolbar">
                          <oj-button display="icons" onojAction={handleDone} class="oj-button-sm" data-oj-clickthrough="disabled">
                              <span slot="startIcon" class="oj-ux-ico-check" />
                              Save
                          </oj-button>
                          <oj-button display="icons" class="oj-button-sm" onojAction={handleCancel} data-oj-clickthrough="disabled">
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
              <td class="oj-helper-text-align-end oj-sm-padding-0-vertical">
                  <oj-button class="oj-button-sm" display="icons" chroming="borderless" onojAction={handleUpdateRow(row.item.metadata.key)} data-oj-clickthrough="disabled">
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
                              <oj-button id="addRowDisplay" display="icons" onojAction={handleDisplay} label={buttonText} />
                          </oj-form-layout>
                </div>
            <oj-table ref={tableRef} id="table" aria-label="Departments Table" class="oj-bg-body demo-table-container" data={dataprovider} editMode="rowEdit" addRowDisplay={displayRow} oneditRowChanged={handleEditRowEditRowChanged} editRow={editRow} onojBeforeRowEdit={beforeRowEditListener} onojBeforeRowEditEnd={beforeRowEditEndListener} onojBeforeRowAddEnd={beforeRowAddEndListener} layout="fixed" columns={columnArray} {...ojTableProps}>
                    <template slot="addRowTemplate" render={(addRow) => (
                            <>
                                <tr>
                                              <td>
                                                              <oj-input-number aria-label="Department Id" max={50000} step={0} required value={addRowData.DepartmentId} class="addRowEditable" onvalueChanged={(event) => updateAddRowData('DepartmentId', event.detail.value)} />
                                                          </td>
                                              <td>
                                                              <oj-input-text aria-label="Department Name" value={addRowData.DepartmentName} class="addRowEditable" onvalueChanged={(event) => updateAddRowData('DepartmentName', event.detail.value ?? '')} />
                                                          </td>
                                              <td>
                                                              <oj-input-number aria-label="Location Id" min={100} max={500} step={0} value={addRowData.LocationId} class="addRowEditable" onvalueChanged={(event) => updateAddRowData('LocationId', event.detail.value)} />
                                                          </td>
                                              <td>
                                                              <oj-select-single aria-label="Type" value={addRowData.Type} data={departments} class="addRowEditable" onvalueChanged={(event) => updateAddRowData('Type', event.detail.value ?? '')} />
                                                          </td>
                                              <td>
                                                              <oj-combobox-one aria-label="Currency" value={addRowData.Currency} class="addRowEditable" onvalueChanged={(event) => updateAddRowData('Currency', event.detail.value ?? '')}>
                                                                                <oj-option value="USD">USD</oj-option>
                                                                                <oj-option value="JPY">JPY</oj-option>
                                                                                <oj-option value="EUR">EUR</oj-option>
                                                                            </oj-combobox-one>
                                                          </td>
                                              <td>
                                                              <oj-input-date label-hint="Start Date" label-edge="none" value={addRowData.StartDate} class="addRowEditable" onvalueChanged={(event) => updateAddRowData('StartDate', event.detail.value ?? '')} />
                                                          </td>
                                              <td class="oj-helper-text-align-end demo-edit-action-cell">
                                                              <oj-toolbar data-oj-clickthrough="disabled" chroming="borderless" class="demo-edit-action-toolbar">
                                                                                <oj-button class="oj-button-sm" display="icons" onojAction={handleAddSubmit(addRow as AddRowContext)} data-oj-clickthrough="disabled">
                                                                                                    <span slot="startIcon" class="oj-ux-ico-check" />
                                                                                                    Submit
                                                                                                </oj-button>
                                                                                <oj-button class="oj-button-sm" display="icons" onojAction={handleAddCancel(addRow as AddRowContext)} data-oj-clickthrough="disabled">
                                                                                                    <span slot="startIcon" class="oj-ux-ico-multiply" />
                                                                                                    Cancel
                                                                                                </oj-button>
                                                                            </oj-toolbar>
                                                          </td>
                                          </tr>
                            </>
                          )} />
                    <template slot="rowTemplate" render={rowTemplateRenderer} />
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
                                                <oj-input-text id="it1" value={rowData?.DepartmentName ?? ''} class="editable" onvalueChanged={(event) => updateRowData('DepartmentName', event.detail.value ?? '')} />
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
                                                <oj-input-text id="it2" value={rowData?.LocationId ?? null} validators={validators} converter={numberConverter} class="editable" onvalueChanged={(event) => updateRowData('LocationId', Number(event.detail.value ?? 0))} />
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
                                                <oj-select-single id="ss1" aria-label="type 1" value={rowData?.Type ?? ''} data={departments} class="editable" onvalueChanged={(event) => updateRowData('Type', event.detail.value ?? '')} />
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
                                                <oj-combobox-one id="co1" aria-label="currency" value={rowData?.Currency ?? ''} class="editable" onvalueChanged={(event) => updateRowData('Currency', event.detail.value ?? '')}>
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
                                                <oj-input-date id="id1" value={rowData?.StartDate ?? ''} class="editable" onvalueChanged={(event) => updateRowData('StartDate', event.detail.value ?? '')} />
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
                                                <oj-checkboxset id="cs2" value={rowData?.Primary ?? []} class="oj-choice-direction-row demo-table-checkbox editable" onvalueChanged={(event) => updateRowData('Primary', event.detail.value ?? [])}><oj-option value="checked" /></oj-checkboxset>
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
                                                <oj-button class="oj-button-sm" display="icons" chroming="borderless" onojAction={handleUpdateRow(cell.item.metadata.key)} data-oj-clickthrough="disabled">
                                                                <span slot="startIcon" class="oj-ux-ico-edit" />
                                                                Edit
                                                            </oj-button>
                                              </>
                                            ) : null
                                          }
                                {
                                            cell.mode == "edit" ? (
                                              <>
                                                <oj-toolbar chroming="borderless" class="demo-edit-action-toolbar">
                                                                <oj-button display="icons" onojAction={handleDone} class="oj-button-sm" data-oj-clickthrough="disabled">
                                                                                  <span slot="startIcon" class="oj-ux-ico-check" />
                                                                                  Save
                                                                              </oj-button>
                                                                <oj-button display="icons" class="oj-button-sm" onojAction={handleCancel} data-oj-clickthrough="disabled">
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

export default TableAddRowTable;

import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import type { ItemContext } from 'ojs/ojcommontypes';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import BufferingDataProvider = require('ojs/ojbufferingdataprovider');
import { KeySetImpl } from 'ojs/ojkeyset';
import * as NumberConverter from 'ojs/ojconverter-number';
import * as deptData from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import 'ojs/ojinputtext';
import 'ojs/ojinputnumber';
import 'ojs/ojlabel';
import 'ojs/ojvalidationgroup';
import 'ojs/ojformlayout';
import 'ojs/ojtoolbar';
import 'ojs/ojmessages';
import { ojTable } from 'ojs/ojtable';
import 'ojs/ojtable';
import { ojTextArea } from 'ojs/ojinputtext';
import { DataProviderMutationEvent, ItemMessage } from 'ojs/ojdataprovider';
import type { ojMessage } from 'ojs/ojmessage';
import 'ojs/ojbutton';
import 'ojs/ojinputtext';

interface DepartmentData {
    DepartmentId: number;
    DepartmentName: string;
    LocationId: number;
    ManagerId: number;
}

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;
type TableColumns = ComponentProps<'oj-table'>['columns'];
type ValidationState = 'valid' | 'invalidHidden' | 'invalidShown' | 'pending' | undefined;
type NumericInputValue = number | null | undefined;
type FirstSelectedRow = ItemContext<DepartmentData['DepartmentId'], DepartmentData> | null;
type DemoMessage = ojMessage.Message;

export const TableObservableArrayTable = () => {
  const tableRef = useRef<ojTable<DepartmentData['DepartmentId'], DepartmentData> | null>(null);
  const bufferContentRef = useRef<ojTextArea | null>(null);
  const noDataRef = useRef<HTMLDivElement | null>(null);
  const deptArray: DepartmentData[] = JSON.parse(deptData as string) as DepartmentData[];
  const columns = useMemo<TableColumns>(() => [
      { headerText: 'Department Id', field: 'DepartmentId', id: 'depId' },
      { headerText: 'Department Name', field: 'DepartmentName', id: 'depName' },
      { headerText: 'Location Id', field: 'LocationId', id: 'locId' },
      { headerText: 'Manager Id', field: 'ManagerId', id: 'manId' }
  ], []);
  const [deptObservableArray, setDeptObservableArray] = useState<DepartmentData[]>(deptArray);
  const [isEmptyTable, setIsEmptyTable] = useState(false);
  const [messageArray, setMessageArray] = useState<DemoMessage[]>([]);
  const [groupValid, setGroupValid] = useState<ValidationState>(undefined);
  const [inputDepartmentId, setInputDepartmentId] = useState<NumericInputValue>(undefined);
  const [inputDepartmentName, setInputDepartmentName] = useState<string | undefined>(undefined);
  const [inputLocationId, setInputLocationId] = useState<NumericInputValue>(undefined);
  const [inputManagerId, setInputManagerId] = useState<NumericInputValue>(undefined);
  const [firstSelected, setFirstSelected] = useState<FirstSelectedRow>(null);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const dataprovider = useMemo(() => new BufferingDataProvider<DepartmentData['DepartmentId'], DepartmentData>(new ArrayDataProvider(deptObservableArray, {
      keyAttributes: 'DepartmentId'
  })), [deptObservableArray]);
  const converter = useMemo(() => new NumberConverter.IntlNumberConverter({
      useGrouping: false
  }), []);
  const disableCreate = inputDepartmentId == null || groupValid === 'invalidShown';
  const disableRemoveUpdate = !firstSelected || !firstSelected.key || groupValid === 'invalidShown';

  const handleGroupValidValidChanged = (event: PropertyChangedEvent<ValidationState>) => {
	    setGroupValid(event.detail.value);
	  };

  const handleInputDepartmentIdValueChanged = (event: PropertyChangedEvent<NumericInputValue>) => {
	    setInputDepartmentId(event.detail.value);
	  };

  const handleInputDepartmentNameValueChanged = (event: PropertyChangedEvent<string | undefined>) => {
	    setInputDepartmentName(event.detail.value);
	  };

  const handleInputLocationIdValueChanged = (event: PropertyChangedEvent<NumericInputValue>) => {
	    setInputLocationId(event.detail.value);
	  };

  const handleInputManagerIdValueChanged = (event: PropertyChangedEvent<NumericInputValue>) => {
	    setInputManagerId(event.detail.value);
	  };

	  const addRow = () => {
	      if (groupValid !== 'invalidShown' && inputDepartmentId != null && inputDepartmentName != null && inputLocationId != null && inputManagerId != null) {
	          const dept: DepartmentData = {
              DepartmentId: inputDepartmentId,
              DepartmentName: inputDepartmentName,
              LocationId: inputLocationId,
              ManagerId: inputManagerId
          };
          dataprovider.addItem({
              metadata: { key: dept.DepartmentId },
              data: dept
          });
      }
  };

	  const updateRow = () => {
	      if (groupValid !== 'invalidShown' && inputDepartmentId != null && inputDepartmentName != null && inputLocationId != null && inputManagerId != null) {
          const element = tableRef.current;
          const currentRow = element?.currentRow;
          if (currentRow != null) {
              const key = inputDepartmentId;
	              const newData: DepartmentData = {
                  DepartmentId: inputDepartmentId,
                  DepartmentName: inputDepartmentName,
                  LocationId: inputLocationId,
                  ManagerId: inputManagerId
              };
              dataprovider.updateItem({ metadata: { key: key }, data: newData });
          }
      }
  };

  const removeRow = () => {
      const element = tableRef.current;
      if (!element) {
          return;
      }
      const currentRow = element.currentRow;
      if (currentRow != null && currentRow.rowIndex != null) {
          const dataObj = element.getDataForVisibleRow(currentRow.rowIndex);
          if (!dataObj) {
              return;
          }
          dataprovider.removeItem({
              metadata: { key: dataObj.key },
              data: dataObj.data
          });
          dataprovider.getTotalSize().then((value: number) => {
               if (value == 0) {
                   setIsEmptyTable(true);
               }
          });
          // Clear the table selection
          element.selected = { row: new KeySetImpl(), column: new KeySetImpl() };
      }
  };

  const removeAllRow = () => {
      dataprovider.fetchByOffset({ size: -1, offset: 0 }).then((fetchResults) => {
          let dataArray = fetchResults.results;
          for (let i = 0; i < dataArray.length; i++) {
              dataprovider.removeItem(dataArray[i]);
          }
          dataprovider.getTotalSize().then((value: number) => {
               if (value == 0) {
                   setIsEmptyTable(true);
               }
          });
      });
  };

  const resetRows = () => {
      dataprovider.resetAllUnsubmittedItems();
      setIsEmptyTable(dataprovider.isEmpty() === 'yes');
      setMessageArray([
          {
              severity: 'confirmation',
              summary: 'Changes have been reset.',
              autoTimeout: 4000
          }
      ]);
  };

  const findIndex = (key: number) => {
      const ar = deptObservableArray;
      for (let idx = 0; idx < deptObservableArray.length; idx++) {
          if (ar[idx].DepartmentId === key) {
              return idx;
          }
      }
      return -1;
  };

  const commitOneRow = (editItem: BufferingDataProvider.EditItem<DepartmentData['DepartmentId'], DepartmentData>) => {
      const idx = findIndex(editItem.item.metadata.key);
	      let error: DemoMessage | undefined;
	      if (idx > -1) {
	          if (editItem.operation === 'update') {
	              const itemData = editItem.item.data;
	              if (itemData == null) {
	                  return Promise.resolve();
	              }
	              deptObservableArray.splice(idx, 1, itemData);
          }
          else if (editItem.operation === 'remove') {
              deptObservableArray.splice(idx, 1);
          }
          else {
              error = {
                  severity: 'error',
                  summary: 'add error',
                  detail: 'Row with same key already exists'
              };
          }
      }
	      else {
	          if (editItem.operation === 'add') {
	              const itemData = editItem.item.data;
	              if (itemData == null) {
	                  return Promise.resolve();
	              }
	              deptObservableArray.splice(deptObservableArray.length, 0, itemData);
          }
          else {
              error = {
                  severity: 'error',
                  summary: editItem.operation + ' error',
                  detail: 'Row for key cannot be found'
              };
          }
      }
      if (error) {
          return Promise.reject(error);
      }
      return Promise.resolve();
  };

  const submitRows = () => {
      setDisableSubmit(true);
      // Get all the submittable items
      const editItems = dataprovider.getSubmittableItems();
      editItems.forEach((editItem) => {
          // Set each edit item to "submitting" status before data submission
          dataprovider.setItemStatus(editItem, 'submitting');
          //DepartmentData
          // Commit data
          commitOneRow(editItem).then(() => {
              // Set the edit item to "submitted" if successful
              dataprovider.setItemStatus(editItem, 'submitted');
          })
              .catch((error: ItemMessage) => {
              // Set the edit item back to "unsubmitted" with error if not successful
              dataprovider.setItemStatus(editItem, 'unsubmitted', error);
	              const severity = error.severity;
	              const messageSeverity: DemoMessage['severity'] =
	                  severity === 'confirmation' || severity === 'info' || severity === 'warning' || severity === 'error'
	                      ? severity
	                      : 'error';
	              var errorMsg: DemoMessage = {
	                  severity: messageSeverity,
                  summary: error.summary,
                  autoTimeout: 4000
              };
              setMessageArray((currentMessages) => [...currentMessages, errorMsg]);
          });
      });
      setMessageArray([
          {
              severity: 'confirmation',
              summary: 'Changes have been submitted.',
              autoTimeout: 4000
          }
      ]);
  };

  const showSubmittableItems = (submittable: Array<BufferingDataProvider.EditItem<DepartmentData['DepartmentId'], DepartmentData>>) => {
      const textarea = bufferContentRef.current;
      if (!textarea) {
          return;
      }
      let textValue = '';
      submittable.forEach((editItem: BufferingDataProvider.EditItem<DepartmentData['DepartmentId'], DepartmentData>) => {
          textValue += editItem.operation + ' ';
          textValue += editItem.item.metadata.key + ': ';
          textValue += JSON.stringify(editItem.item.data);
          if (editItem.item.metadata.message) {
              textValue += ' error: ' + JSON.stringify(editItem.item.metadata.message);
          }
          textValue += '\n';
      });
      textarea.value = textValue;
  };

	  const firstSelectedRowChangedListener = (event: ojTable.firstSelectedRowChanged<DepartmentData['DepartmentId'], DepartmentData>) => {
	      const itemContext = event.detail.value;
	      setFirstSelected(itemContext ?? null);
      if (itemContext && itemContext.data) {
          const dept = itemContext.data;
          setInputDepartmentId(dept.DepartmentId);
          setInputDepartmentName(dept.DepartmentName);
          setInputLocationId(dept.LocationId);
          setInputManagerId(dept.ManagerId);
      }
  };

  const hideTable = (hide: boolean) => {
      const table = tableRef.current;
      const noDataDiv = noDataRef.current;
      if (!table || !noDataDiv) {
          return;
      }
      if (hide === true) {
          table.classList.add('oj-sm-hide');
          noDataDiv.classList.remove('oj-sm-hide');
      }
      else {
          table.classList.remove('oj-sm-hide');
          noDataDiv.classList.add('oj-sm-hide');
      }
  };

  return (
      <div id="tableDemo">
            <oj-messages messages={messageArray} />
            <div class="oj-flex">
                    <div class="oj-flex-item oj-panel oj-bg-neutral-30">
                                          <oj-validation-group onvalidChanged={handleGroupValidValidChanged} valid={groupValid}>
                                          <oj-form-layout>
                                                         <oj-input-number id="departmentIdInput" max={2000} min={0} label-hint="Department Id" onvalueChanged={handleInputDepartmentIdValueChanged} value={inputDepartmentId} converter={converter} />
                                                         <oj-input-text id="departmentNameInput" label-hint="Department Name" onvalueChanged={handleInputDepartmentNameValueChanged} value={inputDepartmentName} />
                                                         <oj-input-number id="locationIdInput" label-hint="Location Id" max={2000} min={0} onvalueChanged={handleInputLocationIdValueChanged} value={inputLocationId} converter={converter} />
                                                         <oj-input-number id="managerIdInput" label-hint="Manager Id" max={2000} min={0} onvalueChanged={handleInputManagerIdValueChanged} value={inputManagerId} converter={converter} />
                                                     </oj-form-layout>
                                          <oj-toolbar chroming="outlined">
                                                        <oj-button id="addbutton" onojAction={addRow} disabled={disableCreate}>Create</oj-button>
                                                        <oj-button id="updateButton" onojAction={updateRow} disabled={disableRemoveUpdate}>Update</oj-button>
                                                        <oj-button id="removeButton" onojAction={removeRow} disabled={disableRemoveUpdate}>Remove</oj-button>
                                                        <oj-button id="removeAllButton" onojAction={removeAllRow} disabled={isEmptyTable}>Remove All</oj-button>
                                                    </oj-toolbar>
                                      </oj-validation-group>
                          </div>
                    <div id="tableContainer" class="oj-flex-item oj-sm-padding-2x-horizontal">
	                              <oj-table ref={tableRef} id="table" aria-label="Departments Table" class="demo-table-container oj-helper-text-align-center" data={dataprovider} columns={columns} first-selected-row={firstSelected ?? undefined} onfirstSelectedRowChanged={firstSelectedRowChangedListener} {...{ 'accessibility.row-header': "depName", 'selection-mode.row': "single" }} />
                              <div ref={noDataRef} id="noDataDiv" class="oj-flex demo-table-container oj-helper-text-align-center oj-sm-hide">
                    <div class="oj-flex-item oj-sm-align-self-center">
                                                        <span>No data available. Please use the form controls to create a new row.</span>
                                                    </div>
                                      </div>
                              <oj-toolbar chroming="outlined">
                                          <oj-button id="resetButton" onojAction={resetRows} disabled={disableSubmit}>Reset Changes</oj-button>
                                          <oj-button id="submitButton" onojAction={submitRows} disabled={disableSubmit}>Submit Changes</oj-button>
                                      </oj-toolbar>
                          </div>
                </div>
            <div>
                    <oj-label for="bufferContent">Buffered Changes:</oj-label>
                    <oj-text-area ref={bufferContentRef} id="bufferContent" rows={10} class="demo-table-textarea" />
                </div>
        </div>
    );
};

export default TableObservableArrayTable;

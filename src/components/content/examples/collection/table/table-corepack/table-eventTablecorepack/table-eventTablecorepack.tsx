/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ojTable } from 'ojs/ojtable';
import 'ojs/ojtable';
import { AllKeySetImpl, KeySetImpl, KeySet } from 'ojs/ojkeyset';
import * as deptData from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import 'ojs/ojinputtext';
import 'ojs/ojformlayout';
// import 'ojs/ojtextarea';

interface DepartmentData {
    DepartmentId: number;
    DepartmentName: string;
    LocationId: number;
    ManagerId: number;
}

export const TableEventTablecorepack = () => {
  const [eventLog, setEventLog] = useState<any>('');
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(() => [
      { headerText: 'Department Id', field: 'DepartmentId', id: 'depId' },
      { headerText: 'Department Name', field: 'DepartmentName', id: 'depName' },
      { headerText: 'Location Id', field: 'LocationId', id: 'locId' },
      { headerText: 'Manager Id', field: 'ManagerId', id: 'manId' }
  ], []);

  const deptArray: any = JSON.parse(deptData);
  const dataprovider = useMemo(() => new ArrayDataProvider(deptArray, {
      keyAttributes: 'DepartmentId'
  }), [deptArray]);
  const [selectedItems, setSelectedItems] = useState<{
      row?: KeySet<number>;
      column?: KeySet<string>;
  }>({
      row: new KeySetImpl<number>(),
      column: new KeySetImpl<string>()
  });
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
      accessibility: { rowHeader: 'depName' },
      selectionMode: { row: 'multiple', column: 'multiple' },
      columnsDefault: { sortable: 'enabled' },
      selected: selectedItems
  };

  const sortListener = (event: ojTable.ojSort) => {
      const data = event.detail;
      let eventTxt = 'Triggered ojSort event: \n';
      eventTxt = eventTxt + '{header: ' + data.header + ' direction: ' + data.direction + '} \n';
      const currentTxt = eventLog;
      setEventLog(eventTxt + '\n' + currentTxt);
  };

  const selectedListener = (event: ojTable.selectedChanged<DepartmentData['DepartmentId'], DepartmentData>) => {
      setSelectedItems(event.detail.value);
      let eventTxt = '';
      let keys = '';
      if (event.type === 'selectedChanged') {
          let rowKeySet: KeySet<number> | undefined = event.detail.value.row;
          let columnKeySet: KeySet<string> | undefined = event.detail.value.column;
          // Add the keys of the selected rows into the eventLog
          if (rowKeySet != null && rowKeySet.isAddAll()) {
              eventTxt += 'Triggered selectedChanged event: \nSelected Row Key(s):\n';
              keys = 'Everything selected ';
              if ((rowKeySet as AllKeySetImpl<number>).deletedValues().size > 0) {
                  keys = keys + 'except ';
              }
              (rowKeySet as AllKeySetImpl<number>).deletedValues().forEach((key) => {
                  keys = keys + key + '  ';
              });
          }
          else if (rowKeySet != null && (rowKeySet as KeySetImpl<number>).values().size > 0) {
              eventTxt += 'Triggered selectedChanged event: \nSelected Row Key(s):\n';
              (rowKeySet as KeySetImpl<number>).values().forEach((key) => {
                  keys = keys + key + '  ';
              });
          }
          else if (columnKeySet != null && (columnKeySet as KeySetImpl<string>).values().size > 0) {
              // Add the keys of the selected columns into the eventLog
              (columnKeySet as KeySetImpl<string>).values().forEach((key) => {
                  keys = keys + key + '  ';
              });
              eventTxt += 'Triggered selectedChanged event: \nSelected Column Key(s):\n';
          }
          else {
              eventTxt += 'Triggered selectedChanged event: \nSelection Cleared';
          }
          eventTxt = eventTxt + keys + '\n';
          let currentTxt = eventLog;
          currentTxt = currentTxt == null ? '' : currentTxt;
          if (eventTxt != null && eventTxt !== '') {
              setEventLog(eventTxt + '\n' + currentTxt);
          }
      }
  };

  const currentRowListener = (event: ojTable.currentRowChanged<DepartmentData['DepartmentId'], DepartmentData>) => {
      const data = event.detail;
      const currentTxt = eventLog;
      let eventTxt = 'Triggered CurrentRowChanged event: \n';
      eventTxt += 'Current row key: ' + (data.value != null ? data.value.rowKey : '') + '\n';
      eventTxt +=
          'Previous current row key: ' +
              (data.previousValue != null ? data.previousValue.rowKey : '') +
              '\n';
      setEventLog(eventTxt + '\n' + currentTxt);
  };

  const rowActionListener = (event: ojTable.ojRowAction<DepartmentData['DepartmentId'], DepartmentData>) => {
      const data = event.detail;
      const currentTxt = eventLog;
      let eventTxt = 'Triggered ojRowAction event: \n';
      eventTxt += 'Row key: ' + data.context.key + '\n';
      setEventLog(eventTxt + '\n' + currentTxt);
  };

  return (
      <div id="tableContainer">
            <oj-table id="table" aria-label="Departments Table" data={dataprovider} columns={columns} class="demo-table-container" onselectedChanged={selectedListener} onojSort={sortListener} oncurrentRowChanged={currentRowListener} onojRowAction={rowActionListener} {...ojTableProps} />
            <oj-form-layout>
                    <oj-text-area id="eventLog" value={eventLog} rows={10} readonly label-hint="event log" />
                </oj-form-layout>
        </div>
    );
};

export default TableEventTablecorepack;

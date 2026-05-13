/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ojTable } from 'ojs/ojtable';
import * as deptData from 'text!../../data/cookbook/dataCollections/table/shared/departmentData.json';
import 'ojs/ojtable';
import 'ojs/ojbutton';
import 'ojs/ojselectsingle';
import 'ojs/ojformlayout';
import { KeySetImpl, AllKeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojtextarea';

interface Employee {
    DepartmentId: number;
    DepartmentName: string;
    LocationId: number;
    ManagerId: number;
}

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

export const TableSelectionTable = () => {
  const [selectedItems, setSelectedItems] = useState<any>({
      row: new KeySetImpl(),
      column: new KeySetImpl()
  });
  const [isDisabled, setIsDisabled] = useState<any>(true);
  const [selectionInfo, setSelectionInfo] = useState<any>('');
  const [selectedSelectionMode, setSelectedSelectionMode] = useState<any>({
      row: 'multiple',
      column: 'none'
  });
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(() => [
      { headerText: 'Department Id', field: 'DepartmentId', id: 'depId' },
      { headerText: 'Department Name', field: 'DepartmentName', id: 'depName' },
      { headerText: 'Location Id', field: 'LocationId', id: 'locId' },
      { headerText: 'Manager Id', field: 'ManagerId', id: 'manId' }
  ], []);
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
      accessibility: { rowHeader: 'depName' }
  };

  const deptArray: any = JSON.parse(deptData);
  const dataprovider = useMemo(() => new ArrayDataProvider(deptArray, {
      keyAttributes: 'DepartmentId'
  }), [deptArray]);
  const selectionModes = useMemo(() => [
      { value: { row: 'none', column: 'single' }, label: 'Single Column' },
      { value: { row: 'none', column: 'multiple' }, label: 'Multiple Column' },
      { value: { row: 'single', column: 'none' }, label: 'Single Row' },
      { value: { row: 'multiple', column: 'none' }, label: 'Multiple Row' },
      { value: { row: 'multipleToggle', column: 'none' }, label: 'Multiple Toggle Row' }
  ], []);
  const selectionModeDP = useMemo(() => new ArrayDataProvider(selectionModes, {
      keyAttributes: 'value'
  }), [selectionModes]);

  const handleSelectedSelectionModeValueChanged = (event: PropertyChangedEvent<any>) => {
    setSelectedSelectionMode(event.detail.value);
  };

  const selectedChangedListener = (event: ojTable.selectedChanged<Employee['DepartmentId'], Employee>) => {
      let selectionText = '';
      if (event.detail.value.row?.isAddAll()) {
          setIsDisabled(false);
          const iterator = (event.detail.value.row as AllKeySetImpl<number>).deletedValues();
          iterator.forEach(function (key) {
              selectionText = selectionText.length === 0 ? `${key}` : `${selectionText}, ${key}`;
          });
          if (iterator.size > 0) {
              selectionText = ' except ' + selectionText;
          }
          selectionText = 'All rows are selected' + selectionText;
      }
      else {
          const row = event.detail.value.row as KeySetImpl<number>;
          const column = event.detail.value.column as KeySetImpl<string>;
          if (row.values().size > 0) {
              row.values().forEach(function (key) {
                  selectionText += selectionText.length === 0 ? key : ', ' + key;
              });
              selectionText = 'Row Keys: ' + selectionText;
          }
          if (column.values().size > 0) {
              column.values().forEach(function (key) {
                  selectionText += selectionText.length === 0 ? key : ', ' + key;
              });
              selectionText = 'Column Keys: ' + selectionText;
          }
          setIsDisabled(row.values().size === 0 && column.values().size === 0);
      }
      setSelectionInfo(selectionText);
  };

  const clearSelection = () => {
      setSelectedItems({ row: new KeySetImpl(), column: new KeySetImpl() });
  };

  return (
      <div id="container">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                    <oj-form-layout label-edge="top" max-columns="2" direction="row">
                              <oj-select-single label-hint="Selection Mode" id="selection-mode" onvalueChanged={handleSelectedSelectionModeValueChanged} value={selectedSelectionMode} data={selectionModeDP} class="demo-table-select-single" />
                              <oj-text-area label-hint="Current Selection" readonly value={selectionInfo} />
                              <oj-button onojAction={clearSelection} disabled={isDisabled}>Clear selection</oj-button>
                          </oj-form-layout>
                </div>
            <oj-table id="table" aria-label="Departments Table" class="demo-table-container" data={dataprovider} selected={selectedItems} selectionMode={selectedSelectionMode} scrollPolicy="loadMoreOnScroll" scrollPolicyOptions={{ fetchSize: 10 }} onselectedChanged={selectedChangedListener} columns={columns} {...ojTableProps} />
        </div>
    );
};

export default TableSelectionTable;

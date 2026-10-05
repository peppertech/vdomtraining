import 'oj-c/table';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import { AllKeySetImpl, KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojselectsingle';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as deptData from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface Employee {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
}

type SelectedItems = NonNullable<ComponentProps<'oj-c-table'>['selected']>;
type SelectionMode = NonNullable<ComponentProps<'oj-c-table'>['selectionMode']>;
type SelectedChangedEvent = Parameters<NonNullable<ComponentProps<'oj-c-table'>['onselectedChanged']>>[0];
type SelectionModeOption = { value: SelectionMode; label: string };

export default function TableSelectionTablecorepack() {
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    row: new KeySetImpl<number>(),
    column: new KeySetImpl<string>()
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectionInfo, setSelectionInfo] = useState('');
  const [selectionMode, setSelectionMode] = useState<SelectionMode>({ row: 'multiple', column: 'none' });

  const columns = useMemo<NonNullable<ComponentProps<'oj-c-table'>['columns']>>(() => ({
    depId: { headerText: 'Department Id', field: 'DepartmentId' },
    depName: { headerText: 'Department Name', field: 'DepartmentName' },
    locId: { headerText: 'Location Id', field: 'LocationId' },
    manId: { headerText: 'Manager Id', field: 'ManagerId' }
  }), []);
  const departments = useMemo<Employee[]>(() => JSON.parse(deptData as string) as Employee[], []);
  const dataProvider = useMemo(() => new ArrayDataProvider<Employee['DepartmentId'], Employee>(
    departments, { keyAttributes: 'DepartmentId' }
  ), [departments]);
  const selectionModes = useMemo<SelectionModeOption[]>(() => [
    { value: { row: 'none', column: 'single' }, label: 'Single Column' },
    { value: { row: 'none', column: 'multiple' }, label: 'Multiple Column' },
    { value: { row: 'single', column: 'none' }, label: 'Single Row' },
    { value: { row: 'multiple', column: 'none' }, label: 'Multiple Row' },
    { value: { row: 'multipleToggle', column: 'none' }, label: 'Multiple Toggle Row' }
  ], []);
  const selectionModeProvider = useMemo(() => new ArrayDataProvider(selectionModes, {
    keyAttributes: 'value'
  }), [selectionModes]);

  const handleSelectionModeChanged = (event: CustomEvent<{ value: SelectionMode }>) => {
    setSelectionMode(event.detail.value ?? { row: 'multiple', column: 'none' });
  };

  const handleSelectedChanged = (event: SelectedChangedEvent) => {
    const selected: SelectedItems = event.detail.value ?? {};
    setSelectedItems(selected);
    const row = selected.row;
    const column = selected.column;
    let selectionText = '';
    if (row?.isAddAll()) {
      const excluded = Array.from((row as AllKeySetImpl<number>).deletedValues()).join(', ');
      selectionText = 'All rows are selected' + (excluded ? ` except ${excluded}` : '');
      setIsDisabled(false);
    } else {
      const rowKeys = row ? Array.from((row as KeySetImpl<number>).values()).join(', ') : '';
      const columnKeys = column ? Array.from((column as KeySetImpl<string>).values()).join(', ') : '';
      selectionText = [
        rowKeys && `Row Keys: ${rowKeys}`,
        columnKeys && `Column Keys: ${columnKeys}`
      ].filter(Boolean).join('\n');
      setIsDisabled(!rowKeys && !columnKeys);
    }
    setSelectionInfo(selectionText);
  };

  const clearSelection = () => {
    setSelectedItems({ row: new KeySetImpl<number>(), column: new KeySetImpl<string>() });
    setSelectionInfo('');
    setIsDisabled(true);
  };

  return (
    <div id="container">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <oj-form-layout label-edge="top" max-columns="2" direction="row">
          <oj-select-single
            label-hint="Selection Mode"
            id="selection-mode"
            onvalueChanged={handleSelectionModeChanged}
            value={selectionMode}
            data={selectionModeProvider}
            class="demo-table-select-single"
          />
          <oj-text-area label-hint="Current Selection" readonly value={selectionInfo} />
          <oj-button onojAction={clearSelection} disabled={isDisabled}>Clear selection</oj-button>
        </oj-form-layout>
      </div>
      <oj-c-table
        id="table"
        aria-label="Departments Table"
        class="demo-table-container"
        data={dataProvider}
        selected={selectedItems}
        selectionMode={selectionMode}
        scrollPolicyOptions={{ fetchSize: 10 }}
        onselectedChanged={handleSelectedChanged}
        columns={columns}
        row={{ accessibleRowHeader: 'depName' }}
      />
    </div>
  );
}

export { TableSelectionTablecorepack };

import 'oj-c/table';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import { AllKeySetImpl, KeySetImpl } from 'ojs/ojkeyset';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as deptData from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface DepartmentData {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
}

type SelectedItems = NonNullable<ComponentProps<'oj-c-table'>['selected']>;
type SelectedChangedEvent = Parameters<NonNullable<ComponentProps<'oj-c-table'>['onselectedChanged']>>[0];
type CurrentCellChangedEvent = Parameters<NonNullable<ComponentProps<'oj-c-table'>['oncurrentCellChanged']>>[0];
type RowActionEvent = Parameters<NonNullable<ComponentProps<'oj-c-table'>['onojRowAction']>>[0];

export default function TableEventTablecorepack() {
  const [eventLog, setEventLog] = useState('');
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    row: new KeySetImpl<number>(),
    column: new KeySetImpl<string>()
  });
  const columns = useMemo<NonNullable<ComponentProps<'oj-c-table'>['columns']>>(() => ({
    depId: { headerText: 'Department Id', field: 'DepartmentId' },
    depName: { headerText: 'Department Name', field: 'DepartmentName' },
    locId: { headerText: 'Location Id', field: 'LocationId' },
    manId: { headerText: 'Manager Id', field: 'ManagerId' }
  }), []);
  const departments = useMemo<DepartmentData[]>(() => JSON.parse(deptData as string) as DepartmentData[], []);
  const dataProvider = useMemo(() => new ArrayDataProvider<DepartmentData['DepartmentId'], DepartmentData>(
    departments, { keyAttributes: 'DepartmentId' }
  ), [departments]);

  const log = (message: string) => setEventLog((current) => `${message}\n\n${current}`);

  const handleSelectedChanged = (event: SelectedChangedEvent) => {
    const selected: SelectedItems = event.detail.value ?? {};
    setSelectedItems(selected);
    const row = selected.row;
    const column = selected.column;
    const rowKeys = row?.isAddAll()
      ? `Everything selected${(row as AllKeySetImpl<number>).deletedValues().size ? ` except ${Array.from((row as AllKeySetImpl<number>).deletedValues()).join(' ')}` : ''}`
      : row ? Array.from((row as KeySetImpl<number>).values()).join(' ') : '';
    const columnKeys = column?.isAddAll()
      ? `Everything selected${(column as AllKeySetImpl<string>).deletedValues().size ? ` except ${Array.from((column as AllKeySetImpl<string>).deletedValues()).join(' ')}` : ''}`
      : column ? Array.from((column as KeySetImpl<string>).values()).join(' ') : '';
    if (rowKeys) log(`Triggered selectedChanged event:\nSelected Row Key(s):\n${rowKeys}`);
    else if (columnKeys) log(`Triggered selectedChanged event:\nSelected Column Key(s):\n${columnKeys}`);
    else log('Triggered selectedChanged event:\nSelection Cleared');
  };

  const handleCurrentCellChanged = (event: CurrentCellChangedEvent) => {
    const cell = event.detail.value;
    const previous = event.detail.previousValue;
    const describeCell = (value: typeof cell) => {
      if (!value) return 'none';
      if (value.type === 'data') return `data row ${value.rowKey}, column ${value.columnKey}`;
      if (value.type === 'noData') return 'no data';
      return `${value.type} column ${value.columnKey}`;
    };
    log(`Triggered currentCellChanged event:\nCurrent cell: ${describeCell(cell)}\nPrevious cell: ${describeCell(previous)}`);
  };

  const handleRowAction = (event: RowActionEvent) => {
    log(`Triggered ojRowAction event:\nRow key: ${event.detail.context.item.metadata.key}`);
  };

  return (
    <div id="tableContainer">
      <oj-c-table
        id="table"
        aria-label="Departments Table"
        data={dataProvider}
        columns={columns}
        row={{ accessibleRowHeader: 'depName' }}
        class="demo-table-container"
        selectionMode={{ row: 'multiple', column: 'multiple' }}
        selected={selectedItems}
        onselectedChanged={handleSelectedChanged}
        oncurrentCellChanged={handleCurrentCellChanged}
        onojRowAction={handleRowAction}
      />
      <oj-form-layout>
        <oj-text-area id="eventLog" value={eventLog} rows={10} readonly label-hint="event log" />
      </oj-form-layout>
    </div>
  );
}

export { TableEventTablecorepack };

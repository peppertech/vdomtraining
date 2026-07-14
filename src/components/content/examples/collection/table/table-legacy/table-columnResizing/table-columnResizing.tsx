import 'ojs/ojbutton';
import 'ojs/ojdatasource-common';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojlabel';
import 'ojs/ojlabelvalue';
import 'ojs/ojradioset';
import 'ojs/ojtable';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');

interface ColumnOption {
  headerText: string;
  field: string;
  resizable?: 'enabled' | 'disabled';
}

type ResizeBehavior = 'redistribute' | 'add';
type TableColumns = NonNullable<ComponentProps<'oj-table'>['columns']>;
type InputNumberChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0];
type RadiosetChangedEvent = Parameters<NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>>[0];

const rows = 100;

const generateData = (columns: number) => {
  const dataArray: Array<Array<string>> = [];
  for (let i = 0; i < rows; i++) {
    const row: Array<string> = [];
    for (let j = 0; j < columns; j++) {
      row[j] = `${i},${j}`;
    }
    dataArray[i] = row;
  }
  return dataArray;
};

const generateColumns = (count: number): TableColumns =>
  Array.from({ length: count }, (_, index) => ({
    headerText: `Col${index}`,
    field: `${index}`,
    resizable: 'enabled'
  }));

export const TableColumnResizing = () => {
  const [columnCount, setColumnCount] = useState(10);
  const [columnsOption, setColumnsOption] = useState<TableColumns>(() => generateColumns(10));
  const [selectedBehavior, setSelectedBehavior] = useState<ResizeBehavior>('redistribute');

  const behaviorValues = useMemo(
    () => [
      { value: 'redistribute', label: 'redistribute' },
      { value: 'add', label: 'add' }
    ] as const,
    []
  );
  const selectedBehaviorDP = useMemo(
    () => new MutableArrayDataProvider([...behaviorValues], { keyAttributes: 'value' }),
    [behaviorValues]
  );
  const dataprovider = useMemo(
    () => new MutableArrayDataProvider(generateData(columnCount), { keyAttributes: '0' }),
    [columnCount]
  );

  const handleSelectedBehaviorValueChanged = (event: RadiosetChangedEvent) => {
    setSelectedBehavior((event.detail.value ?? 'redistribute') as ResizeBehavior);
  };

  const handleColumnsOptionColumnsChanged = (
    event: Parameters<NonNullable<ComponentProps<'oj-table'>['oncolumnsChanged']>>[0]
  ) => {
    setColumnsOption((event.detail.value ?? []) as TableColumns);
  };

  const updateData = (event: InputNumberChangedEvent) => {
    const columns = event.detail.value ?? 1;
    setColumnCount(columns);
    setColumnsOption(generateColumns(columns));
  };

  return (
    <div id="table-container">
      <div class="oj-panel oj-bg-neutral-30">
        <h2 id="h1" class="oj-typography-subheading-md">
          Options To Control The Table Below
        </h2>
        <oj-form-layout maxColumns={2} direction="row" class="oj-formlayout-full-width">
          <oj-form-layout userAssistanceDensity="compact">
            <oj-label id="resizeBehaviorLabel">Column resize behavior:</oj-label>
            <oj-radioset
              id="radiosetBasicDemoId"
              labelledBy="resizeBehaviorLabel"
              onvalueChanged={handleSelectedBehaviorValueChanged}
              value={selectedBehavior}
              options={selectedBehaviorDP}
            />
            <oj-label for="inputnumber-columns">Columns</oj-label>
            <oj-input-number
              id="inputnumber-columns"
              class="demo-table-input-number"
              min={1}
              step={1}
              value={columnCount}
              onvalueChanged={updateData}
            />
          </oj-form-layout>
        </oj-form-layout>
      </div>
      <oj-table
        id="table"
        aria-label="Column Resizing Table"
        data={dataprovider}
        columnResizeBehavior={selectedBehavior}
        oncolumnsChanged={handleColumnsOptionColumnsChanged}
        columns={columnsOption}
        class="demo-table-container"
      />
    </div>
  );
};

export default TableColumnResizing;

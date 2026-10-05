import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojlabel';
import 'ojs/ojradioset';
import 'oj-c/table';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');

type TableColumns = NonNullable<ComponentProps<'oj-c-table'>['columns']>;
type ResizeBehavior = 'redistribute' | 'add';
type DataRow = { id: number; [field: string]: string | number };

const rows = 100;

const generateData = (columnCount: number): DataRow[] =>
  Array.from({ length: rows }, (_, rowIndex) => {
    const row: DataRow = { id: rowIndex };
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      row[`col${columnIndex}`] = `${rowIndex},${columnIndex}`;
    }
    return row;
  });

const generateColumns = (count: number): TableColumns =>
  Object.fromEntries(Array.from({ length: count }, (_, index) => [
    `col${index}`,
    { headerText: `Col${index}`, field: `col${index}`, resizable: 'enabled' as const }
  ])) as TableColumns;

export default function TableColumnResizingcorepack() {
  const [columnCount, setColumnCount] = useState(10);
  const [selectedBehavior, setSelectedBehavior] = useState<ResizeBehavior>('redistribute');
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

  const behaviorValues = useMemo(() => [
    { value: 'redistribute', label: 'redistribute' },
    { value: 'add', label: 'add' }
  ], []);
  const selectedBehaviorDP = useMemo(() =>
    new MutableArrayDataProvider(behaviorValues, { keyAttributes: 'value' }),
    [behaviorValues]
  );
  const columns = useMemo(() => generateColumns(columnCount), [columnCount]);
  const columnOrder = useMemo(() => Object.keys(columns), [columns]);
  const dataProvider = useMemo(() =>
    new MutableArrayDataProvider<number, DataRow>(generateData(columnCount), {
      keyAttributes: 'id'
    }), [columnCount]
  );

  const updateData = (
    event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]
  ) => {
    setColumnCount(Math.max(1, Math.floor(event.detail.value ?? 1)));
    setColumnWidths({});
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
              onvalueChanged={(event) =>
                setSelectedBehavior((event.detail.value ?? 'redistribute') as ResizeBehavior)}
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
      <oj-c-table
        id="table"
        aria-label="Column Resizing Table"
        data={dataProvider}
        layout="fixed"
        columnResizeBehavior={selectedBehavior}
        columnWidths={columnWidths}
        oncolumnWidthsChanged={(event) => setColumnWidths(event.detail.value ?? {})}
        columns={columns}
        columnOrder={columnOrder}
        row={{ accessibleRowHeader: 'col0' }}
        class="demo-table-container"
      />
    </div>
  );
}

export { TableColumnResizingcorepack };

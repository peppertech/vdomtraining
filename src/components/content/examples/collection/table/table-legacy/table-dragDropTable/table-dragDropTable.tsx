import "css!./demo.css";
import { Item } from 'ojs/ojdataprovider';
import { KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojtable';
import type { ojTable } from 'ojs/ojtable';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import * as resultDataText from 'text!../../../data/cookbook/dataCollections/table/shared/resultData.json';
import DemoDataTransfer from './DemoDataTransfer';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface TableData {
  Year: string;
  Q1: number;
  Q2: number;
  Q3: number;
  Q4: number;
}

type TableRowTransferItem = {
  key?: TableData['Year'];
  metadata?: { key: TableData['Year'] };
  data: TableData;
};

const dataMimeType = 'application/ojtablerows+json';
const initialTargetData: TableData[] = [
  { Year: '2016', Q1: 600, Q2: 625, Q3: 650, Q4: 675 },
  { Year: '2017', Q1: 700, Q2: 725, Q3: 750, Q4: 775 },
  { Year: '2018', Q1: 800, Q2: 825, Q3: 850, Q4: 875 },
  { Year: '2019', Q1: 900, Q2: 925, Q3: 950, Q4: 975 }
];

const getTransferKey = (item: TableRowTransferItem) => item.metadata?.key ?? item.key ?? item.data.Year;

export const TableDragDropTable = () => {
  const [sourceData, setSourceData] = useState<TableData[]>(
    () => JSON.parse(resultDataText as string) as TableData[]
  );
  const [targetData, setTargetData] = useState<TableData[]>(initialTargetData);
  const draggedRowKeysRef = useRef<Array<TableData['Year']>>([]);
  const cutRowKeysRef = useRef<Array<TableData['Year']>>([]);
  const clipboardRef = useRef(new DemoDataTransfer());

  const sourceDataprovider = useMemo(
    () => new ArrayDataProvider<TableData['Year'], TableData>(sourceData, { keyAttributes: 'Year' }),
    [sourceData]
  );
  const targetDataprovider = useMemo(
    () => new ArrayDataProvider<TableData['Year'], TableData>(targetData, { keyAttributes: 'Year' }),
    [targetData]
  );
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(
    () => [
      { headerText: 'Year', field: 'Year', id: 'year' },
      { headerText: 'Q1', field: 'Q1', id: 'q1' },
      { headerText: 'Q2', field: 'Q2', id: 'q2' },
      { headerText: 'Q3', field: 'Q3', id: 'q3' },
      { headerText: 'Q4', field: 'Q4', id: 'q4' }
    ],
    []
  );

  const removeRowsFromSource = (keys: Array<TableData['Year']>) => {
    if (keys.length === 0) {
      return;
    }
    setSourceData((currentData) => currentData.filter((row) => !keys.includes(row.Year)));
  };

  const handleDataTransfer = (dataTransfer: DataTransfer | DemoDataTransfer | null, rowIndex: number) => {
    if (!dataTransfer) {
      return false;
    }

    const dragData = dataTransfer.getData(dataMimeType);
    if (!dragData) {
      return false;
    }

    const dragDataArray = JSON.parse(dragData) as TableRowTransferItem[];
    const rowsToInsert = dragDataArray.map((item) => item.data);
    setTargetData((currentData) => {
      const insertIndex = Math.min(Math.max(rowIndex, 0), currentData.length);
      return [
        ...currentData.slice(0, insertIndex),
        ...rowsToInsert,
        ...currentData.slice(insertIndex)
      ];
    });
    return true;
  };

  const handleDragStart = (event: DragEvent) => {
    const dragData = event.dataTransfer?.getData(dataMimeType);
    if (dragData) {
      const dragDataArray = JSON.parse(dragData) as TableRowTransferItem[];
      draggedRowKeysRef.current = dragDataArray.map(getTransferKey);
      return;
    }

    const table = event.currentTarget as ojTable<TableData['Year'], TableData>;
    const selected = table.selected?.row as KeySetImpl<TableData['Year']> | undefined;
    if (!selected) {
      draggedRowKeysRef.current = [];
      return;
    }

    draggedRowKeysRef.current = selected.isAddAll()
      ? sourceData.map((row) => row.Year)
      : Array.from(selected.values());
  };

  const handleDragEnd = (event: DragEvent) => {
    if (event.dataTransfer?.dropEffect !== 'none') {
      removeRowsFromSource(draggedRowKeysRef.current);
    }
    draggedRowKeysRef.current = [];
  };

  const handleDropRows = (event: DragEvent, context: ojTable.DropRowContext) => {
    if (handleDataTransfer(event.dataTransfer, context.rowIndex ?? targetData.length)) {
      removeRowsFromSource(draggedRowKeysRef.current);
    }
  };

  const saveToClipboard = (dataArray: Array<Item<TableData['Year'], TableData>>) => {
    cutRowKeysRef.current = dataArray.map((item) => item.metadata.key);
    clipboardRef.current.setData(dataMimeType, JSON.stringify(dataArray));
  };

  const handleKey = (event: KeyboardEvent) => {
    const table = event.currentTarget as ojTable<TableData['Year'], TableData>;
    if (!(event.ctrlKey || event.metaKey)) {
      return;
    }

    if (event.key === 'x' && table.id === 'table1') {
      const selected = table.selected?.row as KeySetImpl<TableData['Year']> | undefined;
      if (!selected) {
        return;
      }

      if (selected.isAddAll()) {
        sourceDataprovider.fetchByOffset({ size: -1, offset: 0 }).then((fetchResult) => {
          saveToClipboard(fetchResult.results.filter((result) => selected.has(result.metadata.key)));
        });
        return;
      }

      sourceDataprovider.fetchByKeys({ keys: selected.values() }).then((fetchResult) => {
        saveToClipboard(Array.from(fetchResult.results.values()));
      });
      return;
    }

    if (event.key === 'v' && table.id === 'table2' && table.currentRow?.rowIndex != null) {
      handleDataTransfer(clipboardRef.current, table.currentRow.rowIndex + 1);
      removeRowsFromSource(cutRowKeysRef.current);
    }
  };

  const sourceTableProps: Partial<ComponentProps<'oj-table'>> = {
    accessibility: { rowHeader: 'year' },
    columnsDefault: { sortable: 'disabled' },
    selectionMode: { row: 'multiple' },
    dnd: {
      drag: {
        rows: {
          dataTypes: [dataMimeType],
          dragStart: handleDragStart,
          dragEnd: handleDragEnd
        }
      }
    }
  };
  const targetTableProps: Partial<ComponentProps<'oj-table'>> = {
    accessibility: { rowHeader: 'year' },
    columnsDefault: { sortable: 'disabled' },
    selectionMode: { row: 'multiple' },
    dnd: {
      drop: {
        rows: {
          dataTypes: [dataMimeType],
          drop: handleDropRows
        }
      }
    }
  };

  return (
    <div id="container">
      <h3>Table 1: Drag Source</h3>
      <oj-table
        id="table1"
        aria-label="Revenue Table 1"
        onKeyDown={handleKey}
        class="demo-table-container"
        data={sourceDataprovider}
        columns={columns}
        {...sourceTableProps}
      />
      <h3>Table 2: Drop Target</h3>
      <oj-table
        id="table2"
        aria-label="Revenue Table 2"
        onKeyDown={handleKey}
        class="demo-table-container"
        data={targetDataprovider}
        columns={columns}
        {...targetTableProps}
      />
    </div>
  );
};

export default TableDragDropTable;

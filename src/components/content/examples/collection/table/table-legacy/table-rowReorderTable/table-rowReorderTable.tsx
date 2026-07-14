import { KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojtable';
import { ojTable } from 'ojs/ojtable';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as resultData from 'text!../../../data/cookbook/dataCollections/table/shared/resultData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface TableData {
    Year: string;
    Q1: number;
    Q2: number;
    Q3: number;
    Q4: number;
}

const clipboard = new DataTransfer();

export const TableRowReorderTable = () => {
  const [dataArray, setDataArray] = useState<TableData[]>(() => JSON.parse(resultData as string) as TableData[]);
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(() => [
      { headerText: 'Year', field: 'Year', id: 'year' },
      { headerText: 'Q1', field: 'Q1', id: 'q1' },
      { headerText: 'Q2', field: 'Q2', id: 'q2' },
      { headerText: 'Q3', field: 'Q3', id: 'q3' },
      { headerText: 'Q4', field: 'Q4', id: 'q4' }
  ], []);

  const dataprovider = useMemo(() => new ArrayDataProvider(dataArray, {
      keyAttributes: 'Year'
  }), [dataArray]);

  const handleDropRows = (event: DragEvent, context: ojTable.DropRowContext) => {
      if (event.dataTransfer && context.rowIndex != null) {
          _handleDataTransfer(event.dataTransfer, context.rowIndex);
      }
  };

  const _handleDataTransfer = (dataTransfer: DataTransfer, rowIndex: number) => {
      const dragData = dataTransfer.getData('application/ojtablerows+json');
      if (dragData) {
	          const rowDataArray = JSON.parse(dragData) as Array<{ metadata?: { key: TableData['Year'] }; key?: TableData['Year']; data: TableData }>;
          const toRowIndex = rowIndex;
          const key = rowDataArray[0].metadata ? rowDataArray[0].metadata.key : rowDataArray[0].key;
          if (key) {
              const fromRowIndex = dataArray.findIndex((data) => data.Year === key);
              const resultArray = [...dataArray];
              resultArray.splice(fromRowIndex, 1);
              if (fromRowIndex < toRowIndex) {
                  resultArray.splice(toRowIndex - 1, 0, rowDataArray[0].data);
              }
              else {
                  resultArray.splice(toRowIndex, 0, rowDataArray[0].data);
              }
              setDataArray(resultArray);
          }
      }
  };

  const handleKey = (event: KeyboardEvent) => {
      const table = event.currentTarget as ojTable<TableData['Year'], TableData>;
      if (event.ctrlKey || event.metaKey) {
          if (event.key === 'x') {
              const selected = table.selected.row as KeySetImpl<TableData['Year']>;
              dataprovider.fetchByKeys({ keys: selected.values() }).then((fetchResult) => {
                  const iterator = fetchResult.results.values();
                  const results = Array.from(iterator);
                  const jsonStr = JSON.stringify(results);
                  // use the same MIME type as drag source
                  clipboard.setData('application/ojtablerows+json', jsonStr);
              });
          }
          else if (event.key === 'v' && table.currentRow?.rowIndex != null) {
              _handleDataTransfer(clipboard, table.currentRow.rowIndex + 1);
          }
      }
  };
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
      accessibility: { rowHeader: 'year' },
      selectionMode: { row: 'single' },
      columnsDefault: { sortable: 'disabled' },
      dnd: {
          drag: { rows: { dataTypes: ['application/ojtablerows+json'] } },
          drop: { rows: { dataTypes: ['application/ojtablerows+json'], drop: handleDropRows } }
      }
  };

  return (
      <>
          <h3>Table</h3>
          <oj-table id="table" aria-label="Revenue Table" onKeyDown={handleKey} class="demo-table-container" data={dataprovider} columns={columns} {...ojTableProps} />
      </>
    );
};

export default TableRowReorderTable;

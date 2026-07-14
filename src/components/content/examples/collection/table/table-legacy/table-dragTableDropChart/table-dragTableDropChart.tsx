import "css!./demo.css";
import 'ojs/ojchart';
import { KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojtable';
import type { ojTable } from 'ojs/ojtable';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as resultDataText from 'text!../../../data/cookbook/dataCollections/table/shared/resultData.json';
import DemoDataTransfer from './DemoDataTransfer';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type TableData = {
  Year: string;
  Q1: number;
  Q2: number;
  Q3: number;
  Q4: number;
};

type ChartItem = {
  id: string;
  group: string;
  series: string;
  value: number;
};

const clipboard = new DemoDataTransfer();
const dataMimeType = 'application/ojtablerows+json';

export const TableDragTableDropChart = () => {
  const dataArray = useMemo<TableData[]>(() => JSON.parse(resultDataText as string) as TableData[], []);
  const dataProvider = useMemo(
    () => new ArrayDataProvider<TableData['Year'], TableData>(dataArray, { keyAttributes: 'Year' }),
    [dataArray]
  );
  const [chartItems, setChartItems] = useState<ChartItem[]>([
    { id: 'default-q1', group: ' ', series: 'Q1', value: 0 },
    { id: 'default-q2', group: ' ', series: 'Q2', value: 0 },
    { id: 'default-q3', group: ' ', series: 'Q3', value: 0 },
    { id: 'default-q4', group: ' ', series: 'Q4', value: 0 }
  ]);
  const chartDataProvider = useMemo(
    () => new ArrayDataProvider<ChartItem['id'], ChartItem>(chartItems, { keyAttributes: 'id' }),
    [chartItems]
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
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
    accessibility: { rowHeader: 'year' },
    dnd: {
      drag: {
        rows: {
          dataTypes: [dataMimeType]
        }
      }
    }
  };
  const ojChartProps: Partial<ComponentProps<'oj-chart'>> = {
    animationOnDisplay: 'auto',
    animationOnDataChange: 'auto',
    dnd: {
      drop: {
        plotArea: {
          dataTypes: [dataMimeType],
          drop: (event: DragEvent) => handleDrop(event)
        }
      }
    }
  };

  const itemTemplateRenderer = (item: { data: ChartItem }) => (
    <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series} />
  );

  const updateChartFromTransfer = (dataTransfer: DataTransfer | DemoDataTransfer | null) => {
    if (!dataTransfer) {
      return;
    }

    const jsonStr = dataTransfer.getData(dataMimeType);
    if (!jsonStr) {
      return;
    }

    const rows = JSON.parse(jsonStr) as Array<{ data: TableData }>;
    const nextItems = rows.flatMap((row) => [
      { id: `${row.data.Year}-q1`, group: row.data.Year, series: 'Q1', value: row.data.Q1 },
      { id: `${row.data.Year}-q2`, group: row.data.Year, series: 'Q2', value: row.data.Q2 },
      { id: `${row.data.Year}-q3`, group: row.data.Year, series: 'Q3', value: row.data.Q3 },
      { id: `${row.data.Year}-q4`, group: row.data.Year, series: 'Q4', value: row.data.Q4 }
    ]);

    setChartItems(nextItems);
  };

  const handleTableKey = (event: KeyboardEvent) => {
    if (!(event.ctrlKey || event.metaKey) || event.key !== 'c') {
      return;
    }

    const table = event.currentTarget as ojTable<TableData['Year'], TableData>;
    const selected = table.selected.row as KeySetImpl<TableData['Year']>;
    if (selected.isAddAll()) {
      dataProvider.fetchByOffset({ size: -1, offset: 0 }).then((fetchResult) => {
        const results = fetchResult.results.filter((result) => selected.has(result.metadata.key));
        clipboard.setData(dataMimeType, JSON.stringify(results));
      });
      return;
    }

    dataProvider.fetchByKeys({ keys: selected.values() }).then((fetchResult) => {
      const results = Array.from(fetchResult.results.values());
      clipboard.setData(dataMimeType, JSON.stringify(results));
    });
  };

  const handleChartKey = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
      updateChartFromTransfer(clipboard);
    }
  };

  const handleDrop = (event: DragEvent) => {
    updateChartFromTransfer(event.dataTransfer);
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <>
      <oj-table
        id="table1"
        aria-label="Revenue Table 1"
        onKeyDown={handleTableKey}
        data={dataProvider}
        class="demo-table-container"
        columns={columns}
        selectionMode={{ row: 'multiple' }}
        {...ojTableProps}
      />
      <div id="chart-container">
        <oj-chart
          id="barChart"
          onKeyDown={handleChartKey}
          type="bar"
          data={chartDataProvider}
          aria-label="Every row data of table is shown in form of bar chart"
          {...ojChartProps}
        >
          <template slot="itemTemplate" render={itemTemplateRenderer} />
        </oj-chart>
      </div>
    </>
  );
};

export default TableDragTableDropChart;

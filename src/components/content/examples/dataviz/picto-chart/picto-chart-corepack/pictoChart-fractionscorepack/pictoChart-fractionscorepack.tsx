// @ts-nocheck
import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import * as tableDataText from 'text!../../data/cookbook/dataVisualizations/pictoChart/resources/appleYearlyData.json';
import 'ojs/ojpictochart';
import 'ojs/ojtable';
import 'ojs/ojlegend';

interface Product {
  Product: string;
  year2010: number;
  year2011: number;
  year2012: number;
  total: number;
}

const tableData = JSON.parse(tableDataText as string) as Product[];

export const PictoChartFractionscorepack = () => {
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const dataProvider = useMemo(
    () => new ArrayDataProvider<Product['Product'], Product>(tableData, { keyAttributes: 'Product' }),
    []
  );
  const columns = useMemo(
    () => [
      { headerText: 'Product', field: 'Product', id: 'product' },
      { headerText: '2010', field: 'year2010', template: 'pictoChartCellTemplate', id: '2010' },
      { headerText: '2011', field: 'year2011', template: 'pictoChartCellTemplate', id: '2011' },
      { headerText: '2012', field: 'year2012', template: 'pictoChartCellTemplate', id: '2012' },
      { headerText: 'Total', field: 'total', id: 'total' }
    ],
    []
  );
  const legendItems = useMemo(() => [{ text: '10 million units' }], []);
  const legendDataProvider = useMemo(() => new ArrayDataProvider(legendItems, { keyAttributes: 'text' }), [legendItems]);

  const getChartDataProvider = (cell: DatavizTableCellTemplateContext<Product>) => {
    const item = [
      {
        id: `${cell.item.data.Product}-${cell.columnIndex}`,
        name: Object.keys(cell.item.data)[cell.columnIndex],
        count: cell.data,
        color: colorHandler.getValue(cell.item.data.Product)
      }
    ];
    return new ArrayDataProvider(item, { keyAttributes: 'id' });
  };

  const cellTemplateRenderer = (cell: DatavizTableCellTemplateContext<Product>) => (
    <oj-picto-chart id={`picto-${cell.item.data.Product}-${cell.columnIndex}`} data={getChartDataProvider(cell)} row-count={1}>
      <template
        slot="itemTemplate"
        render={(item: DatavizTemplateContext<DatavizChartDatum>) => (
          <oj-picto-chart-item
            name={item.data.name}
            short-desc={`${item.data.id}: ${item.data.count * 10} million units`}
            color={item.data.color}
            count={item.data.count}
          />
        )}
      />
    </oj-picto-chart>
  );

  return (
    <div id="chart-container">
      <div class="oj-typography-bold oj-sm-margin-2x-top">Apple Product Sales</div>
      <oj-table
        id="table"
        aria-label="Apple Products Sales"
        data={dataProvider}
        columnsDefault={{ sortable: 'enabled' }}
        display="grid"
        class="oj-sm-margin-6x-vertical"
        columns={columns}
        {...{ 'accessibility.rowHeader': 'product' }}
      >
        <template slot="pictoChartCellTemplate" render={cellTemplateRenderer} />
      </oj-table>
      <oj-legend id="legend1" data={legendDataProvider}>
        <template slot="itemTemplate" render={(item: DatavizTemplateContext<DatavizChartDatum>) => <oj-legend-item text={item.data.text} short-desc={item.data.text} />} />
      </oj-legend>
    </div>
  );
};

export default PictoChartFractionscorepack;

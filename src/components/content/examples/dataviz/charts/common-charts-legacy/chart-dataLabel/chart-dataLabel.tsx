import { Fragment, h } from 'preact';
import { useMemo } from 'preact/hooks';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import * as chartDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/salesData.json';
import { ojChart } from 'ojs/ojchart';

import 'ojs/ojchart';

import ArrayDataProvider = require('ojs/ojarraydataprovider');

const chartData = JSON.parse(chartDataText as string);

export const ChartDataLabel = () => {
  const dataProvider = useMemo(() => new ArrayDataProvider(chartData, {
      keyAttributes: 'id'
  }), []);
  const percentConverter = useMemo(() => new IntlNumberConverter({
      style: 'percent',
      maximumFractionDigits: 1
  }), []);
  const currencyConverter = useMemo(() => new IntlNumberConverter({
      style: 'currency',
      currency: 'USD',
      currencyFormat: 'short'
  }), []);

  const pieSliceLabel = (dataContext: ojChart.DataLabelContext<string, Record<string, string | number>, null>) => {
      const percent = dataContext.value / dataContext.totalValue;
      return `${currencyConverter.format(dataContext.value)} (${percentConverter.format(percent)})`;
  };

    const itemTemplateRenderer = (item: any) => {
    return <oj-chart-item value={item.data.value} groupId={[item.data.year]} seriesId={item.data.region}/>;
};

return (
      <div id="chart-container">
            <h4 class="oj-sm-margin-4x-start">Sales Data</h4>
            <oj-chart id="pieChart" type="pie" data={dataProvider} dataLabel={pieSliceLabel}>
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                </oj-chart>
        </div>
    );
};

export default ChartDataLabel;


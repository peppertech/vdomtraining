/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as data from 'text!../data/cookbook/dataVisualizations/chart/resources/shapedSingleItemData.json';
import 'ojs/ojchart';

export const PieChartShapedData = () => {
  const [chartData, setChartData] = useState<any[]>(JSON.parse(data));

  const dataProvider = useMemo(() => new ArrayDataProvider(chartData, {
      keyAttributes: 'id'
  }), [chartData]);

  return (
      <div id="chart-container">
            <oj-chart id="pieChart" type="pie" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" hoverBehavior="dim" aria-label="Pie chart with four series over one group" />
        </div>
    );
};

export default PieChartShapedData;

import { useMemo } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicShapedCoordData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojchart';

const data = JSON.parse(dataText as string);

export const ScatterChartShapedData = () => {
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(data, {
        keyAttributes: 'id'
      }),
    []
  );

  return (
    <div id="chart-container">
      <oj-chart
        type="scatter"
        selectionMode="multiple"
        data={dataProvider}
        animationOnDisplay="auto"
        hoverBehavior="dim"
        aria-label="Stock chart displaying information about a stock on a time axis"
      />
    </div>
  );
};

export default ScatterChartShapedData;

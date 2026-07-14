import 'ojs/ojchart';
import 'preact';
import { useMemo } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicShapedCoordData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

const data = JSON.parse(dataText as string);

export const BubbleChartShapedData = () => {
  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: 'id'
  }), []);

  return (
      <div id="chart-container">
            <oj-chart type="bubble" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" hoverBehavior="dim" aria-label="bubble chart with four series over three groups" />
        </div>
    );
};

export default BubbleChartShapedData;



import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as quarterShapedDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterShapedData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];

type QuarterDatum = {
  id: string;
};

const quarterShapedData = JSON.parse(quarterShapedDataText as string) as QuarterDatum[];

export const LineChartShapedData = () => {
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<QuarterDatum['id'], QuarterDatum>(quarterShapedData, {
        keyAttributes: 'id'
      }),
    []
  );

  const handleOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value ?? 'vertical');
  };

  return (
    <div id="chart-container">
      <oj-chart
        id="lineChart"
        type="line"
        orientation={orientationValue}
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        hoverBehavior="dim"
        aria-label="Line chart with four series over four quarters"
      />
      <demo-chart-orientation-control
        type="line"
        focusManagement="none"
        orientation={orientationValue}
        onorientationChanged={handleOrientationChanged}
      />
    </div>
  );
};

export default LineChartShapedData;

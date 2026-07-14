import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import type { ComponentProps,JSX } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as quarterDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type LineChartItem = {
  id: number;
  quarter: string;
  series: string;
  value: number;
};

const quarterData = JSON.parse(quarterDataText as string) as LineChartItem[];

export const LineChartDefault = (): JSX.Element => {
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(quarterData, {
        keyAttributes: 'id'
      }),
    []
  );

  const handleOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>): void => {
    setOrientationValue(event.detail.value);
  };

  const itemTemplateRenderer = (item: { data: LineChartItem }): JSX.Element => (
    <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series} />
  );

  return (
    <div id="chart-container">
      <oj-chart
        id="lineChart"
        type="line"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        orientation={orientationValue}
        hoverBehavior="dim"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>
      <demo-chart-orientation-control
        type="line"
        orientation={orientationValue}
        aria-controls="lineChart"
        onorientationChanged={handleOrientationChanged}
      />
    </div>
  );
};

export default LineChartDefault;

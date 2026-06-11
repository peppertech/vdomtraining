import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/oneSeriesData.json';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';

type ChartOrientation = NonNullable<ComponentProps<'oj-chart'>['orientation']>;
type RangeWidthDatum = {
  id: number;
  group: string;
  series: string;
  low: number;
  high: number;
  width: number;
};

const chartData = JSON.parse(dataText as string) as RangeWidthDatum[];

export const RangeChartVariableBarWidth = () => {
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, RangeWidthDatum>(chartData, { keyAttributes: 'id' }),
    []
  );

  const handleOrientationChanged = (
    event: DatavizValueChangedEvent<string>
  ) => {
    setOrientationValue(event.detail.value as ChartOrientation);
  };

  const itemTemplateRenderer = (item: { data: RangeWidthDatum }) => (
    <oj-chart-item
      low={item.data.low}
      high={item.data.high}
      z={item.data.width}
      groupId={[item.data.group]}
      seriesId={item.data.series}
    />
  );

  const chartProps = { 'legend.rendered': 'off' as const };

  return (
    <div id="chart-container">
      <oj-chart
        id="rangeChart"
        type="bar"
        orientation={orientationValue}
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        {...chartProps}
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>

      <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="rangeChart">
        <demo-chart-orientation-control
          id="orientationControl"
          type="bar"
          focusManagement="none"
          orientation={orientationValue}
          onorientationChanged={handleOrientationChanged}
        />
      </oj-toolbar>
    </div>
  );
};

export default RangeChartVariableBarWidth;

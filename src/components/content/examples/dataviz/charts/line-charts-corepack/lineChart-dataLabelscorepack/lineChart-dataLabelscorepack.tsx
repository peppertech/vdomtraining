import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import type { ComponentProps,JSX } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as quarterDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-select-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ChartDataLabelPosition =
  | 'auto'
  | 'center'
  | 'aboveMarker'
  | 'belowMarker'
  | 'beforeMarker'
  | 'afterMarker';
type LineChartItem = {
  id: number;
  quarter: string;
  series: string;
  value: number;
};

const quarterData = JSON.parse(quarterDataText as string) as LineChartItem[];

export const LineChartDataLabelscorepack = (): JSX.Element => {
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [labelPosition, setLabelPosition] = useState<ChartDataLabelPosition>('auto');
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(quarterData, {
        keyAttributes: 'id'
      }),
    []
  );

  const handleLabelPositionChanged = (event: JetElementCustomEvent<ChartDataLabelPosition>): void => {
    setLabelPosition(event.detail.value);
  };

  const handleOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>): void => {
    setOrientationValue(event.detail.value);
  };

  const itemTemplateRenderer = (item: { data: LineChartItem }): JSX.Element => (
    <oj-chart-item
      value={item.data.value}
      groupId={[item.data.quarter]}
      seriesId={item.data.series}
      label={Number(item.data.id) === 2 || Number(item.data.id) === 5 ? item.data.quarter : ''}
    />
  );

  const styleDefaults: NonNullable<ComponentProps<'oj-chart'>['styleDefaults']> = {
    dataLabelPosition: labelPosition,
    dataLabelStyle: { fontSize: '12px' }
  };

  return (
    <div id="chart-container">
      <oj-form-layout aria-controls="lineChart">
        <demo-select-enum
          aria-controls="lineChart"
          value={labelPosition}
          labelHint="Label Position"
          enumValues={["auto", "center", "aboveMarker", "belowMarker", "beforeMarker", "afterMarker"]}
          onvalueChanged={handleLabelPositionChanged}
        />
      </oj-form-layout>
      <oj-chart
        id="lineChart"
        type="line"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        orientation={orientationValue}
        styleDefaults={styleDefaults}
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

export default LineChartDataLabelscorepack;

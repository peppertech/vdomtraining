import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojtoolbar';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/bostonTempData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ChartOrientation = NonNullable<ComponentProps<'oj-chart'>['orientation']>;
type RangeChartType = 'bar' | 'area';
type TemperatureRangeDatum = {
  id: number;
  month: string;
  low: number;
  high: number;
};

const chartData = JSON.parse(dataText as string) as TemperatureRangeDatum[];

export const RangeChartDataLabels = () => {
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [typeValue, setTypeValue] = useState<RangeChartType>('bar');

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, TemperatureRangeDatum>(chartData, { keyAttributes: 'id' }),
    []
  );

  const handleTypeValueChanged = (
    event: DatavizValueChangedEvent<string>
  ) => {
    setTypeValue(event.detail.value as RangeChartType);
  };

  const handleOrientationChanged = (
    event: DatavizValueChangedEvent<string>
  ) => {
    setOrientationValue(event.detail.value as ChartOrientation);
  };

  const itemTemplateRenderer = (item: { data: TemperatureRangeDatum }) => (
    <oj-chart-item
      low={item.data.low}
      high={item.data.high}
      groupId={[item.data.month]}
      seriesId="Temperature"
      labelPosition="outsideBarEdge"
      label={[String(item.data.low), String(item.data.high)]}
    />
  );

  const chartProps = {
    'legend.rendered': 'off' as const,
    'value-formats.series.tooltip-display': 'off' as const,
    'value-formats.group.tooltip-label': 'Month'
  };

  return (
    <div id="chart-container">
      <oj-form-layout aria-controls="rangeChart">
        <demo-radioset-enum
          labelHint="Type"
          value={typeValue}
          direction="row"
          enumValues={["bar","area"]}
          onvalueChanged={handleTypeValueChanged}
        />
      </oj-form-layout>

      <div class="oj-typography-heading-xs oj-sm-margin-1x-bottom">Boston Temperature</div>

      <oj-chart
        id="rangeChart"
        type={typeValue}
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        orientation={orientationValue}
        {...chartProps}
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>

      <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="rangeChart">
        <demo-chart-orientation-control
          id="orientationControl"
          type={typeValue}
          focusManagement="none"
          orientation={orientationValue}
          onorientationChanged={handleOrientationChanged}
        />
      </oj-toolbar>
    </div>
  );
};

export default RangeChartDataLabels;

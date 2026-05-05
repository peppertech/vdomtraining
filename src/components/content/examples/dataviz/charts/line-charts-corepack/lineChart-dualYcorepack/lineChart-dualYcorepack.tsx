import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as twoSeriesDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/twoSeriesDualYData.json';
import 'ojs/ojchart';
import 'ojs/ojinputnumber';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';

type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ChartSplitDualY = ComponentProps<'oj-chart'>['splitDualY'];
type SplitterPosition = ComponentProps<'oj-input-number'>['value'];

type LineChartItem = {
  id: number;
  group: string;
  series: string;
  value: number;
};

type ChartItemTemplateContext = {
  data: LineChartItem;
};

type ChartSeriesTemplateContext = {
  id: string;
};

const twoSeriesData = JSON.parse(twoSeriesDataText as string) as LineChartItem[];

export const LineChartDualYcorepack = () => {
  const [splitterValue, setSplitterValue] = useState<SplitterPosition>(0.5);
  const [dualY, setDualY] = useState<ChartSplitDualY>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(twoSeriesData, {
        keyAttributes: 'id'
      }),
    []
  );

  const handleDualYChanged = (event: JetElementCustomEvent<ChartSplitDualY>) => {
    setDualY(event.detail.value);
  };

  const handleSplitterValueChanged = (
    event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]
  ) => {
    setSplitterValue(event.detail.value ?? 0.5);
  };

  const handleOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value);
  };

  const renderChartItem = (item: ChartItemTemplateContext) => (
    <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series} />
  );

  const renderSeries = (series: ChartSeriesTemplateContext) => (
    <oj-chart-series assignedToY2={series.id === 'Series 2' ? 'on' : 'off'} />
  );

  const splitterDisabled = dualY === 'off';
  const legend: NonNullable<ComponentProps<'oj-chart'>['legend']> = {
    position: 'top'
  };
  const yAxis: NonNullable<ComponentProps<'oj-chart'>['yAxis']> = {
    title: 'Y1 Axis Title'
  };
  const y2Axis: NonNullable<ComponentProps<'oj-chart'>['y2Axis']> = {
    title: 'Y2 Axis Title'
  };

  return (
    <div id="chart-container">
      <oj-form-layout>
        <demo-radioset-enum
          direction="row"
          aria-controls="lineChart"
          labelHint="Split Dual-Y"
          value={dualY}
          onvalueChanged={handleDualYChanged}
          enumValues={["on", "off"]}
        />
        <oj-input-number
          max={1}
          min={0}
          step={0.1}
          disabled={splitterDisabled}
          value={splitterValue}
          onvalueChanged={handleSplitterValueChanged}
          labelHint="Splitter Position"
        />
      </oj-form-layout>

      <oj-chart
        id="lineChart"
        type="line"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        orientation={orientationValue}
        splitDualY={dualY}
        splitterPosition={splitterValue ?? undefined}
        legend={legend}
        yAxis={yAxis}
        y2Axis={y2Axis}
      >
        <template slot="itemTemplate" render={renderChartItem} />
        <template slot="seriesTemplate" render={renderSeries} />
      </oj-chart>

      <demo-chart-orientation-control
        type="line"
        orientation={orientationValue}
        onorientationChanged={handleOrientationChanged}
        aria-controls="lineChart"
      />
    </div>
  );
};

export default LineChartDualYcorepack;

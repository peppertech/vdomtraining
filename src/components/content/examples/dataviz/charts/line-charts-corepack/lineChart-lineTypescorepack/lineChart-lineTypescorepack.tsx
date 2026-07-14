import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as quarterDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-select-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ChartLineType =
  | 'straight'
  | 'curved'
  | 'stepped'
  | 'centeredStepped'
  | 'segmented'
  | 'centeredSegmented'
  | 'none';

type LineChartItem = {
  id: number;
  quarter: string;
  series: string;
  value: number;
};

type ChartItemTemplateContext = {
  data: LineChartItem;
};

const quarterData = JSON.parse(quarterDataText as string) as LineChartItem[];

export const LineChartLineTypescorepack = () => {
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [lineTypeValue, setLineTypeValue] = useState<ChartLineType>('curved');

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(quarterData, {
        keyAttributes: 'id'
      }),
    []
  );

  const handleLineTypeChanged = (event: JetElementCustomEvent<ChartLineType>) => {
    setLineTypeValue(event.detail.value);
  };

  const handleOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value);
  };

  const renderChartItem = (item: ChartItemTemplateContext) => (
    <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series} />
  );

  const styleDefaults: NonNullable<ComponentProps<'oj-chart'>['styleDefaults']> = {
    lineType: lineTypeValue,
    markerDisplayed: 'on'
  };

  return (
    <div id="chart-container">
      <oj-form-layout>
        <demo-select-enum
          aria-controls="lineChart"
          value={lineTypeValue}
          onvalueChanged={handleLineTypeChanged}
          labelHint="Line Type"
          enumValues={["straight", "curved", "stepped", "centeredStepped", "segmented", "centeredSegmented", "none"]}
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
        <template slot="itemTemplate" render={renderChartItem} />
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

export default LineChartLineTypescorepack;

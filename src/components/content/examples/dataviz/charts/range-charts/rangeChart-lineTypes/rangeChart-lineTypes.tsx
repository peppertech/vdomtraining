import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicRangeData.json';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';

type ChartOrientation = NonNullable<ComponentProps<'oj-chart'>['orientation']>;
type LineType = 'straight' | 'curved' | 'stepped' | 'centeredStepped' | 'none';
type RangeChartDatum = {
  id: number;
  group: string;
  series: string;
  low: number;
  high: number;
};

const chartData = JSON.parse(dataText as string) as RangeChartDatum[];

export const RangeChartLineTypes = () => {
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [lineTypeValue, setLineTypeValue] = useState<LineType>('curved');

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, RangeChartDatum>(chartData, { keyAttributes: 'id' }),
    []
  );

  const handleLineTypeValueChanged = (
    event: any
  ) => {
    setLineTypeValue(event.detail.value as LineType);
  };

  const handleOrientationChanged = (
    event: any
  ) => {
    setOrientationValue(event.detail.value as ChartOrientation);
  };

  const itemTemplateRenderer = (item: { data: RangeChartDatum }) => (
    <oj-chart-item
      low={item.data.low}
      high={item.data.high}
      groupId={[item.data.group]}
      seriesId={item.data.series}
    />
  );

  const chartProps = {
    'style-defaults.line-type': lineTypeValue,
    'style-defaults.marker-displayed': 'on' as const
  };

  return (
    <div id="chart-container">
      <oj-form-layout aria-controls="areaChart">
        <demo-radioset-enum
          direction="row"
          labelHint="Line Type"
          value={lineTypeValue}
          enumValues={["straight","curved","stepped","centeredStepped","none"]}
          onvalueChanged={handleLineTypeValueChanged}
        />
      </oj-form-layout>

      <oj-chart
        id="areaChart"
        type="area"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        orientation={orientationValue}
        {...chartProps}
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>

      <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="areaChart">
        <demo-chart-orientation-control
          id="orientationControl"
          type="area"
          focusManagement="none"
          orientation={orientationValue}
          onorientationChanged={handleOrientationChanged}
        />
      </oj-toolbar>
    </div>
  );
};

export default RangeChartLineTypes;

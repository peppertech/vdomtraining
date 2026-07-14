import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojtoolbar';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicRangeData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ChartOrientation = NonNullable<ComponentProps<'oj-chart'>['orientation']>;
type RangeChartType = 'bar' | 'area';
type RangeChartItem = {
  id: number;
  group: string;
  series: string;
  low: number;
  high: number;
};

const rangeData = JSON.parse(dataText as string) as RangeChartItem[];

export const RangeChartDefault = () => {
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [typeValue, setTypeValue] = useState<RangeChartType>('area');

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, RangeChartItem>(rangeData, { keyAttributes: 'id' }),
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

  const itemTemplateRenderer = (item: { data: RangeChartItem }) => (
    <oj-chart-item
      low={item.data.low}
      high={item.data.high}
      groupId={[item.data.group]}
      seriesId={item.data.series}
    />
  );

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

      <oj-chart
        id="rangeChart"
        type={typeValue}
        orientation={orientationValue}
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
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

export default RangeChartDefault;

import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicShapedRangeData.json';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';

type ChartOrientation = NonNullable<ComponentProps<'oj-chart'>['orientation']>;
type RangeChartType = 'bar' | 'area';
type ShapedRangeDatum = {
  id: number;
  seriesId: string;
  groupId: string[];
  low: number;
  high: number;
};

const chartData = JSON.parse(dataText as string) as ShapedRangeDatum[];

export const RangeChartShapedData = () => {
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [typeValue, setTypeValue] = useState<RangeChartType>('area');

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, ShapedRangeDatum>(chartData, { keyAttributes: 'id' }),
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

  return (
    <div id="chart-container">
      <oj-form-layout aria-controls="rangeChart">
        <demo-radioset-enum
          value={typeValue}
          labelHint="Type"
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
        aria-label="Range chart with two series over five groups"
      />

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

export default RangeChartShapedData;

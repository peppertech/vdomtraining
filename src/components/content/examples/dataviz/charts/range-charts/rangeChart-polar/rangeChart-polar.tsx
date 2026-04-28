import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicRangeData.json';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';

type RangeChartType = 'bar' | 'area';
type RangeChartDatum = {
  id: number;
  group: string;
  series: string;
  low: number;
  high: number;
};

const chartData = JSON.parse(dataText as string) as RangeChartDatum[];

export const RangeChartPolar = () => {
  const [typeValue, setTypeValue] = useState<RangeChartType>('area');

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, RangeChartDatum>(chartData, { keyAttributes: 'id' }),
    []
  );

  const handleTypeValueChanged = (
    event: any
  ) => {
    setTypeValue(event.detail.value as RangeChartType);
  };

  const itemTemplateRenderer = (item: { data: RangeChartDatum }) => (
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
          direction="row"
          labelHint="Type"
          value={typeValue}
          enumValues={["bar","area"]}
          onvalueChanged={handleTypeValueChanged}
        />
      </oj-form-layout>

      <oj-chart
        id="rangeChart"
        type={typeValue}
        coordinateSystem="polar"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>
    </div>
  );
};

export default RangeChartPolar;

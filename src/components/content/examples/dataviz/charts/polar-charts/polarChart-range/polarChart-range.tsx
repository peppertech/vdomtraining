import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as rangeDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicRangeData.json';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type RangeChartType = 'bar' | 'area';
type PolarRangeItem = {
  id: number;
  group: string;
  series: string;
  low: number;
  high: number;
};

const rangeData = JSON.parse(rangeDataText as string) as PolarRangeItem[];

export const PolarChartRange = () => {
  const [typeValue, setTypeValue] = useState<RangeChartType>('area');

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, PolarRangeItem>(rangeData, { keyAttributes: 'id' }),
    []
  );

  const handleTypeChanged = (event: JetElementCustomEvent<RangeChartType>) => {
    setTypeValue(event.detail.value);
  };

  const itemTemplateRenderer = (item: { data: PolarRangeItem }) => (
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
          id="radioButtonset"
          direction="row"
          value={typeValue}
          labelHint="Type"
          onvalueChanged={handleTypeChanged}
          enumValues={["bar","area"]}
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

export default PolarChartRange;

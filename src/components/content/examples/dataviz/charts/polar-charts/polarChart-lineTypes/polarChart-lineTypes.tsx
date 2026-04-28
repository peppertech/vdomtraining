import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as lineDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/twoSeriesDualYData.json';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';

type LineType = 'straight' | 'curved' | 'stepped' | 'segmented' | 'none';
type PolarChartItem = {
  id: number;
  group: string;
  series: string;
  value: number;
};

const lineData = JSON.parse(lineDataText as string) as PolarChartItem[];

export const PolarChartLineTypes = () => {
  const [lineTypeValue, setLineTypeValue] = useState<LineType>('curved');

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, PolarChartItem>(lineData, { keyAttributes: 'id' }),
    []
  );

  const handleLineTypeChanged = (event: JetElementCustomEvent<LineType>) => {
    setLineTypeValue(event.detail.value);
  };

  const itemTemplateRenderer = (item: { data: PolarChartItem }) => (
    <oj-chart-item
      value={item.data.value}
      groupId={[item.data.group]}
      seriesId={item.data.series}
    />
  );

  return (
    <div id="chart-container">
      <oj-form-layout aria-controls="lineAreaChart">
        <demo-radioset-enum
          labelHint="Line Type"
          direction="row"
          value={lineTypeValue}
          onvalueChanged={handleLineTypeChanged}
          enumValues={["straight","curved","stepped","segmented","none"]}
        />
      </oj-form-layout>

      <oj-chart
        id="lineAreaChart"
        type="lineWithArea"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        styleDefaults={{ lineType: lineTypeValue }}
        stack="on"
        coordinateSystem="polar"
        polarGridShape="polygon"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>
    </div>
  );
};

export default PolarChartLineTypes;

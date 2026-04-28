/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/singleItemData.json';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

const chartData = JSON.parse(dataText as string);

export const PieChartDataLabels = () => {
  const [dataLabelPositionValue, setDataLabelPositionValue] = useState('auto');
  const dataProvider = useMemo(() => new ArrayDataProvider(chartData, { keyAttributes: 'id' }), []);

  const handleDataLabelPositionChanged = (event: PropertyChangedEvent<string>) => {
    setDataLabelPositionValue(event.detail.value);
  };

  const renderItem = (item: any) => (
    <oj-chart-item
      value={item.data.value}
      group-id={[item.data.group]}
      series-id={item.data.series}
    />
  );

  return (
    <div id="chart-container">
      <oj-form-layout>
        <demo-radioset-enum
          labelHint="Label Position"
          direction="row"
          aria-controls="pieChart"
          onvalueChanged={handleDataLabelPositionChanged}
          value={dataLabelPositionValue}
          enumValues={["auto","outsideSlice","center","none"]}
        />
      </oj-form-layout>
      <oj-chart
        id="pieChart"
        type="pie"
        data={dataProvider}
        animation-on-display="auto"
        animation-on-data-change="auto"
        {...{ 'style-defaults.data-label-position': dataLabelPositionValue }}
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-chart>
    </div>
  );
};

export default PieChartDataLabels;

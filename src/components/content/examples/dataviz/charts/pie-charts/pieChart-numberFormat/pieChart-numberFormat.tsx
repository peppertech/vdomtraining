import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/singleItemData.json';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

const chartData = JSON.parse(dataText as string);

export const PieChartNumberFormat = () => {
  const [formatValue, setFormatValue] = useState('percent');
  const dataProvider = useMemo(() => new ArrayDataProvider(chartData, { keyAttributes: 'id' }), []);
  const decimalConverter = useMemo(
    () =>
      new IntlNumberConverter({
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
    []
  );
  const percentConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'percent'
      }),
    []
  );
  const currencyConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'currency',
        currency: 'USD'
      }),
    []
  );
  const numberConverter = useMemo(() => {
    if (formatValue === 'decimal') {
      return decimalConverter;
    }
    if (formatValue === 'percent') {
      return percentConverter;
    }
    return currencyConverter;
  }, [currencyConverter, decimalConverter, formatValue, percentConverter]);

  const handleFormatValueChanged = (event: PropertyChangedEvent<string>) => {
    setFormatValue(event.detail.value);
  };

  const renderItem = (item: DatavizTemplateContext<DatavizChartDatum>) => {
    const formattedValue = numberConverter.format(item.data.value / 100);
    return (
      <oj-chart-item
        value={item.data.value / 100}
        label={formattedValue}
        groupId={[item.data.group]}
        seriesId={item.data.series}
      />
    );
  };

  return (
    <div id="chart-container">
      <oj-form-layout>
        <demo-radioset-enum
          onvalueChanged={handleFormatValueChanged}
          value={formatValue}
          labelHint="Number Format"
          direction="row"
          enumValues={["decimal","percent","currency"]}
        />
      </oj-form-layout>
      <oj-chart
        type="pie"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        valueFormats={{ value: { converter: numberConverter } }}
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-chart>
    </div>
  );
};

export default PieChartNumberFormat;

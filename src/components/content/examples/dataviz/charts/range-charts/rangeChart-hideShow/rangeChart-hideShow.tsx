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
type RangeChartType = 'bar' | 'area';
type RangeChartDatum = {
  id: number;
  group: string;
  series: string;
  low: number;
  high: number;
};
type HiddenCategoriesChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-chart'>['onhiddenCategoriesChanged']>
>[0];

const chartData = JSON.parse(dataText as string) as RangeChartDatum[];

export const RangeChartHideShow = () => {
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [typeValue, setTypeValue] = useState<RangeChartType>('bar');
  const [hiddenCategories, setHiddenCategories] = useState<string[]>(['Series 2']);

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, RangeChartDatum>(chartData, { keyAttributes: 'id' }),
    []
  );

  const handleTypeValueChanged = (
    event: any
  ) => {
    setTypeValue(event.detail.value as RangeChartType);
  };

  const handleHiddenCategoriesChanged = (event: HiddenCategoriesChangedEvent) => {
    setHiddenCategories((event.detail.value as string[]) ?? []);
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

  return (
    <div id="chart-container">
      <oj-form-layout aria-controls="rangeChart1 rangeChart2">
        <demo-radioset-enum
          direction="row"
          labelHint="Type"
          value={typeValue}
          enumValues={["bar","area"]}
          onvalueChanged={handleTypeValueChanged}
        />
      </oj-form-layout>

      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-margin-1x-horizontal">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-horizontal">withRescale</div>
          <oj-chart
            id="rangeChart1"
            type={typeValue}
            orientation={orientationValue}
            data={dataProvider}
            hiddenCategories={hiddenCategories}
            animationOnDisplay="auto"
            animationOnDataChange="auto"
            hideAndShowBehavior="withRescale"
            onhiddenCategoriesChanged={handleHiddenCategoriesChanged}
          >
            <template slot="itemTemplate" render={itemTemplateRenderer} />
          </oj-chart>
        </div>

        <div class="oj-flex-item oj-sm-margin-1x-horizontal">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-horizontal">withoutRescale</div>
          <oj-chart
            id="rangeChart2"
            type={typeValue}
            orientation={orientationValue}
            data={dataProvider}
            hiddenCategories={hiddenCategories}
            animationOnDisplay="auto"
            animationOnDataChange="auto"
            hideAndShowBehavior="withoutRescale"
            onhiddenCategoriesChanged={handleHiddenCategoriesChanged}
          >
            <template slot="itemTemplate" render={itemTemplateRenderer} />
          </oj-chart>
        </div>
      </div>

      <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="rangeChart1 rangeChart2">
        <demo-chart-orientation-control
          id="orientationControl"
          type={typeValue}
          focusManagement="none"
          orientation={orientationValue}
          onorientationChanged={handleOrientationChanged}
        />
      </oj-toolbar>

      <div class="oj-typography-subheading-xs oj-sm-margin-2x-vertical">
        Hidden Categories: {hiddenCategories.length > 0 ? hiddenCategories.join(', ') : 'none'}
      </div>
    </div>
  );
};

export default RangeChartHideShow;

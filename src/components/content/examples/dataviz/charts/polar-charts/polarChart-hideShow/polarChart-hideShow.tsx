import 'ojs/ojchart';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as quarterDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type HiddenCategories = ComponentProps<'oj-chart'>['hiddenCategories'];
type HiddenCategoriesChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-chart'>['onhiddenCategoriesChanged']>
>[0];

type PolarChartItem = {
  id: number;
  quarter: string;
  series: string;
  value: number;
};

const quarterData = JSON.parse(quarterDataText as string) as PolarChartItem[];

export const PolarChartHideShow = () => {
  const [hiddenCategories, setHiddenCategories] = useState<HiddenCategories>(['Series 1']);

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, PolarChartItem>(quarterData, { keyAttributes: 'id' }),
    []
  );

  const categoryInfo = (hiddenCategories ?? []).length > 0 ? hiddenCategories?.join(', ') : 'none';

  const handleHiddenCategoriesChanged = (event: HiddenCategoriesChangedEvent) => {
    setHiddenCategories(event.detail.value ?? []);
  };

  const itemTemplateRenderer = (item: { data: PolarChartItem }) => (
    <oj-chart-item
      value={item.data.value}
      groupId={[item.data.quarter]}
      seriesId={item.data.series}
    />
  );

  return (
    <div id="chart-container">
      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-margin-1x-horizontal">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-horizontal">withRescale</div>
          <oj-chart
            id="polarChart1"
            coordinateSystem="polar"
            type="area"
            polarGridShape="polygon"
            data={dataProvider}
            animationOnDisplay="auto"
            animationOnDataChange="auto"
            hideAndShowBehavior="withRescale"
            onhiddenCategoriesChanged={handleHiddenCategoriesChanged}
            hiddenCategories={hiddenCategories}
          >
            <template slot="itemTemplate" render={itemTemplateRenderer} />
          </oj-chart>
        </div>

        <div class="oj-flex-item oj-sm-margin-1x-horizontal">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-horizontal">withoutRescale</div>
          <oj-chart
            id="polarChart2"
            coordinateSystem="polar"
            type="area"
            polarGridShape="polygon"
            data={dataProvider}
            animationOnDisplay="auto"
            animationOnDataChange="auto"
            hideAndShowBehavior="withoutRescale"
            onhiddenCategoriesChanged={handleHiddenCategoriesChanged}
            hiddenCategories={hiddenCategories}
          >
            <template slot="itemTemplate" render={itemTemplateRenderer} />
          </oj-chart>
        </div>
      </div>

      <div class="oj-typography-subheading-xs oj-sm-margin-2x-vertical">
        Hidden Categories: {categoryInfo}
      </div>
    </div>
  );
};

export default PolarChartHideShow;

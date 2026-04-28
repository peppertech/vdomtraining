import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicCoordData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojchart';

type HiddenCategories = NonNullable<ComponentProps<'oj-chart'>['hiddenCategories']>;
type HiddenCategoriesChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-chart'>['onhiddenCategoriesChanged']>
>[0];

type ScatterChartItem = {
  id: number;
  group: string;
  series: string;
  x: number;
  y: number;
};

const data = JSON.parse(dataText as string) as ScatterChartItem[];

export const ScatterChartHideShow = () => {
  const [hiddenCategories, setHiddenCategories] = useState<HiddenCategories>(['Series 3']);

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(data, {
        keyAttributes: 'id'
      }),
    []
  );

  const categoryInfo = () => {
    const categories = hiddenCategories ?? [];
    return categories.length > 0 ? categories.join(', ') : 'none';
  };

  const handleHiddenCategoriesChanged = (event: HiddenCategoriesChangedEvent) => {
    setHiddenCategories(event.detail.value ?? []);
  };

  const itemTemplateRenderer = (item: any) => (
    <oj-chart-item
      x={item.data.x}
      y={item.data.y}
      groupId={[item.data.group]}
      seriesId={item.data.series}
    />
  );

  const itemTemplateRenderer2 = (item: any) => (
    <oj-chart-item
      x={item.data.x}
      y={item.data.y}
      groupId={[item.data.group]}
      seriesId={item.data.series}
    />
  );

  return (
    <div id="chart-container">
      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-margin-1x-horizontal">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-horizontal">withRescale</div>
          <oj-chart
            id="scatterChart1"
            type="scatter"
            selectionMode="multiple"
            data={dataProvider}
            hiddenCategories={hiddenCategories}
            onhiddenCategoriesChanged={handleHiddenCategoriesChanged}
            animationOnDisplay="auto"
            animationOnDataChange="auto"
            hideAndShowBehavior="withRescale"
          >
            <template slot="itemTemplate" render={itemTemplateRenderer} />
          </oj-chart>
        </div>
        <div class="oj-flex-item oj-sm-margin-1x-horizontal">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-horizontal">withoutRescale</div>
          <oj-chart
            id="scatterChart2"
            type="scatter"
            selectionMode="multiple"
            data={dataProvider}
            hiddenCategories={hiddenCategories}
            onhiddenCategoriesChanged={handleHiddenCategoriesChanged}
            animationOnDisplay="auto"
            animationOnDataChange="auto"
            hideAndShowBehavior="withoutRescale"
          >
            <template slot="itemTemplate" render={itemTemplateRenderer2} />
          </oj-chart>
        </div>
      </div>
      <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">{'Hidden Categories: ' + categoryInfo()}</div>
    </div>
  );
};

export default ScatterChartHideShow;

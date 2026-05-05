import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as data from 'text!../data/cookbook/dataVisualizations/chart/resources/singleItemData.json';
import 'ojs/ojchart';

type ChartDatum = {
  id: number;
  value: number;
  group: string;
  series: string;
};
type HiddenCategoriesChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-chart'>['onhiddenCategoriesChanged']>
>[0];
type ItemTemplateContext = {
  data: ChartDatum;
};

export const PieChartHideShow = () => {
  const [chartData] = useState<ChartDatum[]>(JSON.parse(data as string));
  const [hidden, setHidden] = useState<string[]>(['Series 1']);

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<ChartDatum['id'], ChartDatum>(chartData, {
        keyAttributes: 'id'
      }),
    [chartData]
  );
  const hiddenText = hidden.join(', ');

  const handleHiddenCategoriesChanged = (event: HiddenCategoriesChangedEvent) => {
    setHidden(event.detail.value ?? []);
  };

  const renderItem = (item: ItemTemplateContext) => {
    return (
      <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series} />
    );
  };

  return (
    <div id="chart-container">
      <oj-chart
        id="pieChart"
        type="pie"
        selectionMode="multiple"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        hideAndShowBehavior="withRescale"
        onhiddenCategoriesChanged={handleHiddenCategoriesChanged}
        hiddenCategories={hidden}
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-chart>
      <div class="oj-sm-padding-1x">
        <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Hidden Categories</div>
        <span>{hiddenText}</span>
      </div>
    </div>
  );
};

export default PieChartHideShow;

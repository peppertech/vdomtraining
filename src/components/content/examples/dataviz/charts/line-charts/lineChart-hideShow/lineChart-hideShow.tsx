import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as quarterDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type HiddenCategories = Exclude<ComponentProps<'oj-chart'>['hiddenCategories'], null | undefined>;

type LineChartItem = {
  id: number;
  quarter: string;
  series: string;
  value: number;
};

type ChartItemTemplateContext = {
  data: LineChartItem;
};

const quarterData = JSON.parse(quarterDataText as string) as LineChartItem[];

export const LineChartHideShow = () => {
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [hiddenCategories, setHiddenCategories] = useState<HiddenCategories>(['Series 1']);

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(quarterData, {
        keyAttributes: 'id'
      }),
    []
  );

  const handleHiddenCategoriesChanged = (
    event: JetElementCustomEvent<ComponentProps<'oj-chart'>['hiddenCategories']>
  ) => {
    setHiddenCategories((event.detail.value ?? []) as HiddenCategories);
  };

  const handleOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value);
  };

  const renderChartItem = (item: ChartItemTemplateContext) => (
    <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series} />
  );

  const categoryInfo = hiddenCategories.length > 0 ? hiddenCategories.join(', ') : 'none';

  return (
    <div id="chart-container" class="oj-flex oj-sm-flex-direction-column">
      <div class="oj-flex oj-flex-item">
        <div class="oj-flex-item oj-sm-margin-1x-horizontal">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">withRescale</div>
          <oj-chart
            id="lineChart1"
            type="line"
            data={dataProvider}
            animationOnDisplay="auto"
            animationOnDataChange="auto"
            hideAndShowBehavior="withRescale"
            hiddenCategories={hiddenCategories}
            onhiddenCategoriesChanged={handleHiddenCategoriesChanged}
            orientation={orientationValue}
          >
            <template slot="itemTemplate" render={renderChartItem} />
          </oj-chart>
        </div>
        <div class="oj-flex-item oj-sm-margin-1x-horizontal">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">withoutRescale</div>
          <oj-chart
            id="lineChart2"
            type="line"
            data={dataProvider}
            animationOnDisplay="auto"
            animationOnDataChange="auto"
            hideAndShowBehavior="withoutRescale"
            hiddenCategories={hiddenCategories}
            onhiddenCategoriesChanged={handleHiddenCategoriesChanged}
            orientation={orientationValue}
          >
            <template slot="itemTemplate" render={renderChartItem} />
          </oj-chart>
        </div>
      </div>
      <div>
        <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">{`Hidden Categories: ${categoryInfo}`}</div>
      </div>
      <demo-chart-orientation-control
        type="line"
        orientation={orientationValue}
        onorientationChanged={handleOrientationChanged}
        aria-controls="lineChart1 lineChart2"
      />
    </div>
  );
};

export default LineChartHideShow;

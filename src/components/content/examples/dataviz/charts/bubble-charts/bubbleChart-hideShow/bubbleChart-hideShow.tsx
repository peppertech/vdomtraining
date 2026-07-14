import 'ojs/ojchart';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicCoordData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

const data = JSON.parse(dataText as string);
type HiddenCategories = NonNullable<ComponentProps<'oj-chart'>['hiddenCategories']>;
type HiddenCategoriesChangedEvent = Parameters<NonNullable<ComponentProps<'oj-chart'>['onhiddenCategoriesChanged']>>[0];

export const BubbleChartHideShow = () => {
  const [hiddenCategories, setHiddenCategories] = useState<HiddenCategories>(['Series 2']);

  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: 'id'
  }), []);
  const categoryInfo = () => {
      const categories = hiddenCategories;
      return categories.length > 0 ? categories.join(', ') : 'none';
  };

  const handleHiddenCategoriesHiddenCategoriesChanged = (event: HiddenCategoriesChangedEvent) => {
    setHiddenCategories(event.detail.value ?? []);
  };

    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
      return <oj-chart-item x={item.data.x} y={item.data.y} z={item.data.z} groupId={[item.data.group]} seriesId={item.data.series}/>;
  };

  const itemTemplateRenderer2 = (item: DatavizTemplateContext<DatavizChartDatum>) => {
      return <oj-chart-item x={item.data.x} y={item.data.y} z={item.data.z} groupId={[item.data.group]} seriesId={item.data.series}/>;
  };

return (
      <div id="chart-container" class="oj-flex oj-sm-flex-direction-column">
            <div class="oj-flex oj-flex-item">
                    <div class="oj-flex-item oj-sm-margin-1x-horizontal">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">withRescale</div>
                              <oj-chart id="bubbleChart1" type="bubble" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" hideAndShowBehavior="withRescale" onhiddenCategoriesChanged={handleHiddenCategoriesHiddenCategoriesChanged} hiddenCategories={hiddenCategories}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer} />
                                      </oj-chart>
                          </div>
                    <div class="oj-flex-item oj-sm-margin-1x-horizontal">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">withoutRescale</div>
                              <oj-chart id="bubbleChart2" type="bubble" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" hideAndShowBehavior="withoutRescale" onhiddenCategoriesChanged={handleHiddenCategoriesHiddenCategoriesChanged} hiddenCategories={hiddenCategories}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer2} />
                                      </oj-chart>
                          </div>
                </div>
            <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">{'Hidden categories: ' + categoryInfo()}</div>
        </div>
    );
};

export default BubbleChartHideShow;


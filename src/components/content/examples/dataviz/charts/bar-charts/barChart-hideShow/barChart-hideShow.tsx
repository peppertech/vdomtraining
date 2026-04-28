import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';

import { useMemo, useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicData.json';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type HiddenCategories = ComponentProps<'oj-chart'>['hiddenCategories'];
type BarChartItem = {
    id: number;
    group: string;
    series: string;
    value: number;
};

const data = JSON.parse(dataText as string) as BarChartItem[];
export const BarChartHideShow = () => {
  const [stackValue, setStackValue] = useState<ChartStack>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [hiddenCategories, setHiddenCategories] = useState<HiddenCategories>(['Series 2', 'Series 3']);

  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: 'id'
  }), []);
  const categoryInfo = () => {
      const categories = hiddenCategories ?? [];
      return categories.length > 0 ? categories.join(', ') : 'none';
  };

  const handleHiddenCategoriesHiddenCategoriesChanged = (event: JetElementCustomEvent<string[] | undefined>) => {
    setHiddenCategories(event.detail.value ?? []);
  };
  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value);
  };

  const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
    setStackValue(event.detail.value);
  };

    const itemTemplateRenderer = (item: any) => {
      return <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series}/>;
  };

  const itemTemplateRenderer2 = (item: any) => {
      return <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series}/>;
  };

return (
      <div id="chart-container">
            <div class="oj-flex">
                    <div class="oj-flex-item oj-sm-margin-1x-horizontal">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-horizontal">withRescale</div>
                              <oj-chart id="barChart" type="bar" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" hideAndShowBehavior="withRescale" onhiddenCategoriesChanged={handleHiddenCategoriesHiddenCategoriesChanged} hiddenCategories={hiddenCategories} orientation={orientationValue} stack={stackValue}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer} />
                                      </oj-chart>
                          </div>
                    <div class="oj-flex-item oj-sm-margin-1x-horizontal">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-horizontal">withoutRescale</div>
                              <oj-chart id="barChart2" type="bar" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" hideAndShowBehavior="withoutRescale" onhiddenCategoriesChanged={handleHiddenCategoriesHiddenCategoriesChanged} hiddenCategories={hiddenCategories} orientation={orientationValue} stack={stackValue}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer2} />
                                      </oj-chart>
                          </div>
                </div>
            <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">{'Hidden Categories: ' + categoryInfo()}</div>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="barChart barChart2">
                    <demo-chart-orientation-control id="orientationControl" type="bar" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                    <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
                    <demo-chart-stack-control id="stackControl" type="bar" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue} />
                </oj-toolbar>
        </div>
    );
};
export default BarChartHideShow;

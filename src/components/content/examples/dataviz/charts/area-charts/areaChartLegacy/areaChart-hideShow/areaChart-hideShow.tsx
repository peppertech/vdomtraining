import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';

import { useMemo, useState } from 'preact/hooks';
import * as quarterDataText from 'text!../../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import '../../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../../jet-composites/demo-chart-stack-control/loader';
type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type HiddenCategories = ComponentProps<'oj-chart'>['hiddenCategories'];

type AreaChartItem = {
    id: number;
    quarter: string;
    series: string;
    value: number;
};

const quarterData = JSON.parse(quarterDataText as string) as AreaChartItem[];
export const AreaChartHideShow = () => {
  const [stackValue, setStackValue] = useState<ChartStack>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [hiddenCategories, setHiddenCategories] = useState<HiddenCategories>(['Series 1']);

  const dataProvider = useMemo(() => new ArrayDataProvider(quarterData, {
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

    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
      return <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series}/>;
  };

  const itemTemplateRenderer2 = (item: DatavizTemplateContext<DatavizChartDatum>) => {
      return <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series}/>;
  };

return (
      <div id="chart-container">
            <div class="oj-flex">
                    <div class="oj-flex-item oj-sm-margin-1x-horizontal">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-horizontal">withRescale</div>
                              <oj-chart id="areaChart1" type="area" orientation={orientationValue} stack={stackValue} data={dataProvider} hideAndShowBehavior="withRescale" onhiddenCategoriesChanged={handleHiddenCategoriesHiddenCategoriesChanged} hiddenCategories={hiddenCategories} animationOnDisplay="auto" animationOnDataChange="auto">
                                          <template slot="itemTemplate" render={itemTemplateRenderer} />
                                      </oj-chart>
                          </div>
                    <div class="oj-flex-item oj-sm-margin-1x-horizontal">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-horizontal">withoutRescale</div>
                              <oj-chart id="areaChart2" type="area" orientation={orientationValue} stack={stackValue} data={dataProvider} hideAndShowBehavior="withoutRescale" onhiddenCategoriesChanged={handleHiddenCategoriesHiddenCategoriesChanged} hiddenCategories={hiddenCategories} animationOnDisplay="auto" animationOnDataChange="auto">
                                          <template slot="itemTemplate" render={itemTemplateRenderer2} />
                                      </oj-chart>
                          </div>
                </div>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="areaChart1 areaChart2">
                    <demo-chart-orientation-control id="orientationControl" type="area" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                    <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
                    <demo-chart-stack-control id="stackControl" type="area" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue} />
                </oj-toolbar>
            <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">{'Hidden Categories: ' + categoryInfo()}</div>
        </div>
    );
};
export default AreaChartHideShow;

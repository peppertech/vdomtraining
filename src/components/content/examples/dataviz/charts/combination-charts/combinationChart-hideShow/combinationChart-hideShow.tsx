import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';

import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as quarterDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
interface QuarterDatum {
    id: string;
    value: number;
    quarter: string;
    series: string;
}

type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type HiddenCategoriesChangedEvent = Parameters<NonNullable<ComponentProps<'oj-chart'>['onhiddenCategoriesChanged']>>[0];
type ItemTemplateContext = {
    data: QuarterDatum;
};

const quarterData = JSON.parse(quarterDataText as string) as QuarterDatum[];
export const CombinationChartHideShow = () => {
  const [stackValue, setStackValue] = useState<ChartStack>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [hiddenCategories, setHiddenCategories] = useState<string[]>(['Series 1']);

  const dataProvider = useMemo(() => new ArrayDataProvider<QuarterDatum['id'], QuarterDatum>(quarterData, {
      keyAttributes: 'id'
  }), []);
  const categoryInfo = hiddenCategories.length > 0 ? hiddenCategories.join(', ') : 'none';

  const handleHiddenCategoriesHiddenCategoriesChanged = (event: HiddenCategoriesChangedEvent) => {
    setHiddenCategories(event.detail.value ?? []);
  };

  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value ?? 'vertical');
  };

  const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
    setStackValue(event.detail.value ?? 'off');
  };

  const itemTemplateRenderer = (item: ItemTemplateContext) => {
    return <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series}/>;
};

const itemTemplateRenderer2 = (item: ItemTemplateContext) => {
    return <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series}/>;
};

return (
      <div id="chart-container">
            <div class="oj-flex">
                    <div class="oj-flex-item oj-sm-margin-1x-horizontal">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-horizontal">withRescale</div>
                              <oj-chart id="comboChart1" type="combo" orientation={orientationValue} stack={stackValue} data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" hideAndShowBehavior="withRescale" onhiddenCategoriesChanged={handleHiddenCategoriesHiddenCategoriesChanged} hiddenCategories={hiddenCategories}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer} />
                                      </oj-chart>
                          </div>
                    <div class="oj-flex-item oj-sm-margin-1x-horizontal">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-horizontal">withoutRescale</div>
                              <oj-chart id="comboChart2" type="combo" orientation={orientationValue} stack={stackValue} data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" hideAndShowBehavior="withoutRescale" onhiddenCategoriesChanged={handleHiddenCategoriesHiddenCategoriesChanged} hiddenCategories={hiddenCategories}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer2} />
                                      </oj-chart>
                          </div>
                </div>
            <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">{'Hidden Categories: ' + categoryInfo}</div>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="comboChart1 comboChart2">
                    <demo-chart-orientation-control id="orientationControl" type="combo" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                    <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
                    <demo-chart-stack-control id="stackControl" type="combo" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue} />
                </oj-toolbar>
        </div>
    );
};
export default CombinationChartHideShow;

import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';

import { useMemo, useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/boxPlotTwoSeriesData.json';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
interface BoxPlotDatum {
    id: string;
    low: number;
    high: number;
    q1: number;
    q2: number;
    q3: number;
    outliers: number[];
    group: string;
    series: string;
}

type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type HiddenCategories = NonNullable<ComponentProps<'oj-chart'>['hiddenCategories']>;
type ItemTemplateContext = {
    data: BoxPlotDatum;
};

const data = JSON.parse(dataText as string) as BoxPlotDatum[];
export const BoxPlotHideShow = () => {
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [hiddenCategories, setHiddenCategories] = useState<HiddenCategories>(['Series 2']);

  const dataProvider = useMemo(() => new ArrayDataProvider<BoxPlotDatum['id'], BoxPlotDatum>(data, {
      keyAttributes: 'id'
  }), []);
  const categoryInfo = () => {
      const categories = hiddenCategories;
      return categories.length > 0 ? categories.join(', ') : 'none';
  };
  const handleHiddenCategoriesHiddenCategoriesChanged = (event: JetElementCustomEvent<string[] | undefined>) => {
    setHiddenCategories(event.detail.value ?? []);
  };

  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value ?? 'vertical');
  };

    const itemTemplateRenderer = (item: ItemTemplateContext) => {
      return <oj-chart-item low={item.data.low} high={item.data.high} q1={item.data.q1} q2={item.data.q2} q3={item.data.q3} items={item.data.outliers} groupId={[item.data.group]} seriesId={item.data.series}/>;
  };

  const itemTemplateRenderer2 = (item: ItemTemplateContext) => {
      return <oj-chart-item low={item.data.low} high={item.data.high} q1={item.data.q1} q2={item.data.q2} q3={item.data.q3} items={item.data.outliers} groupId={[item.data.group]} seriesId={item.data.series}/>;
  };

return (
      <div id="chart-container">
            <div class="oj-flex">
                    <div class="oj-flex-item oj-sm-margin-1x-horizontal">
                              <div class="oj-typography-bold oj-sm-margin-2x-horizontal">withRescale</div>
                              <oj-chart id="boxPlot1" type="boxPlot" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" hideAndShowBehavior="withRescale" onhiddenCategoriesChanged={handleHiddenCategoriesHiddenCategoriesChanged} hiddenCategories={hiddenCategories} orientation={orientationValue}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer} />
                                      </oj-chart>
                          </div>
                    <div class="oj-flex-item oj-sm-margin-1x-horizontal">
                              <div class="oj-typography-bold oj-sm-margin-2x-horizontal">withoutRescale</div>
                              <oj-chart id="boxPlot2" type="boxPlot" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" hideAndShowBehavior="withoutRescale" onhiddenCategoriesChanged={handleHiddenCategoriesHiddenCategoriesChanged} hiddenCategories={hiddenCategories} orientation={orientationValue}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer2} />
                                      </oj-chart>
                          </div>
                </div>
            <div class="oj-typography-bold oj-sm-margin-2x-vertical">{'Hidden Categories: ' + categoryInfo()}</div>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="boxPlot1 boxPlot2">
                    <demo-chart-orientation-control id="orientationControl" type="boxPlot" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                </oj-toolbar>
        </div>
    );
};
export default BoxPlotHideShow;

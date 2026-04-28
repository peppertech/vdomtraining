import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as quarterDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import 'ojs/ojtoolbar';
import 'ojs/ojchart';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';

type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type HiddenCategories = Exclude<ComponentProps<'oj-chart'>['hiddenCategories'], null | undefined>;
type LineWithAreaChartItem = {
  id: number;
  quarter: string;
  series: string;
  value: number;
};
type ChartItemTemplateContext = {
  data: LineWithAreaChartItem;
};

const quarterData = JSON.parse(quarterDataText as string) as LineWithAreaChartItem[];

export const LineWithAreaChartHideShow = () => {
  const [stackValue, setStackValue] = useState<ChartStack>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [hiddenCategories, setHiddenCategories] = useState<HiddenCategories>(['Series 1']);

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(quarterData, {
        keyAttributes: 'id'
      }),
    []
  );

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
            id="lineAreaChart1"
            type="lineWithArea"
            data={dataProvider}
            animationOnDisplay="auto"
            animationOnDataChange="auto"
            hideAndShowBehavior="withRescale"
            hiddenCategories={hiddenCategories}
            onhiddenCategoriesChanged={(event: JetElementCustomEvent<ComponentProps<'oj-chart'>['hiddenCategories']>) =>
              setHiddenCategories((event.detail.value ?? []) as HiddenCategories)
            }
            orientation={orientationValue}
            stack={stackValue}
          >
            <template slot="itemTemplate" render={renderChartItem} />
          </oj-chart>
        </div>
        <div class="oj-flex-item oj-sm-margin-1x-horizontal">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">withoutRescale</div>
          <oj-chart
            id="lineAreaChart2"
            type="lineWithArea"
            data={dataProvider}
            animationOnDisplay="auto"
            animationOnDataChange="auto"
            hideAndShowBehavior="withoutRescale"
            hiddenCategories={hiddenCategories}
            onhiddenCategoriesChanged={(event: JetElementCustomEvent<ComponentProps<'oj-chart'>['hiddenCategories']>) =>
              setHiddenCategories((event.detail.value ?? []) as HiddenCategories)
            }
            orientation={orientationValue}
            stack={stackValue}
          >
            <template slot="itemTemplate" render={renderChartItem} />
          </oj-chart>
        </div>
      </div>
      <div>
        <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">{`Hidden Categories: ${categoryInfo}`}</div>
      </div>
      <oj-toolbar aria-controls="lineAreaChart1 lineAreaChart2">
        <demo-chart-orientation-control
          type="lineWithArea"
          focusManagement="none"
          orientation={orientationValue}
          onorientationChanged={(event: JetElementCustomEvent<ChartOrientation>) =>
            setOrientationValue(event.detail.value)
          }
        />
        <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
        <demo-chart-stack-control
          type="lineWithArea"
          focusManagement="none"
          stack={stackValue}
          onstackChanged={(event: JetElementCustomEvent<ChartStack>) => setStackValue(event.detail.value)}
        />
      </oj-toolbar>
    </div>
  );
};

export default LineWithAreaChartHideShow;

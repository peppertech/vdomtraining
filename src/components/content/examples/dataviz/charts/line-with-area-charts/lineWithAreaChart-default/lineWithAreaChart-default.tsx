import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as quarterDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
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

export const LineWithAreaChartDefault = () => {
  const [stackValue, setStackValue] = useState<ChartStack>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');

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

  return (
    <div id="chart-container">
      <oj-chart
        id="lineAreaChart"
        type="lineWithArea"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        orientation={orientationValue}
        stack={stackValue}
        hoverBehavior="dim"
      >
        <template slot="itemTemplate" render={renderChartItem} />
      </oj-chart>
      <oj-toolbar aria-controls="lineAreaChart">
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

export default LineWithAreaChartDefault;

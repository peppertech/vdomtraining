import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojtoolbar';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as quarterDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import '../../../../../../jet-composites/demo-select-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ChartLineType =
  | 'straight'
  | 'curved'
  | 'stepped'
  | 'centeredStepped'
  | 'segmented'
  | 'centeredSegmented'
  | 'none';
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

export const LineWithAreaChartLineTypes = () => {
  const [stackValue, setStackValue] = useState<ChartStack>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [lineTypeValue, setLineTypeValue] = useState<ChartLineType>('curved');

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(quarterData, {
        keyAttributes: 'id'
      }),
    []
  );

  const styleDefaults: NonNullable<ComponentProps<'oj-chart'>['styleDefaults']> = {
    lineType: lineTypeValue,
    markerDisplayed: 'on'
  };

  const renderChartItem = (item: ChartItemTemplateContext) => (
    <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series} />
  );

  return (
    <div id="chart-container">
      <oj-form-layout aria-controls="lineAreaChart">
        <demo-select-enum
          value={lineTypeValue}
          labelHint="Line Type"
          enumValues={["straight","curved","stepped","centeredStepped","segmented","centeredSegmented","none"]}
          onvalueChanged={(event: JetElementCustomEvent<ChartLineType>) => setLineTypeValue(event.detail.value)}
        />
      </oj-form-layout>
      <oj-chart
        id="lineAreaChart"
        type="lineWithArea"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        styleDefaults={styleDefaults}
        stack={stackValue}
        orientation={orientationValue}
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

export default LineWithAreaChartLineTypes;

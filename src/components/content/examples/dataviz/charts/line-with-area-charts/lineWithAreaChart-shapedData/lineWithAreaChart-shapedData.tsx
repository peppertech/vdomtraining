import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as quarterShapedDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterShapedData.json';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';

type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type QuarterDatum = {
  id: string;
};

const quarterShapedData = JSON.parse(quarterShapedDataText as string) as QuarterDatum[];

export const LineWithAreaChartShapedData = () => {
  const [stackValue, setStackValue] = useState<ChartStack>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<QuarterDatum['id'], QuarterDatum>(quarterShapedData, {
        keyAttributes: 'id'
      }),
    []
  );

  return (
    <div id="chart-container">
      <oj-chart
        id="lineAreaChart"
        type="lineWithArea"
        orientation={orientationValue}
        data={dataProvider}
        stack={stackValue}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        hoverBehavior="dim"
        aria-label="Line with Area chart with four series over four quarters"
      />
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

export default LineWithAreaChartShapedData;

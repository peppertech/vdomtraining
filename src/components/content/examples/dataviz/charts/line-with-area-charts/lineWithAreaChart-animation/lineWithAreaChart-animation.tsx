import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojbutton';
import 'ojs/ojtoolbar';
import 'ojs/ojchart';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';

type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type LineWithAreaChartItem = {
  id: string;
  series: string;
  month: string;
  value: number;
};
type ChartItemTemplateContext = {
  data: LineWithAreaChartItem;
};

const groupNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export const LineWithAreaChartAnimation = () => {
  const [numSeries, setNumSeries] = useState(3);
  const [numGroups, setNumGroups] = useState(5);
  const [stackValue, setStackValue] = useState<ChartStack>('on');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [seed, setSeed] = useState(0);

  const data = useMemo(() => {
    const valueCache: Record<string, number> = {};
    const entries: LineWithAreaChartItem[] = [];
    for (let i = 0; i < numSeries; i++) {
      for (let j = 0; j < numGroups; j++) {
        const id = `${seed}-${i}-${j}`;
        valueCache[id] = 10 + Math.round(Math.random() * 50);
        entries.push({
          id,
          series: `Series ${i + 1}`,
          month: groupNames[j],
          value: valueCache[id]
        });
      }
    }
    return entries;
  }, [numGroups, numSeries, seed]);

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(data, {
        keyAttributes: ['series', 'month']
      }),
    [data]
  );

  const renderChartItem = (item: ChartItemTemplateContext) => (
    <oj-chart-item value={item.data.value} groupId={[item.data.month]} seriesId={item.data.series} />
  );

  return (
    <div id="chart-container">
      <oj-toolbar chroming="outlined" aria-controls="lineAreaChart" aria-label="Data">
        <oj-button onojAction={() => setSeed((current) => current + 1)}>Update Values</oj-button>
        <oj-button
          onojAction={() => setNumSeries((current) => (current <= 3 ? current + 1 : current - 1))}
        >
          Add/Remove Series
        </oj-button>
        <oj-button
          onojAction={() => setNumGroups((current) => (current <= 5 ? current + 1 : current - 1))}
        >
          Add/Remove Group
        </oj-button>
      </oj-toolbar>
      <oj-chart
        id="lineAreaChart"
        type="lineWithArea"
        orientation={orientationValue}
        stack={stackValue}
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
      >
        <template slot="itemTemplate" render={renderChartItem} />
      </oj-chart>
      <oj-toolbar aria-label="Display Options" aria-controls="lineAreaChart">
        <demo-chart-orientation-control
          id="orientationControl"
          type="lineWithArea"
          focusManagement="none"
          orientation={orientationValue}
          onorientationChanged={(event: JetElementCustomEvent<ChartOrientation>) =>
            setOrientationValue(event.detail.value)
          }
        />
        <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
        <demo-chart-stack-control
          id="stackControl"
          type="lineWithArea"
          focusManagement="none"
          stack={stackValue}
          onstackChanged={(event: JetElementCustomEvent<ChartStack>) => setStackValue(event.detail.value)}
        />
      </oj-toolbar>
    </div>
  );
};

export default LineWithAreaChartAnimation;

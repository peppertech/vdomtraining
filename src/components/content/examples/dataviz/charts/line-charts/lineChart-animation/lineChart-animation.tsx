import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojbutton';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import type { ComponentProps,JSX } from 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type AnimatedLineChartItem = {
  id: string;
  series: string;
  month: string;
  value: number;
};

export const LineChartAnimation = (): JSX.Element => {
  const numSeriesRef = useRef<number>(3);
  const numGroupsRef = useRef<number>(5);
  const valueCacheRef = useRef<Record<string, number>>({});
  const groupNames = useMemo(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], []);
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');

  const getValue = (id: string): number => {
    let value = valueCacheRef.current[id];
    if (value != null) {
      return value;
    }
    value = 10 + Math.round(Math.random() * 50);
    valueCacheRef.current[id] = value;
    return value;
  };

  const getData = (): AnimatedLineChartItem[] => {
    const data: AnimatedLineChartItem[] = [];
    for (let i = 0; i < numSeriesRef.current; i++) {
      for (let j = 0; j < numGroupsRef.current; j++) {
        const id = `${i}-${j}`;
        data.push({
          id,
          series: `Series ${i + 1}`,
          month: groupNames[j],
          value: getValue(id)
        });
      }
    }
    return data;
  };

  const [observableData, setObservableData] = useState<AnimatedLineChartItem[]>(() => getData());
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(observableData, {
        keyAttributes: ['series', 'month']
      }),
    [observableData]
  );

  const handleOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>): void => {
    setOrientationValue(event.detail.value);
  };

  const updateButtonClick = (): void => {
    valueCacheRef.current = {};
    setObservableData(getData());
  };

  const seriesButtonClick = (): void => {
    numSeriesRef.current = numSeriesRef.current <= 3 ? numSeriesRef.current + 1 : numSeriesRef.current - 1;
    setObservableData(getData());
  };

  const groupButtonClick = (): void => {
    numGroupsRef.current = numGroupsRef.current <= 5 ? numGroupsRef.current + 1 : numGroupsRef.current - 1;
    setObservableData(getData());
  };

  const itemTemplateRenderer = (item: { data: AnimatedLineChartItem }): JSX.Element => (
    <oj-chart-item value={item.data.value} groupId={[item.data.month]} seriesId={item.data.series} />
  );

  return (
    <div id="chart-container">
      <oj-toolbar
        class="oj-divider-bottom"
        chroming="outlined"
        aria-controls="lineChart"
        aria-label="Series Data Toolbar"
      >
        <oj-button onojAction={updateButtonClick}>Update values</oj-button>
        <oj-button onojAction={seriesButtonClick}>Add/Remove Series</oj-button>
        <oj-button onojAction={groupButtonClick}>Add/Remove Group</oj-button>
      </oj-toolbar>

      <oj-chart
        id="lineChart"
        type="line"
        orientation={orientationValue}
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>

      <demo-chart-orientation-control
        type="line"
        orientation={orientationValue}
        aria-controls="lineChart"
        onorientationChanged={handleOrientationChanged}
      />
    </div>
  );
};

export default LineChartAnimation;

import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojbutton';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';

type ChartOrientation = NonNullable<ComponentProps<'oj-chart'>['orientation']>;
type RangeChartDatum = {
  id: string;
  series: string;
  group: string;
  low: number;
  high: number;
};

const groupNames = ['A', 'B', 'C', 'D', 'E', 'F'];

export const RangeChartAnimation = () => {
  const numSeriesRef = useRef(1);
  const numGroupsRef = useRef(5);
  const valueCacheRef = useRef<Record<string, { low: number; high: number }>>({});
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');

  const getValue = (id: string) => {
    const cached = valueCacheRef.current[id];
    if (cached) {
      return cached;
    }

    const valueOne = 10 + Math.round(Math.random() * 50);
    const valueTwo = 10 + Math.round(Math.random() * 50);
    const next = { low: Math.min(valueOne, valueTwo), high: Math.max(valueOne, valueTwo) };
    valueCacheRef.current[id] = next;
    return next;
  };

  const getData = (): RangeChartDatum[] => {
    const nextData: RangeChartDatum[] = [];

    for (let i = 0; i < numSeriesRef.current; i++) {
      for (let j = 0; j < numGroupsRef.current; j++) {
        const id = `${i}-${j}`;
        const values = getValue(id);
        nextData.push({
          id,
          series: `Series ${i + 1}`,
          group: groupNames[j],
          low: values.low,
          high: values.high
        });
      }
    }

    return nextData;
  };

  const [chartData, setChartData] = useState<RangeChartDatum[]>(() => getData());
  const dataProvider = useMemo(
    () => new ArrayDataProvider<string, RangeChartDatum>(chartData, { keyAttributes: 'id' }),
    [chartData]
  );

  const handleOrientationChanged = (
    event: DatavizValueChangedEvent<string>
  ) => {
    setOrientationValue(event.detail.value as ChartOrientation);
  };

  const updateButtonClick = () => {
    valueCacheRef.current = {};
    setChartData(getData());
  };

  const seriesButtonClick = () => {
    numSeriesRef.current = numSeriesRef.current <= 1 ? numSeriesRef.current + 1 : numSeriesRef.current - 1;
    setChartData(getData());
  };

  const groupButtonClick = () => {
    numGroupsRef.current = numGroupsRef.current <= 5 ? numGroupsRef.current + 1 : numGroupsRef.current - 1;
    setChartData(getData());
  };

  const itemTemplateRenderer = (item: { data: RangeChartDatum }) => (
    <oj-chart-item
      low={item.data.low}
      high={item.data.high}
      groupId={[item.data.group]}
      seriesId={item.data.series}
    />
  );

  const chartProps = { 'legend.rendered': 'off' as const };

  return (
    <div id="chart-container">
      <oj-toolbar chroming="outlined" aria-label="Button Controls Toolbar" aria-controls="rangeChart1 rangeChart2">
        <oj-button id="button1" onojAction={updateButtonClick}>Update values</oj-button>
        <oj-button id="button2" onojAction={seriesButtonClick}>Add/Remove Series</oj-button>
        <oj-button id="button3" onojAction={groupButtonClick}>Add/Remove Group</oj-button>
      </oj-toolbar>

      <div class="oj-flex">
        <oj-chart
          class="oj-flex-item"
          id="rangeChart1"
          type="bar"
          orientation={orientationValue}
          data={dataProvider}
          animationOnDisplay="auto"
          animationOnDataChange="auto"
          {...chartProps}
        >
          <template slot="itemTemplate" render={itemTemplateRenderer} />
        </oj-chart>
        <oj-chart
          class="oj-flex-item"
          id="rangeChart2"
          type="area"
          orientation={orientationValue}
          data={dataProvider}
          animationOnDisplay="auto"
          animationOnDataChange="auto"
          {...chartProps}
        >
          <template slot="itemTemplate" render={itemTemplateRenderer} />
        </oj-chart>
      </div>

      <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="rangeChart1 rangeChart2">
        <demo-chart-orientation-control
          id="orientationControl"
          type="bar"
          focusManagement="none"
          orientation={orientationValue}
          onorientationChanged={handleOrientationChanged}
        />
      </oj-toolbar>
    </div>
  );
};

export default RangeChartAnimation;

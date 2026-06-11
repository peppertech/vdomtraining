import { JetElementCustomEvent } from 'ojs/index';
import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';

import { useMemo, useRef, useState } from 'preact/hooks';
import { ojChart } from 'ojs/ojchart';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojbutton';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type AnimatedBarChartItem = {
    id: string;
    series: string;
    group: string;
    value: number;
};

export const BarChartAnimation = () => {
  const numSeriesRef = useRef<number>(4);
  const numGroupsRef = useRef<number>(2);
  const valueCacheRef = useRef<Record<string, number>>({});

  const getValue = (id: string) => {
      let value = valueCacheRef.current[id];
      if (value != null)
          return value;
      else {
          value = 10 + Math.round(Math.random() * 50);
          valueCacheRef.current[id] = value;
          return value;
      }
  };
  const getData = (): AnimatedBarChartItem[] => {
      const data: AnimatedBarChartItem[] = [];
      for (let i = 1; i < numSeriesRef.current + 1; i++) {
          for (let j = 1; j < numGroupsRef.current + 1; j++) {
              const id = `${i}-${j}`;
              data.push({
                  id: id,
                  series: `Series ${i}`,
                  group: `Group ${j}`,
                  value: getValue(id)
              });
          }
      }
      return data;
  };
  const [stackValue, setStackValue] = useState<ChartStack>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [chartData, setChartData] = useState<AnimatedBarChartItem[]>(getData());

  const dataProvider = useMemo(() => new ArrayDataProvider(chartData, {
      keyAttributes: 'id'
  }), [chartData]);
  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value);
  };

  const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
    setStackValue(event.detail.value);
  };

  const seriesComparator = (seriesContext1: ojChart.SeriesTemplateContext<Record<string, string | number>>, seriesContext2: ojChart.SeriesTemplateContext<Record<string, string | number>>) => {
      if (seriesContext1.id > seriesContext2.id)
          return 1;
      else
          return -1;
  };
  const groupComparator = (groupContext1: ojChart.GroupTemplateContext<Record<string, string | number>>, groupContext2: ojChart.GroupTemplateContext<Record<string, string | number>>) => {
      if (groupContext1.ids[0] < groupContext2.ids[0])
          return -1;
      else
          return 1;
  };
  const updateButtonClick = () => {
      valueCacheRef.current = {};
      setChartData(getData());
  };
  const seriesButtonClick = () => {
      numSeriesRef.current = numSeriesRef.current <= 4 ? numSeriesRef.current + 1 : numSeriesRef.current - 1;
      setChartData(getData());
  };
  const groupButtonClick = () => {
      numGroupsRef.current = numGroupsRef.current <= 2 ? numGroupsRef.current + 1 : numGroupsRef.current - 1;
      setChartData(getData());
  };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
      return <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series}/>;
  };

return (
      <div id="chart-container">
            <oj-toolbar chroming="outlined" aria-label="Button Controls Toolbar" aria-controls="barChart">
                    <oj-button id="button1" onojAction={updateButtonClick}>Update values</oj-button>
                    <oj-button id="button2" onojAction={seriesButtonClick}>Add/Remove Series</oj-button>
                    <oj-button id="button3" onojAction={groupButtonClick}>Add/Remove Group</oj-button>
                </oj-toolbar>
            <oj-chart id="barChart" type="bar" orientation={orientationValue} stack={stackValue} data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" seriesComparator={seriesComparator} groupComparator={groupComparator}>
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                </oj-chart>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="barChart">
                    <demo-chart-orientation-control id="orientationControl" type="bar" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                    <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
                    <demo-chart-stack-control id="stackControl" type="bar" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue} />
                </oj-toolbar>
        </div>
    );
};
export default BarChartAnimation;

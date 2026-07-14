import { JetElementCustomEvent } from 'ojs/index';
import 'preact';
import type { ComponentProps } from 'preact';

import 'ojs/ojbutton';
import 'ojs/ojchart';
import { ojChart } from 'ojs/ojchart';
import 'ojs/ojtoolbar';
import { useMemo,useRef,useState } from 'preact/hooks';
import '../../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../../jet-composites/demo-chart-stack-control/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type AnimatedAreaChartItem = {
    id: string;
    series: string;
    month: string;
    value: number;
};

export const AreaChartAnimation = () => {
  const numSeriesRef = useRef<number>(3);
  const numGroupsRef = useRef<number>(5);
  const valueCacheRef = useRef<Record<string, number>>({});
  const groupNames = useMemo(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], []);

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
  const getData = (): AnimatedAreaChartItem[] => {
      const data: AnimatedAreaChartItem[] = [];
      for (let i = 0; i < numSeriesRef.current; i++) {
          for (let j = 0; j < numGroupsRef.current; j++) {
              const id = `${i}-${j}`;
              data.push({
                  id: id,
                  series: `Series ${i + 1}`,
                  month: groupNames[j],
                  value: getValue(id)
              });
          }
      }
      return data;
  };
  const [stackValue, setStackValue] = useState<ChartStack>('on');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [observableData, setObservableData] = useState<AnimatedAreaChartItem[]>(getData());
  const dataProvider = useMemo(() => new ArrayDataProvider(observableData, {
      keyAttributes: ['series', 'month']
  }), [observableData]);

  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value);
  };

  const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
    setStackValue(event.detail.value);
  };

  const seriesComparator = (seriesContext1: ojChart.SeriesTemplateContext<string>, seriesContext2: ojChart.SeriesTemplateContext<string>) => {
      if (seriesContext1.id > seriesContext2.id)
          return 1;
      else
          return -1;
  };
  const updateButtonClick = () => {
      valueCacheRef.current = {};
      setObservableData(getData());
  };
  const seriesButtonClick = () => {
      numSeriesRef.current = numSeriesRef.current <= 3 ? numSeriesRef.current + 1 : numSeriesRef.current - 1;
      setObservableData(getData());
  };
  const groupButtonClick = () => {
      numGroupsRef.current = numGroupsRef.current <= 5 ? numGroupsRef.current + 1 : numGroupsRef.current - 1;
      setObservableData(getData());
  };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
      return <oj-chart-item value={item.data.value} groupId={[item.data.month]} seriesId={item.data.series}/>;
  };

return (
      <div id="chart-container">
            <oj-toolbar id="buttonToolbar" chroming="outlined" aria-label="Chart Update Button Toolbar" aria-controls="areaChart">
                    <oj-button id="button1" onojAction={updateButtonClick}>Update values</oj-button>
                    <oj-button id="button2" onojAction={seriesButtonClick}>Add/Remove Series</oj-button>
                    <oj-button id="button3" onojAction={groupButtonClick}>Add/Remove Group</oj-button>
                </oj-toolbar>
            <oj-chart id="areaChart" type="area" orientation={orientationValue} stack={stackValue} data={dataProvider} seriesComparator={seriesComparator} animationOnDisplay="auto" animationOnDataChange="auto">
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                </oj-chart>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="areaChart">
                    <demo-chart-orientation-control id="orientationControl" type="area" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                    <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
                    <demo-chart-stack-control id="stackControl" type="area" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue} />
                </oj-toolbar>
        </div>
    );
};
export default AreaChartAnimation;

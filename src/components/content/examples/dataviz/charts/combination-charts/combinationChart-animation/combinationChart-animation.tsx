import { JetElementCustomEvent } from 'ojs/index';
import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';

import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import 'ojs/ojbutton';
type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ChartDatum = {
    id: string;
    series: string;
    group: string;
    value: number;
};

export const CombinationChartAnimation = () => {
  const numSeriesRef = useRef<number>(4);
  const numGroupsRef = useRef<number>(4);
  const valueCacheRef = useRef<Record<string, number>>({});
  const groupNames = useMemo(() => ['Group A', 'Group B', 'Group C', 'Group D', 'Group E'], []);
  const [observableData, setObservableData] = useState<ChartDatum[]>(() => getData());
  const [stackValue, setStackValue] = useState<ChartStack>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const dataProvider = useMemo(() => new ArrayDataProvider(observableData, {
      keyAttributes: 'id'
  }), [observableData]);

  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value);
  };

  const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
    setStackValue(event.detail.value);
  };

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
  const getData = (): ChartDatum[] => {
      const data: ChartDatum[] = [];
      for (let i = 0; i < numSeriesRef.current; i++) {
          for (let j = 0; j < numGroupsRef.current; j++) {
              const id = `${i}-${j}`;
              data.push({
                  id: id,
                  series: `Series ${i + 1}`,
                  group: groupNames[j],
                  value: getValue(id)
              });
          }
      }
      return data;
  };
  const updateButtonClick = () => {
      valueCacheRef.current = {};
      setObservableData(getData());
  };
  const seriesButtonClick = () => {
      numSeriesRef.current = numSeriesRef.current <= 4 ? numSeriesRef.current + 1 : numSeriesRef.current - 1;
      setObservableData(getData());
  };
  const groupButtonClick = () => {
      numGroupsRef.current = numGroupsRef.current <= 4 ? numGroupsRef.current + 1 : numGroupsRef.current - 1;
      setObservableData(getData());
  };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
      return <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series}/>;
  };

return (
      <div id="chart-container">
            <oj-toolbar id="buttonToolbar" chroming="outlined" aria-label="Chart Update Button Toolbar" aria-controls="comboChart">
                    <oj-button id="button1" onojAction={updateButtonClick}>Update values</oj-button>
                    <oj-button id="button2" onojAction={seriesButtonClick}>Add/Remove Series</oj-button>
                    <oj-button id="button3" onojAction={groupButtonClick}>Add/Remove Group</oj-button>
                </oj-toolbar>
            <oj-chart id="comboChart" type="combo" orientation={orientationValue} stack={stackValue} data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto">
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                </oj-chart>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="comboChart">
                    <demo-chart-orientation-control id="orientationControl" type="combo" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                    <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
                    <demo-chart-stack-control id="stackControl" type="combo" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue} />
                </oj-toolbar>
        </div>
    );
};
export default CombinationChartAnimation;

import { JetElementCustomEvent } from 'ojs/index';
import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';

import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojbutton';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
interface BoxPlotDataItem {
    id: string;
    series: string;
    group: string;
    low: number;
    q1: number;
    q2: number;
    q3: number;
    high: number;
    items: number[];
}

export const BoxPlotAnimation = () => {
  const numSeriesRef = useRef<number>(1);
  const numGroupsRef = useRef<number>(4);
  const valueCacheRef = useRef<Record<string, BoxPlotDataItem>>({});

  const groups = useMemo(() => ['Group A', 'Group B', 'Group C', 'Group D', 'Group E'], []);

  function getValue(n: number) {
      return 2 + Math.round(Math.random() * (n - 2));
  }

  function getData() {
      const data: BoxPlotDataItem[] = [];
      for (let i = 0; i < numSeriesRef.current; i++) {
          for (let j = 0; j < numGroupsRef.current; j++) {
              const id = `${i}-${j}`;
              let seriesGroups = valueCacheRef.current[id];
              if (!seriesGroups) {
                  const low = getValue(40);
                  const q1 = low + getValue(15);
                  const q2 = q1 + getValue(15);
                  const q3 = q2 + getValue(15);
                  const high = q3 + getValue(15);
                  const outliers = [];
                  if (Math.random() < 0.3)
                      outliers.push(low - getValue(low / 2));
                  if (Math.random() < 0.3)
                      outliers.push(high + getValue((100 - high) / 2));
                  seriesGroups = {
                      id: id,
                      series: `Series ${i + 1}`,
                      group: groups[j],
                      low: low,
                      q1: q1,
                      q2: q2,
                      q3: q3,
                      high: high,
                      items: outliers
                  };
                  valueCacheRef.current[id] = seriesGroups;
              }
              data.push(seriesGroups);
          }
      }
      return data;
  }

  const [observableData, setObservableData] = useState<BoxPlotDataItem[]>(() => getData());
  const [orientationValue, setOrientationValue] = useState<ComponentProps<'oj-chart'>['orientation']>('vertical');

  const dataProvider = useMemo(() => new ArrayDataProvider<BoxPlotDataItem['id'], BoxPlotDataItem>(observableData, {
      keyAttributes: 'id'
  }), [observableData]);

  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ComponentProps<'oj-chart'>['orientation']>) => {
    setOrientationValue(event.detail.value ?? 'vertical');
  };

  const updateButtonClick = () => {
      valueCacheRef.current = {};
      setObservableData(getData());
  };
  const seriesButtonClick = () => {
      numSeriesRef.current = numSeriesRef.current == 2 ? numSeriesRef.current - 1 : numSeriesRef.current + 1;
      setObservableData(getData());
  };
  const groupButtonClick = () => {
      numGroupsRef.current = numGroupsRef.current <= 4 ? numGroupsRef.current + 1 : numGroupsRef.current - 1;
      setObservableData(getData());
  };
    const itemTemplateRenderer = (item: {
      data: BoxPlotDataItem;
  }) => {
      return <oj-chart-item low={item.data.low} high={item.data.high} q1={item.data.q1} q2={item.data.q2} q3={item.data.q3} items={item.data.items} groupId={[item.data.group]} seriesId={item.data.series}/>;
  };

return (
      <div id="chart-container">
            <oj-toolbar id="buttonToolbar" chroming="outlined" aria-label="Chart Update Button Toolbar" aria-controls="boxPlot">
                    <oj-button id="button1" onojAction={updateButtonClick}>Update values</oj-button>
                    <oj-button id="button2" onojAction={seriesButtonClick}>Add/Remove Series</oj-button>
                    <oj-button id="button3" onojAction={groupButtonClick}>Add/Remove Group</oj-button>
                </oj-toolbar>
            <oj-chart id="boxPlot" type="boxPlot" orientation={orientationValue} data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto">
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                </oj-chart>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="boxPlot">
                    <demo-chart-orientation-control id="orientationControl" type="boxPlot" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                </oj-toolbar>
        </div>
    );
};
export default BoxPlotAnimation;

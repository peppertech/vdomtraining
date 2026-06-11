import { JetElementCustomEvent } from 'ojs/index';
import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';

import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojbutton';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type FunnelDatum = {
    id: number;
    series: string;
    group: string;
    value: number;
};

export const FunnelChartAnimation = () => {
  const numSeriesRef = useRef<number>(5);
  const valueCacheRef = useRef<Record<number, number>>({});
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');

  const getValue = (id: number) => {
      let value = valueCacheRef.current[id];
      if (value != null)
          return value;
      else {
          value = 10 + Math.round(Math.random() * 50);
          valueCacheRef.current[id] = value;
          return value;
      }
  };
  const getData = (): FunnelDatum[] => {
      const data: FunnelDatum[] = [];
      for (let i = 1; i < numSeriesRef.current + 1; i++) {
          data.push({
              id: i,
              series: `Series ${i}`,
              group: 'Group 1',
              value: getValue(i)
          });
      }
      return data;
  };
  const [chartData, setChartData] = useState<FunnelDatum[]>(() => getData());
  const dataProvider = useMemo(() => new ArrayDataProvider(chartData, {
      keyAttributes: 'id'
  }), [chartData]);
  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value);
  };

  const updateButtonClick = () => {
      valueCacheRef.current = {};
      setChartData(getData());
  };
  const seriesButtonClick = () => {
      numSeriesRef.current = numSeriesRef.current <= 5 ? numSeriesRef.current + 1 : numSeriesRef.current - 1;
      setChartData(getData());
  };
    const itemTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => {
      return <oj-chart-item value={$current.data.value} groupId={[$current.data.group]} seriesId={$current.data.series}/>;
  };

return (
      <div id="chart-container">
            <oj-toolbar chroming="outlined" aria-label="funnelChart Update Toolbar" aria-controls="funnelChart">
                    <oj-button onojAction={updateButtonClick}>Update values</oj-button>
                    <oj-button onojAction={seriesButtonClick}>Add/Remove Series</oj-button>
                </oj-toolbar>
            <oj-chart id="funnelChart" type="funnel" orientation={orientationValue} data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto">
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                </oj-chart>
            <oj-toolbar aria-label="Chart Display Options Toolbar" aria-controls="funnelChart">
                    <demo-chart-orientation-control id="orientationControl" type="funnel" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                </oj-toolbar>
        </div>
    );
};
export default FunnelChartAnimation;

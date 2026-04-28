import { h } from 'preact';
import type { ComponentProps } from 'preact';

import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as chartDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/singleItemShapedData.json';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
const chartData = JSON.parse(chartDataText as string);

type ChartOrientation = NonNullable<ComponentProps<'oj-chart'>['orientation']>;

export const FunnelChartShapedData = () => {
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');

  const dataProvider = useMemo(() => new ArrayDataProvider(chartData, {
      keyAttributes: 'id'
  }), []);
  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value ?? 'vertical');
  };

  return (
      <div id="chart-container">
            <oj-chart id="funnelChart" type="funnel" data={dataProvider} orientation={orientationValue} animationOnDisplay="auto" animationOnDataChange="auto" aria-label="Funnel chart showing five series in Group A" />
            <oj-toolbar aria-controls="funnelChart" aria-label="Chart Display Options Toolbar">
                    <demo-chart-orientation-control id="orientationControl" type="funnel" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                </oj-toolbar>
        </div>
    );
};
export default FunnelChartShapedData;

import 'preact';
import type { ComponentProps } from 'preact';

import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import { useMemo,useState } from 'preact/hooks';
import * as chartDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/targetData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
const chartData = JSON.parse(chartDataText as string);

type ChartOrientation = NonNullable<ComponentProps<'oj-chart'>['orientation']>;

export const FunnelChartTargetValues = () => {
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');

  const dataProvider = useMemo(() => new ArrayDataProvider(chartData, {
      keyAttributes: 'id'
  }), []);
  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value ?? 'vertical');
  };

    const itemTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => {
      return <oj-chart-item value={$current.data.value} targetValue={$current.data.targetValue} groupId={[$current.data.group]} seriesId={$current.data.series}/>;
  };

return (
      <div id="chart-container">
            <oj-chart id="funnelChart" type="funnel" data={dataProvider} orientation={orientationValue} animationOnDisplay="auto" animationOnDataChange="auto">
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                </oj-chart>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="funnelChart">
                    <demo-chart-orientation-control id="orientationControl" type="funnel" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                </oj-toolbar>
        </div>
    );
};
export default FunnelChartTargetValues;

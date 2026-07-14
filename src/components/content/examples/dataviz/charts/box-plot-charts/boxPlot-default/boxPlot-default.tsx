import 'preact';
import type { ComponentProps } from 'preact';

import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import { useMemo,useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/boxPlotTwoSeriesData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
const data = JSON.parse(dataText as string);

type ChartOrientation = NonNullable<ComponentProps<'oj-chart'>['orientation']>;

export const BoxPlotDefault = () => {
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');

  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: 'id'
  }), []);
  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value ?? 'vertical');
  };

    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
      return <oj-chart-item low={item.data.low} high={item.data.high} q1={item.data.q1} q2={item.data.q2} q3={item.data.q3} items={item.data.outliers} groupId={[item.data.group]} seriesId={item.data.series}/>;
  };

return (
      <div id="chart-container">
            <oj-chart id="boxPlot" type="boxPlot" orientation={orientationValue} data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto">
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                </oj-chart>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="boxPlot">
                    <demo-chart-orientation-control id="orientationControl" type="boxPlot" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                </oj-toolbar>
        </div>
    );
};
export default BoxPlotDefault;

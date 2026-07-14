import 'preact';
import type { ComponentProps } from 'preact';

import "css!./demo.css";
import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojbutton';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import { useMemo,useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/boxPlotTwoSeriesShapedData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
const data = JSON.parse(dataText as string);

type ChartOrientation = NonNullable<ComponentProps<'oj-chart'>['orientation']>;

export const BoxPlotShapedData = () => {
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');

  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: 'id'
  }), []);
  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value ?? 'vertical');
  };

  return (
      <div id="chart-container">
            <oj-chart id="boxPlot" type="boxPlot" orientation={orientationValue} data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" hoverBehavior="dim" class="demo-boxplotchart-shapeddata-height demo-boxplotchart-shapeddata-width oj-sm-width-full" />
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="boxPlot" class="demo-boxplotchart-shapeddata-width oj-sm-width-full">
                    <demo-chart-orientation-control id="orientationControl" type="boxPlot" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                </oj-toolbar>
        </div>
    );
};
export default BoxPlotShapedData;

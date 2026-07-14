import 'preact';
import type { ComponentProps } from 'preact';

import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import { useMemo,useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicShapedData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface ChartDatum {
    id: string;
}

type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];

const data = JSON.parse(dataText as string) as ChartDatum[];

export const BarChartShapedData = () => {
  const [stackValue, setStackValue] = useState<ChartStack>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');

  const dataProvider = useMemo(() => new ArrayDataProvider<ChartDatum['id'], ChartDatum>(data, {
      keyAttributes: 'id'
  }), []);

  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value ?? 'vertical');
  };

  const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
    setStackValue(event.detail.value ?? 'off');
  };

  return (
      <div id="chart-container">
            <oj-chart id="barChart" type="bar" orientation={orientationValue} stack={stackValue} data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" hoverBehavior="dim" aria-label="bar chart with five series over two groups" />
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="barChart">
                    <demo-chart-orientation-control id="orientationControl" type="bar" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                    <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
                    <demo-chart-stack-control id="stackControl" type="bar" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue} />
                </oj-toolbar>
        </div>
    );
};
export default BarChartShapedData;

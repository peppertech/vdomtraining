import 'preact';
import type { ComponentProps } from 'preact';

import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import { useMemo,useState } from 'preact/hooks';
import * as quarterShapedDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterShapedData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface QuarterDatum {
    id: string;
}

type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];

const quarterShapedData = JSON.parse(quarterShapedDataText as string) as QuarterDatum[];

export const CombinationChartShapedData = () => {
  const [stackValue, setStackValue] = useState<ChartStack>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');

  const dataProvider = useMemo(() => new ArrayDataProvider<QuarterDatum['id'], QuarterDatum>(quarterShapedData, {
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
            <oj-chart id="comboChart" type="combo" selectionMode="multiple" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" orientation={orientationValue} stack={stackValue} hoverBehavior="dim" aria-label="Combo chart showing quarterly sales performance comparison across 4 series from Q1 to Q4" />
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="comboChart">
                    <demo-chart-orientation-control id="orientationControl" type="combo" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                    <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
                    <demo-chart-stack-control id="stackControl" type="combo" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue} />
                </oj-toolbar>
        </div>
    );
};
export default CombinationChartShapedData;

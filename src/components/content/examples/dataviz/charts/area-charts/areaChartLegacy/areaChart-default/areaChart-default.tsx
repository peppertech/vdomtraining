import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as quarterDataText from 'text!../../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import '../../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../../jet-composites/demo-chart-stack-control/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type AreaChartItem = {
  id: number;
  quarter: string;
  series: string;
  value: number;
};
const quarterData = JSON.parse(quarterDataText as string) as AreaChartItem[];
export const AreaChartDefault = () => {
  const [stackValue, setStackValue] = useState<ChartStack>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const dataProvider = useMemo(() => new ArrayDataProvider(quarterData, {
    keyAttributes: 'id'
  }), []);
  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value);
  };
  const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
    setStackValue(event.detail.value);
  };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
      return (<oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series}>
                </oj-chart-item>);
  };

return (
    <div id="chart-container">
      <oj-chart id="areaChart" type="area" orientation={orientationValue} stack={stackValue} data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" hoverBehavior="dim">
        <template
          slot="itemTemplate"
          render={itemTemplateRenderer
          }
        />
      </oj-chart>
      <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="areaChart">
        <demo-chart-orientation-control id="orientationControl" type="area" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
        <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
        <demo-chart-stack-control id="stackControl" type="area" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue} />
      </oj-toolbar>
    </div>
  );
};
export default AreaChartDefault;

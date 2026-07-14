import 'preact';
import type { ComponentProps } from 'preact';

import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import { useMemo,useState } from 'preact/hooks';
import * as quarterDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
interface QuarterDatum {
    id: string;
    value: number;
    quarter: string;
    series: string;
}

type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ItemTemplateContext = {
    data: QuarterDatum;
};
type SeriesTemplateContext = {
    id: string;
};

const quarterData = JSON.parse(quarterDataText as string) as QuarterDatum[];
export const CombinationChartDefault = () => {
  const [stackValue, setStackValue] = useState<ChartStack>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');

  const dataProvider = useMemo(() => new ArrayDataProvider<QuarterDatum['id'], QuarterDatum>(quarterData, {
      keyAttributes: 'id'
  }), []);
  const seriesTypeMap = useMemo<Record<string, 'bar' | 'line' | 'area'>>(() => ({
      'Series 1': 'bar',
      'Series 2': 'line',
      'Series 3': 'area',
      'Series 4': 'bar'
  }), []);

  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value ?? 'vertical');
  };

  const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
    setStackValue(event.detail.value ?? 'off');
  };

        const itemTemplateRenderer = (item: ItemTemplateContext) => {
          return <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series}/>;
      };

      const seriesTemplateRenderer = (series: SeriesTemplateContext) => {
          return <oj-chart-series type={seriesTypeMap[String(series.id)] ?? 'bar'}/>;
      };

return (
      <div id="chart-container">
            <oj-chart id="comboChart" type="combo" selectionMode="multiple" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" orientation={orientationValue} stack={stackValue} hoverBehavior="dim">
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                    <template slot="seriesTemplate" render={seriesTemplateRenderer} />
                </oj-chart>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="comboChart">
                    <demo-chart-orientation-control id="orientationControl" type="combo" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                    <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
                    <demo-chart-stack-control id="stackControl" type="combo" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue} />
                </oj-toolbar>
        </div>
    );
};
export default CombinationChartDefault;

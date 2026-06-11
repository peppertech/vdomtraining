import { h } from 'preact';
import type { ComponentProps, JSX } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as quarterDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojtoolbar';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import '../../../../../../jet-composites/demo-select-enum/loader';

type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ChartDataLabelPosition =
  | 'auto'
  | 'center'
  | 'aboveMarker'
  | 'belowMarker'
  | 'beforeMarker'
  | 'afterMarker';
type LineWithAreaChartItem = {
  id: number;
  quarter: string;
  series: string;
  value: number;
};

const quarterData = JSON.parse(quarterDataText as string) as LineWithAreaChartItem[];

export const LineWithAreaChartDataLabels = (): JSX.Element => {
  const [stackValue, setStackValue] = useState<ChartStack>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [labelPosition, setLabelPosition] = useState<ChartDataLabelPosition>('auto');

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(quarterData, {
        keyAttributes: 'id'
      }),
    []
  );

  const styleDefaults: NonNullable<ComponentProps<'oj-chart'>['styleDefaults']> = {
    dataLabelPosition: labelPosition,
    dataLabelStyle: { fontSize: '12px' }
  };

  const itemTemplateRenderer = (item: { data: LineWithAreaChartItem }): JSX.Element => (
    <oj-chart-item
      value={item.data.value}
      groupId={[item.data.quarter]}
      seriesId={item.data.series}
      label={Number(item.data.id) === 2 || Number(item.data.id) === 5 ? item.data.quarter : ''}
    />
  );

  return (
    <div id="chart-container">
      <oj-form-layout aria-controls="lineAreaChart">
        <demo-select-enum
          id="lineId"
          value={labelPosition}
          labelHint="Label Position"
          enumValues={["auto","center","aboveMarker","belowMarker","beforeMarker","afterMarker"]}
          onvalueChanged={(event: JetElementCustomEvent<ChartDataLabelPosition>) =>
            setLabelPosition(event.detail.value)
          }
        />
      </oj-form-layout>
      <oj-chart
        id="lineAreaChart"
        type="lineWithArea"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        orientation={orientationValue}
        stack={stackValue}
        styleDefaults={styleDefaults}
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>
      <oj-toolbar aria-controls="lineAreaChart">
        <demo-chart-orientation-control
          type="lineWithArea"
          focusManagement="none"
          orientation={orientationValue}
          onorientationChanged={(event: JetElementCustomEvent<ChartOrientation>) =>
            setOrientationValue(event.detail.value)
          }
        />
        <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
        <demo-chart-stack-control
          type="lineWithArea"
          focusManagement="none"
          stack={stackValue}
          onstackChanged={(event: JetElementCustomEvent<ChartStack>) => setStackValue(event.detail.value)}
        />
      </oj-toolbar>
    </div>
  );
};

export default LineWithAreaChartDataLabels;

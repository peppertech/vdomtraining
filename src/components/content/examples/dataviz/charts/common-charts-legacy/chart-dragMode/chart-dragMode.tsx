import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';

import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicCoordData.json';
import 'ojs/ojchart';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import 'ojs/ojformlayout';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
const data = JSON.parse(dataText as string);

type ChartDragModeValue = NonNullable<ComponentProps<'oj-chart'>['dragMode']>;

export const ChartDragMode = () => {
  const [dragModeValue, setDragModeValue] = useState<ChartDragModeValue>('user');

  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: 'id'
  }), []);
  const handleDragModeValueValueChanged = (event: JetElementCustomEvent<ChartDragModeValue>) => {
    setDragModeValue(event.detail.value ?? 'user');
  };

    const xAxisConfig: ComponentProps<'oj-chart'>['xAxis'] = { viewportMin: 20, viewportMax: 40 };
  const yAxisConfig: ComponentProps<'oj-chart'>['yAxis'] = { viewportMin: 30, viewportMax: 50 };
  const itemTemplateRenderer = (item: any) => {
    return <oj-chart-item x={item.data.x} y={item.data.y} z={item.data.z} groupId={[item.data.group]} seriesId={item.data.series}/>;
};

return (
      <div id="chart-container">
            <oj-form-layout aria-controls="bubbleChart">
                    <demo-radioset-enum onvalueChanged={handleDragModeValueValueChanged} value={dragModeValue} direction="row" labelHint="Drag Mode" enumValues={["user", "pan", "zoom", "select", "off"]} />
                </oj-form-layout>
            <oj-chart id="bubbleChart" type="bubble" data={dataProvider} dragMode={dragModeValue} zoomAndScroll="live" selectionMode="multiple" xAxis={xAxisConfig} yAxis={yAxisConfig}>
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                </oj-chart>
        </div>
    );
};
export default ChartDragMode;

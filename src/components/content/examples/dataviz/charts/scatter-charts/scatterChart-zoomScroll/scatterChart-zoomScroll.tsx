// @ts-nocheck
import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';

import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicCoordData.json';
import { ojChart } from 'ojs/ojchart';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
type ChartZoomAndScroll = ComponentProps<'oj-chart'>['zoomAndScroll'];
type ChartZoomDirection = ComponentProps<'oj-chart'>['zoomDirection'];
type ScatterChartItem = {
    id: number;
    group: string;
    series: string;
    x: number;
    y: number;
};

const data = JSON.parse(dataText as string) as ScatterChartItem[];
export const ScatterChartZoomScroll = () => {
  const [zoomValue, setZoomValue] = useState<ChartZoomAndScroll>('live');
  const [zoomDirectionValue, setZoomDirectionValue] = useState<ChartZoomDirection>('auto');
  const [viewPortChangeString, setViewPortChangeString] = useState<string>('');

  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: 'id'
  }), []);
  const viewPortChange = () => {
      return viewPortChangeString.trim();
  };
  const handleZoomValueValueChanged = (event: JetElementCustomEvent<ChartZoomAndScroll>) => {
    setZoomValue(event.detail.value);
  };

  const handleZoomDirectionValueValueChanged = (event: JetElementCustomEvent<ChartZoomDirection>) => {
    setZoomDirectionValue(event.detail.value);
  };

  const viewportChange = (event: ojChart.ojViewportChange) => {
      const detail = event.detail;
      let viewportInfoString = '';
      if (detail['xMin'] != null)
          viewportInfoString += `xMin: ${detail['xMin'].toFixed(2)}`;
      if (detail['xMax'] != null)
          viewportInfoString += `\nxMax: ${detail['xMax'].toFixed(2)}\n\n`;
      if (detail['yMin'] != null)
          viewportInfoString += `yMin: ${detail['yMin'].toFixed(2)}`;
      if (detail['yMax'] != null)
          viewportInfoString += `\nyMax: ${detail['yMax'].toFixed(2)}`;
      setViewPortChangeString(viewportInfoString);
  };
    const itemTemplateRenderer = (item: any) => {
      return <oj-chart-item x={item.data.x} y={item.data.y} groupId={[item.data.group]} seriesId={item.data.series}/>;
  };

return (
      <div id="chart-container">
            <oj-form-layout aria-controls="scatterChart">
                    <demo-radioset-enum direction="row" labelHint="Zoom and Control" onvalueChanged={handleZoomValueValueChanged} value={zoomValue} enumValues={["live","liveScrollOnly"]} />
                    <demo-radioset-enum direction="row" onvalueChanged={handleZoomDirectionValueValueChanged} value={zoomDirectionValue} labelHint="Zoom Direction" enumValues={["auto","x","y"]} />
                </oj-form-layout>
            <oj-chart id="scatterChart" type="scatter" selectionMode="multiple" data={dataProvider} zoomAndScroll={zoomValue} zoomDirection={zoomDirectionValue} onojViewportChange={viewportChange} xAxis={"{\"viewportMin\": 10, \"viewportMax\": 40}"} yAxis={"{\"viewportMin\": 5, \"viewportMax\": 30}"}>
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                </oj-chart>
            <div class="oj-sm-padding-1x">
                    <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">viewPortChange</div>
                    <div style={{ whiteSpace: 'pre-line' }}>{viewPortChange()}</div>
                </div>
        </div>
    );
};
export default ScatterChartZoomScroll;

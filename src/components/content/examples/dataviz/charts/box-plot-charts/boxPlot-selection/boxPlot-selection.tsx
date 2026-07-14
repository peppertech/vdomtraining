import 'preact';
import type { ComponentProps } from 'preact';

import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import { ojChart } from 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojtoolbar';
import { useMemo,useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/boxPlotTwoSeriesData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ChartSelectionMode = ComponentProps<'oj-chart'>['selectionMode'];
type ChartSelection = NonNullable<ComponentProps<'oj-chart'>['selection']>;
type BoxPlotDatum = {
    id: number;
    group: string;
    series: string;
    low: number;
    high: number;
    q1: number;
    q2: number;
    q3: number;
    outliers?: number[];
};

const data = JSON.parse(dataText as string) as BoxPlotDatum[];
export const BoxPlotSelection = () => {
  const selected = useMemo(() => [1, 6, 3], []);
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [selectionModeValue, setSelectionModeValue] = useState<ChartSelectionMode>('multiple');
  const [selectionValue, setSelectionValue] = useState<ChartSelection>(selected);
  const [selectionEventInfo, setSelectionEventInfo] = useState<string>('');

  const jsonData = data;
  const dataProvider = useMemo(() => new ArrayDataProvider(jsonData, {
      keyAttributes: 'id'
  }), [jsonData]);
  const idToItemMap = useMemo<Record<number, BoxPlotDatum | undefined>>(() => ({}), []);
  const selectionInfo = () => {
      let items = '';
      const selection = selectionValue;
      if (selection.length > 0) {
          items += 'items:\n';
          for (let i = 0; i < selection.length; i++) {
              const id = selection[i];
              let item, outlierIndex;
              if (typeof id == 'string') {
                  const idArr = (id as string).split('; ');
                  item = idToItemMap[Number(idArr[0])];
                  outlierIndex = idArr[1];
              }
              else {
                  item = idToItemMap[id];
              }
              const outlierIndexText = outlierIndex ? `, Outlier index: ${outlierIndex}` : '';
              if (item) {
                  items += `    ${item.series}, ${item.group}${outlierIndexText}\n`;
              }
          }
          items += selectionEventInfo;
      }
      return items.trim();
  };
  const handleSelectionModeValueValueChanged = (event: JetElementCustomEvent<ChartSelectionMode>) => {
    setSelectionModeValue(event.detail.value);
  };

  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value);
  };

  const selectionListener = (event: ojChart.selectionChanged<string, Record<string, string | number>, null, null>) => {
      let eventInfo = '';
      const detail = event.detail;
      if (detail['startGroup'])
          eventInfo += `\nstartGroup: ${detail['startGroup']}`;
      if (detail['endGroup'])
          eventInfo += `\nendGroup: ${detail['endGroup']}\n`;
      if (detail['xMin'])
          eventInfo += `\nxMin: ${detail['xMin'].toFixed(2)}`;
      if (detail['xMax'])
          eventInfo += `\nxMax: ${detail['xMax'].toFixed(2)}\n`;
      if (detail['yMin'])
          eventInfo += `\nyMin: ${detail['yMin'].toFixed(2)}`;
      if (detail['yMax'])
          eventInfo += `\nyMax: ${detail['yMax'].toFixed(2)}\n`;
      setSelectionEventInfo(eventInfo);
  };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
      return <oj-chart-item low={item.data.low} high={item.data.high} q1={item.data.q1} q2={item.data.q2} q3={item.data.q3} items={item.data.outliers} groupId={[item.data.group]} seriesId={item.data.series}/>;
  };

return (
      <div id="chart-container">
            <oj-form-layout aria-controls="areaChart">
                    <demo-radioset-enum labelHint="Selection" onvalueChanged={handleSelectionModeValueValueChanged} value={selectionModeValue} direction="row" enumValues={["none", "single", "multiple"]} />
                </oj-form-layout>
            <oj-chart id="boxPlot" type="boxPlot" data={dataProvider} selectionMode={selectionModeValue} selection={selectionValue} orientation={orientationValue} animationOnDisplay="auto" animationOnDataChange="auto" onselectionChanged={selectionListener}>
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                </oj-chart>
            <div class="oj-sm-padding-1x">
                    <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Selection</div>
                    <div style={{ whiteSpace: 'pre-line' }}>{selectionInfo()}</div>
                </div>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="boxPlot">
                    <demo-chart-orientation-control id="orientationControl" type="boxPlot" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                </oj-toolbar>
        </div>
    );
};
export default BoxPlotSelection;

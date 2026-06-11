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
type ChartSelectionMode = ComponentProps<'oj-chart'>['selectionMode'];
type ChartSelection = ComponentProps<'oj-chart'>['selection'];

type ScatterChartItem = {
    id: number;
    group: string;
    series: string;
    x: number;
    y: number;
};

const data = JSON.parse(dataText as string) as ScatterChartItem[];
export const ScatterChartSelection = () => {
  const selected = useMemo(() => [0, 3, 9], []);
  const [selectionValue, setSelectionValue] = useState<ChartSelectionMode>('multiple');
  const [selectedItemsValue, setSelectedItemsValue] = useState<ChartSelection>(selected);
  const [selectionEventInfo, setSelectionEventInfo] = useState<string>('');

  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: 'id'
  }), []);
  const idToItemMap = useMemo<Record<number, ScatterChartItem | undefined>>(() => ({}), []);
  const selectionInfo = () => {
      let items = '';
      const selection = selectedItemsValue ?? [];
      if (selection.length > 0) {
          items += 'items:\n';
          for (let i = 0; i < selection.length; i++) {
              const id = selection[i];
              const item = idToItemMap[id];
              if (item) {
                  items += `    ${item.series}, ${item.group}\n`;
              }
          }
          items += selectionEventInfo;
      }
      return items.trim();
  };
  const handleSelectionValueValueChanged = (event: JetElementCustomEvent<ChartSelectionMode>) => {
    setSelectionValue(event.detail.value);
  };

  const selectionListener = (event: ojChart.selectionChanged<string, Record<string, string | number>, null, null>) => {
      let eventInfo = '';
      const detail = event.detail;
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
      return <oj-chart-item x={item.data.x} y={item.data.y} groupId={[item.data.group]} seriesId={item.data.series}/>;
  };

return (
      <div id="chart-container">
            <oj-form-layout aria-controls="scatterChart">
                    <demo-radioset-enum labelHint="Selection" direction="row" onvalueChanged={handleSelectionValueValueChanged} value={selectionValue} enumValues={["none","single","multiple"]} />
                </oj-form-layout>
            <oj-chart id="scatterChart" type="scatter" selectionMode={selectionValue} selection={selectedItemsValue} data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" onselectionChanged={selectionListener}>
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                </oj-chart>
            <div class="oj-sm-padding-1x">
                    <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Selection</div>
                    <div style={{ whiteSpace: 'pre-line' }}>{selectionInfo()}</div>
                </div>
        </div>
    );
};
export default ScatterChartSelection;

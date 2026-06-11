import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';

import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as quarterDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import { ojChart } from 'ojs/ojchart';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ChartSelectionMode = ComponentProps<'oj-chart'>['selectionMode'];
type ChartSelection = NonNullable<ComponentProps<'oj-chart'>['selection']>;
type QuarterDatum = {
    id: number;
    quarter: string;
    series: string;
    value: number;
};

const quarterData = JSON.parse(quarterDataText as string) as QuarterDatum[];
export const CombinationChartSelection = () => {
  const selected = useMemo(() => [0, 4, 12], []);
  const [stackValue, setStackValue] = useState<ChartStack>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [selectionValue, setSelectionValue] = useState<ChartSelectionMode>('multiple');
  const [selectedItemsValue, setSelectedItemsValue] = useState<ChartSelection>(selected);
  const [selectionEventInfo, setSelectionEventInfo] = useState<string>('');

  const jsonData = quarterData;
  const dataProvider = useMemo(() => new ArrayDataProvider(jsonData, {
      keyAttributes: 'id'
  }), [jsonData]);
  const idToItemMap = useMemo<Record<number, QuarterDatum | undefined>>(() => ({}), []);
  const selectionInfo = () => {
      let items = '';
      const selection = selectedItemsValue;
      if (selection.length > 0) {
          items += 'items:\n';
          for (let i = 0; i < selection.length; i++) {
              const id = selection[i];
              const item = idToItemMap[id];
              if (item) {
                  items += `    ${item.series}, ${item.quarter}\n`;
              }
          }
          items += selectionEventInfo;
      }
      return items.trim();
  };
  const handleSelectionValueValueChanged = (event: JetElementCustomEvent<ChartSelectionMode>) => {
    setSelectionValue(event.detail.value);
  };

  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value);
  };

  const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
    setStackValue(event.detail.value);
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
      return <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series}/>;
  };

return (
      <div id="chart-container">
            <oj-form-layout aria-controls="comboChart">
                    <demo-radioset-enum direction="row" onvalueChanged={handleSelectionValueValueChanged} value={selectionValue} enumValues={["none","single","multiple"]} labelHint="Selection" />
                </oj-form-layout>
            <oj-chart id="comboChart" type="combo" selectionMode={selectionValue} selection={selectedItemsValue} data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" orientation={orientationValue} stack={stackValue} onselectionChanged={selectionListener}>
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                </oj-chart>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="comboChart">
                    <demo-chart-orientation-control id="orientationControl" type="combo" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                    <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
                    <demo-chart-stack-control id="stackControl" type="combo" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue} />
                </oj-toolbar>
            <div class="oj-sm-padding-1x">
                    <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Selection</div>
                    <div style={{ whiteSpace: 'pre-line' }}>{selectionInfo()}</div>
                </div>
        </div>
    );
};
export default CombinationChartSelection;

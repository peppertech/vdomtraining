import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';

import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as chartDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/singleItemData.json';
import 'ojs/ojformlayout';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ChartSelectionMode = ComponentProps<'oj-chart'>['selectionMode'];
type ChartSelection = NonNullable<ComponentProps<'oj-chart'>['selection']>;
type FunnelDatum = {
    id: number;
    group: string;
    series: string;
    value: number;
};

const chartData = JSON.parse(chartDataText as string) as FunnelDatum[];
export const FunnelChartSelection = () => {
  const selected = useMemo(() => [0, 1, 2], []);
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [selectionValue, setSelectionValue] = useState<ChartSelectionMode>('multiple');
  const [selectedItemsValue, setSelectedItemsValue] = useState<ChartSelection>(selected);

  const idToItemMap = useMemo<Record<number, FunnelDatum | undefined>>(() => ({}), []);
  const jsonData = chartData;
  const dataProvider = useMemo(() => new ArrayDataProvider(jsonData, {
      keyAttributes: 'id'
  }), [jsonData]);
  const selectionInfo = () => {
      let items = '';
      const selection = selectedItemsValue;
      items += 'items:\n';
      if (selection.length > 0) {
          for (let i = 0; i < selection.length; i++) {
              const id = selection[i];
              const item = idToItemMap[id];
              if (item) {
                  items += `    ${item.series}\n`;
              }
          }
      }
      return items.trim();
  };
  const handleSelectionValueValueChanged = (event: JetElementCustomEvent<ChartSelectionMode>) => {
    setSelectionValue(event.detail.value);
  };

  const handleSelectedItemsValueSelectionChanged = (event: JetElementCustomEvent<ComponentProps<'oj-chart'>['selection']>) => {
    setSelectedItemsValue(event.detail.value ?? []);
  };

  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value);
  };

    const itemTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => {
      return <oj-chart-item value={$current.data.value} groupId={[$current.data.group]} seriesId={$current.data.series}/>;
  };

return (
      <div id="chart-container">
            <oj-form-layout aria-controls="funnelChart">
                    <demo-radioset-enum labelHint="Selection" direction="row" onvalueChanged={handleSelectionValueValueChanged} value={selectionValue} enumValues={["none","single","multiple"]} />
                </oj-form-layout>
            <oj-chart id="funnelChart" type="funnel" data={dataProvider} orientation={orientationValue} selectionMode={selectionValue} onselectionChanged={handleSelectedItemsValueSelectionChanged} selection={selectedItemsValue} animationOnDisplay="auto">
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                </oj-chart>
            <oj-toolbar aria-label="Chart Display Options Toolbar" aria-controls="funnelChart">
                    <demo-chart-orientation-control id="orientationControl" type="funnel" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                </oj-toolbar>
            <div class="oj-sm-padding-1x">
                    <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Selection</div>
                    <div style={{ whiteSpace: 'pre-line' }}>{selectionInfo()}</div>
                </div>
        </div>
    );
};
export default FunnelChartSelection;

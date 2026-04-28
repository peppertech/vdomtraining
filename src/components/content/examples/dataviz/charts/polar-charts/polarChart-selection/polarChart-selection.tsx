import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as barDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/twoSeriesData.json';
import * as coordDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicCoordData.json';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';

type ChartSelectionMode = ComponentProps<'oj-chart'>['selectionMode'];
type ChartSelection = NonNullable<ComponentProps<'oj-chart'>['selection']>;
type ChartSelectionChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-chart'>['onselectionChanged']>
>[0];
type PolarBarChartItem = {
  id: number;
  group: string;
  series: string;
  value: number;
};
type PolarBubbleChartItem = {
  id: number;
  group: string;
  series: string;
  x: number;
  y: number;
  z: number;
};

const initialMultipleSelection: ChartSelection = [0, 3, 9];
const barData = JSON.parse(barDataText as string) as PolarBarChartItem[];
const coordData = JSON.parse(coordDataText as string) as PolarBubbleChartItem[];

const getSelectionNodes = <TItem extends { series: string; group: string }>(
  selection: ChartSelection,
  idToItemMap: Record<number, TItem | undefined>
) => {
  let items = '';

  if (selection.length > 0) {
    for (const id of selection) {
      const item = idToItemMap[id];
      if (item) {
        items += `    ${item.series}, ${item.group}\n`;
      }
    }
  }

  return items.trim();
};

export const PolarChartSelection = () => {
  const [selectionValue, setSelectionValue] = useState<ChartSelectionMode>('multiple');
  const [selectedItemsValueBubble, setSelectedItemsValueBubble] =
    useState<ChartSelection>(initialMultipleSelection);
  const [selectedItemsValueBar, setSelectedItemsValueBar] =
    useState<ChartSelection>(initialMultipleSelection);

  const barDataProvider = useMemo(
    () => new ArrayDataProvider<number, PolarBarChartItem>(barData, { keyAttributes: 'id' }),
    []
  );
  const bubbleDataProvider = useMemo(
    () => new ArrayDataProvider<number, PolarBubbleChartItem>(coordData, { keyAttributes: 'id' }),
    []
  );

  const idToBarItemMap = useMemo<Record<number, PolarBarChartItem | undefined>>(
    () => Object.fromEntries(barData.map((item) => [item.id, item])),
    []
  );
  const idToBubbleItemMap = useMemo<Record<number, PolarBubbleChartItem | undefined>>(
    () => Object.fromEntries(coordData.map((item) => [item.id, item])),
    []
  );

  const handleSelectionModeChanged = (event: JetElementCustomEvent<ChartSelectionMode>) => {
    const nextMode = event.detail.value;
    const nextSelection =
      nextMode === 'multiple' ? [0, 3, 9] : nextMode === 'single' ? [0] : [];

    setSelectionValue(nextMode);
    setSelectedItemsValueBubble(nextSelection);
    setSelectedItemsValueBar(nextSelection);
  };

  const handleSelectedItemsValueBubbleSelectionChanged = (event: ChartSelectionChangedEvent) => {
    setSelectedItemsValueBubble(event.detail.value ?? []);
  };

  const handleSelectedItemsValueBarSelectionChanged = (event: ChartSelectionChangedEvent) => {
    setSelectedItemsValueBar(event.detail.value ?? []);
  };

  const bubbleItemTemplateRenderer = (item: { data: PolarBubbleChartItem }) => (
    <oj-chart-item
      x={item.data.x}
      y={item.data.y}
      z={item.data.z}
      groupId={[item.data.group]}
      seriesId={item.data.series}
    />
  );

  const barItemTemplateRenderer = (item: { data: PolarBarChartItem }) => (
    <oj-chart-item
      value={item.data.value}
      groupId={[item.data.group]}
      seriesId={item.data.series}
    />
  );

  return (
    <div id="chart-container">
      <oj-form-layout aria-controls="bubbleChart barChart">
        <demo-radioset-enum
          id="radioButtonset"
          labelHint="Label"
          direction="row"
          onvalueChanged={handleSelectionModeChanged}
          value={selectionValue}
          enumValues={["none","single","multiple"]}
        />
      </oj-form-layout>

      <div class="oj-flex">
        <div class="oj-flex-item">
          <oj-chart
            id="bubbleChart"
            coordinateSystem="polar"
            type="bubble"
            polarGridShape="circle"
            data={bubbleDataProvider}
            animationOnDisplay="auto"
            animationOnDataChange="auto"
            selectionMode={selectionValue}
            onselectionChanged={handleSelectedItemsValueBubbleSelectionChanged}
            selection={selectedItemsValueBubble}
          >
            <template slot="itemTemplate" render={bubbleItemTemplateRenderer} />
          </oj-chart>
          <div class="oj-sm-padding-1x">
            <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Selection</div>
            <div style={{ whiteSpace: 'pre-line' }}>
              {getSelectionNodes(selectedItemsValueBubble, idToBubbleItemMap)}
            </div>
          </div>
        </div>

        <div class="oj-flex-item">
          <oj-chart
            id="barChart"
            coordinateSystem="polar"
            type="bar"
            stack="on"
            polarGridShape="circle"
            data={barDataProvider}
            animationOnDisplay="auto"
            animationOnDataChange="auto"
            selectionMode={selectionValue}
            onselectionChanged={handleSelectedItemsValueBarSelectionChanged}
            selection={selectedItemsValueBar}
          >
            <template slot="itemTemplate" render={barItemTemplateRenderer} />
          </oj-chart>
          <div class="oj-sm-padding-1x">
            <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Selection</div>
            <div style={{ whiteSpace: 'pre-line' }}>
              {getSelectionNodes(selectedItemsValueBar, idToBarItemMap)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolarChartSelection;

import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/singleItemData.json';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import 'ojs/ojchart';
import 'ojs/ojformlayout';

type ChartDatum = {
  id: number;
  value: number;
  group: string;
  series: string;
};
type SelectionMode = ComponentProps<'oj-chart'>['selectionMode'];
type SelectionEffect = 'highlight' | 'explode' | 'highlightAndExplode';
type ValueChangedStringEvent = CustomEvent<{ value: string }>;
type SelectionChangedEvent = Parameters<NonNullable<ComponentProps<'oj-chart'>['onselectionChanged']>>[0];
type ItemTemplateContext = {
  data: ChartDatum;
};

const jsonData = JSON.parse(dataText as string) as ChartDatum[];
const defaultSelection = [0];

export const PieChartSelection = () => {
  const [modeValue, setModeValue] = useState<SelectionMode>('multiple');
  const [effectValue, setEffectValue] = useState<SelectionEffect>('explode');
  const [selectionValue, setSelectionValue] = useState<any[]>(defaultSelection);
  const dataProvider = useMemo(
    () => new ArrayDataProvider<ChartDatum['id'], ChartDatum>(jsonData, { keyAttributes: 'id' }),
    []
  );
  const idToItemMap = useMemo<Record<number, ChartDatum>>(
    () =>
      jsonData.reduce<Record<number, ChartDatum>>((accumulator, item) => {
        accumulator[item.id] = item;
        return accumulator;
      }, {}),
    []
  );

  const selectionInfo = () => {
    const selectedItems = selectionValue.map((id) => idToItemMap[id]?.series).filter(Boolean);
    return selectedItems.length > 0 ? selectedItems.join('\n') : 'None';
  };

  const handleModeValueChanged = (event: ValueChangedStringEvent) => {
    setModeValue(event.detail.value as SelectionMode);
  };

  const handleEffectValueChanged = (event: ValueChangedStringEvent) => {
    setEffectValue(event.detail.value as SelectionEffect);
  };

  const handleSelectionChanged = (event: SelectionChangedEvent) => {
    setSelectionValue(event.detail.value ?? []);
  };

  const renderItem = (item: ItemTemplateContext) => {
    return (
      <oj-chart-item
        value={item.data.value}
        groupId={[item.data.group]}
        seriesId={item.data.series}
      />
    );
  };

  return (
    <div id="chart-container">
      <oj-form-layout>
        <demo-radioset-enum
          onvalueChanged={handleModeValueChanged}
          value={modeValue}
          direction="row"
          labelHint="Mode"
          enumValues={["none","single","multiple"]}
        />
        <demo-radioset-enum
          onvalueChanged={handleEffectValueChanged}
          value={effectValue}
          labelHint="Effect"
          direction="row"
          enumValues={["highlight","explode","highlightAndExplode"]}
        />
      </oj-form-layout>
      <oj-chart
        id="pieChart"
        type="pie"
        selectionMode={modeValue}
        onselectionChanged={handleSelectionChanged}
        selection={selectionValue}
        data={dataProvider}
        animationOnDisplay="auto"
        legend={{ position: 'bottom' }}
        styleDefaults={{ selectionEffect: effectValue }}
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-chart>
      <div class="oj-sm-padding-1x">
        <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Selection</div>
        <div style={{ whiteSpace: 'pre-line' }}>{selectionInfo()}</div>
      </div>
    </div>
  );
};

export default PieChartSelection;

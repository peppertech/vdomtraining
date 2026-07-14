import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/singleItemData.json';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ChartSelectionMode = NonNullable<ComponentProps<'oj-chart'>['selectionMode']>;
type ChartSelection = NonNullable<ComponentProps<'oj-chart'>['selection']>;
type ChartSelectionChangedEvent = Parameters<NonNullable<ComponentProps<'oj-chart'>['onselectionChanged']>>[0];

type PyramidChartItem = {
  id: number;
  group: string;
  series: string;
  value: number;
};

const data = JSON.parse(dataText as string) as PyramidChartItem[];
const MULTIPLE_SELECTION: ChartSelection = [0, 1, 2];
const SINGLE_SELECTION: ChartSelection = [1];

export const PyramidChartSelection = () => {
  const [selectionValue, setSelectionValue] = useState<ChartSelectionMode>('multiple');
  const [selectedItemsValue, setSelectedItemsValue] = useState<ChartSelection>(MULTIPLE_SELECTION);

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, PyramidChartItem>(data, { keyAttributes: 'id' }),
    []
  );
  const idToItemMap = useMemo<Record<number, PyramidChartItem>>(
    () =>
      data.reduce<Record<number, PyramidChartItem>>((map, item) => {
        map[item.id] = item;
        return map;
      }, {}),
    []
  );

  const selectionInfo = () => {
    let items = '';

    if (selectedItemsValue.length > 0) {
      items += 'items:\n';

      for (const id of selectedItemsValue) {
        const item = idToItemMap[id as number];
        if (item) {
          items += `    ${item.series}\n`;
        }
      }
    }

    return items.trim();
  };

  const handleSelectionValueValueChanged = (event: JetElementCustomEvent<ChartSelectionMode>) => {
    const nextValue = event.detail.value;
    setSelectionValue(nextValue);

    if (nextValue === 'multiple') {
      setSelectedItemsValue(MULTIPLE_SELECTION);
    } else if (nextValue === 'single') {
      setSelectedItemsValue(SINGLE_SELECTION);
    } else {
      setSelectedItemsValue([]);
    }
  };

  const handleSelectedItemsValueSelectionChanged = (event: ChartSelectionChangedEvent) => {
    setSelectedItemsValue(event.detail.value ?? []);
  };

  const itemTemplateRenderer = (item: { data: PyramidChartItem }) => (
    <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series} />
  );

  return (
    <div id="chart-container">
      <oj-form-layout aria-controls="pyramidChart">
        <demo-radioset-enum
          direction="row"
          labelHint="Selection"
          onvalueChanged={handleSelectionValueValueChanged}
          value={selectionValue}
          enumValues={["none","single","multiple"]}
        />
      </oj-form-layout>

      <oj-chart
        id="pyramidChart"
        type="pyramid"
        data={dataProvider}
        selectionMode={selectionValue}
        onselectionChanged={handleSelectedItemsValueSelectionChanged}
        selection={selectedItemsValue}
        animationOnDisplay="auto"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>

      <div class="oj-sm-padding-1x">
        <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Selection</div>
        <div style={{ whiteSpace: 'pre-line' }}>{selectionInfo()}</div>
      </div>
    </div>
  );
};

export default PyramidChartSelection;

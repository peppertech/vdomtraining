import 'ojs/ojchart';
import { ojChart } from 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojtoolbar';
import type { ComponentProps } from 'preact';
import { useEffect,useMemo,useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicRangeData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ChartOrientation = NonNullable<ComponentProps<'oj-chart'>['orientation']>;
type ChartSelectionMode = NonNullable<ComponentProps<'oj-chart'>['selectionMode']>;
type ChartSelection = NonNullable<ComponentProps<'oj-chart'>['selection']>;
type SelectionEventDetail = {
  startGroup?: string;
  endGroup?: string;
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  value: ChartSelection;
};
type RangeChartItem = {
  id: number;
  group: string;
  series: string;
  low: number;
  high: number;
};

const rangeData = JSON.parse(dataText as string) as RangeChartItem[];
const initialMultipleSelection: ChartSelection = [0, 2, 6];
const initialSingleSelection: ChartSelection = [0];
const emptySelection: ChartSelection = [];

export const RangeChartSelection = () => {
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [selectionValue, setSelectionValue] = useState<ChartSelectionMode>('multiple');
  const [selectedItemsValue, setSelectedItemsValue] =
    useState<ChartSelection>(initialMultipleSelection);
  const [selectionEventInfo, setSelectionEventInfo] = useState('');

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, RangeChartItem>(rangeData, { keyAttributes: 'id' }),
    []
  );

  const idToItemMap = useMemo(
    () =>
      rangeData.reduce<Record<number, RangeChartItem>>((map, item) => {
        map[item.id] = item;
        return map;
      }, {}),
    []
  );

  useEffect(() => {
    if (selectionValue === 'multiple') {
      setSelectedItemsValue(initialMultipleSelection);
    } else if (selectionValue === 'single') {
      setSelectedItemsValue(initialSingleSelection);
    } else {
      setSelectedItemsValue(emptySelection);
    }
    setSelectionEventInfo('');
  }, [selectionValue]);

  const selectionInfo = useMemo(() => {
    if (selectedItemsValue.length === 0) {
      return '';
    }

    const selectedItemsText = selectedItemsValue
      .map((id) => {
        const item = idToItemMap[id as number];
        return item ? `    ${item.series}, ${item.group}` : '';
      })
      .filter(Boolean)
      .join('\n');

    return `items:\n${selectedItemsText}${selectionEventInfo}`;
  }, [idToItemMap, selectedItemsValue, selectionEventInfo]);

  const handleSelectionValueChanged = (
    event: DatavizValueChangedEvent<string>
  ) => {
    setSelectionValue(event.detail.value as ChartSelectionMode);
  };

  const handleOrientationChanged = (
    event: DatavizValueChangedEvent<string>
  ) => {
    setOrientationValue(event.detail.value as ChartOrientation);
  };

  const handleSelectionChanged = (
    event: ojChart.selectionChanged<number, RangeChartItem, null, null>
  ) => {
    const detail = event.detail as SelectionEventDetail;
    let eventInfo = '';

    setSelectedItemsValue(detail.value);

    if (detail.startGroup) {
      eventInfo += `\nstartGroup: ${detail.startGroup}`;
    }
    if (detail.endGroup) {
      eventInfo += `\nendGroup: ${detail.endGroup}\n`;
    }
    if (typeof detail.xMin === 'number') {
      eventInfo += `\nxMin: ${detail.xMin.toFixed(2)}`;
    }
    if (typeof detail.xMax === 'number') {
      eventInfo += `\nxMax: ${detail.xMax.toFixed(2)}\n`;
    }
    if (typeof detail.yMin === 'number') {
      eventInfo += `\nyMin: ${detail.yMin.toFixed(2)}`;
    }
    if (typeof detail.yMax === 'number') {
      eventInfo += `\nyMax: ${detail.yMax.toFixed(2)}\n`;
    }

    setSelectionEventInfo(eventInfo);
  };

  const itemTemplateRenderer = (item: { data: RangeChartItem }) => (
    <oj-chart-item
      low={item.data.low}
      high={item.data.high}
      groupId={[item.data.group]}
      seriesId={item.data.series}
    />
  );

  return (
    <div id="chart-container">
      <oj-form-layout aria-controls="rangeChart">
        <demo-radioset-enum
          value={selectionValue}
          labelHint="Selection"
          direction="row"
          enumValues={["none","single","multiple"]}
          onvalueChanged={handleSelectionValueChanged}
        />
      </oj-form-layout>

      <div>
        <oj-chart
          id="rangeChart"
          type="bar"
          selectionMode={selectionValue}
          data={dataProvider}
          selection={selectedItemsValue}
          orientation={orientationValue}
          animationOnDisplay="auto"
          animationOnDataChange="auto"
          onselectionChanged={handleSelectionChanged}
        >
          <template slot="itemTemplate" render={itemTemplateRenderer} />
        </oj-chart>

        <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="rangeChart">
          <demo-chart-orientation-control
            id="orientationControl"
            type="bar"
            focusManagement="none"
            orientation={orientationValue}
            onorientationChanged={handleOrientationChanged}
          />
        </oj-toolbar>

        <div class="oj-sm-padding-1x">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Selection</div>
          <div style={{ whiteSpace: 'pre-line' }}>{selectionInfo}</div>
        </div>
      </div>
    </div>
  );
};

export default RangeChartSelection;

import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import { ojChart } from 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojtoolbar';
import 'preact';
import type { ComponentProps } from 'preact';
import { useEffect,useMemo,useState } from 'preact/hooks';
import * as quarterDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ChartSelectionMode = ComponentProps<'oj-chart'>['selectionMode'];
type ChartSelection = ComponentProps<'oj-chart'>['selection'];
type LineWithAreaChartItem = {
  id: number;
  quarter: string;
  series: string;
  value: number;
};
type ChartItemTemplateContext = { data: LineWithAreaChartItem };

const quarterData = JSON.parse(quarterDataText as string) as LineWithAreaChartItem[];
export const LineWithAreaChartSelection = () => {
  const initialMultipleSelection = useMemo(() => [1, 5, 9, 13], []);
  const [stackValue, setStackValue] = useState<ChartStack>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [selectionValue, setSelectionValue] = useState<ChartSelectionMode>('multiple');
  const [selectedItemsValue, setSelectedItemsValue] = useState<ChartSelection>(initialMultipleSelection);
  const [selectionEventInfo, setSelectionEventInfo] = useState<string>('');

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(quarterData, {
        keyAttributes: 'id'
      }),
    []
  );

  const idToItemMap = useMemo(
    () =>
      quarterData.reduce<Record<number, LineWithAreaChartItem>>((accumulator, item) => {
        accumulator[item.id] = item;
        return accumulator;
      }, {}),
    []
  );

  useEffect(() => {
    if (selectionValue === 'multiple') {
      setSelectedItemsValue(initialMultipleSelection);
    } else if (selectionValue === 'single') {
      setSelectedItemsValue([5]);
    } else {
      setSelectedItemsValue([]);
    }
    setSelectionEventInfo('');
  }, [initialMultipleSelection, selectionValue]);

  const selectionInfo = () => {
    let items = '';
    const selection = selectedItemsValue ?? [];
    if (selection.length > 0) {
      items += 'items:\n';
      for (let i = 0; i < selection.length; i++) {
        const id = selection[i] as number;
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
    if (detail.startGroup) eventInfo += `\nstartGroup: ${detail.startGroup}`;
    if (detail.endGroup) eventInfo += `\nendGroup: ${detail.endGroup}\n`;
    if (detail.xMin !== undefined) eventInfo += `\nxMin: ${detail.xMin.toFixed(2)}`;
    if (detail.xMax !== undefined) eventInfo += `\nxMax: ${detail.xMax.toFixed(2)}\n`;
    if (detail.yMin !== undefined) eventInfo += `\nyMin: ${detail.yMin.toFixed(2)}`;
    if (detail.yMax !== undefined) eventInfo += `\nyMax: ${detail.yMax.toFixed(2)}\n`;
    setSelectedItemsValue(detail.value as ChartSelection);
    setSelectionEventInfo(eventInfo);
  };

  const itemTemplateRenderer = (item: ChartItemTemplateContext) => (
    <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series} />
  );

return (
      <div id="chart-container" class="oj-flex oj-sm-flex-direction-column">
            <oj-form-layout aria-controls="lineAreaChart">
                    <demo-radioset-enum labelHint="Selection" direction="row" onvalueChanged={handleSelectionValueValueChanged} value={selectionValue} enumValues={["none","single","multiple"]} />
                </oj-form-layout>
            <oj-chart id="lineAreaChart" type="lineWithArea" selectionMode={selectionValue} data={dataProvider} selection={selectedItemsValue} orientation={orientationValue} stack={stackValue} animationOnDisplay="auto" animationOnDataChange="auto" onselectionChanged={selectionListener}>
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                </oj-chart>
            <oj-toolbar aria-controls="lineAreaChart">
                    <demo-chart-orientation-control type="lineWithArea" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                    <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
                    <demo-chart-stack-control type="lineWithArea" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue} />
                </oj-toolbar>
            <div class="oj-sm-padding-1x">
                    <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Selection</div>
                    <div style={{ whiteSpace: 'pre-line' }}>{selectionInfo()}</div>
                </div>
        </div>
    );
};
export default LineWithAreaChartSelection;

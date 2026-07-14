import 'css!./demo.css';
import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import '../../../../../../jet-composites/demo-select-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type DataLabelPosition = 'auto' | 'center' | 'aboveMarker' | 'belowMarker' | 'beforeMarker' | 'afterMarker' | 'none';
type DataLabelCollision = 'none' | 'fitInBounds';
type ToggleValue = 'on' | 'off';
type ScatterChartDataLabelItem = {
    id: number;
    x: number;
    y: number;
    group: string;
    series: string;
};
const data: ScatterChartDataLabelItem[] = [
    { id: 0, x: 32.08170510280205, y: 33.94425718214522, group: 'Group 1', series: 'Series 1' },
    { id: 1, x: 21.51439323030609, y: 78.53566371164601, group: 'Group 1', series: 'Series 2' },
    { id: 2, x: 35.07289074265411, y: 10.260653369142855, group: 'Group 1', series: 'Series 3' },
    { id: 3, x: 29.507313410654465, y: 58.631788817514646, group: 'Group 1', series: 'Series 4' },
    { id: 4, x: 115.35269490898722, y: 99.63504916103548, group: 'Group 1', series: 'Series 5' },
    { id: 5, x: 98.61994164450005, y: 75.34566574691573, group: 'Group 2', series: 'Series 1' },
    { id: 6, x: 44.167885959889674, y: 77.69819716343652, group: 'Group 2', series: 'Series 2' },
    { id: 7, x: 81.90882867777607, y: 13.335841046044068, group: 'Group 2', series: 'Series 3' },
    { id: 8, x: 10.666373905344463, y: 39.88374839788878, group: 'Group 2', series: 'Series 4' },
    { id: 9, x: 97.53801426215873, y: 49.505511972656066, group: 'Group 2', series: 'Series 5' },
    { id: 10, x: 63.23248605496298, y: 34.39109191443485, group: 'Group 3', series: 'Series 1' },
    { id: 11, x: 63.59017781050366, y: 66.40339763907883, group: 'Group 3', series: 'Series 2' },
    { id: 12, x: 46.17723489388504, y: 52.38669672095713, group: 'Group 3', series: 'Series 3' },
    { id: 13, x: 86.08321785128535, y: 40.39295581546628, group: 'Group 3', series: 'Series 4' },
    { id: 14, x: 92.13588821339222, y: 99.47932468901097, group: 'Group 3', series: 'Series 5' },
    { id: 15, x: 76.25336990433252, y: 58.31359902861279, group: 'Group 4', series: 'Series 1' },
    { id: 16, x: 64.12050820815911, y: 68.79754079338882, group: 'Group 4', series: 'Series 2' },
    { id: 17, x: 104.26401410743065, y: 72.34927450147332, group: 'Group 4', series: 'Series 3' },
    { id: 18, x: 97.93050751254027, y: 142.91149596996843, group: 'Group 4', series: 'Series 4' },
    { id: 19, x: 138.7931632469892, y: 189.18655922496475, group: 'Group 4', series: 'Series 5' },
    { id: 20, x: 118.71645296212613, y: 80.55312928620634, group: 'Group 5', series: 'Series 1' },
    { id: 21, x: 34.245088486515456, y: 116.2032868299134, group: 'Group 5', series: 'Series 2' },
    { id: 22, x: 134.7236221911993, y: 151.78661843064168, group: 'Group 5', series: 'Series 3' },
    { id: 23, x: 77.40173138030985, y: 117.05787814704183, group: 'Group 5', series: 'Series 4' },
    { id: 24, x: 43.99316178354023, y: 157.1946394511806, group: 'Group 5', series: 'Series 5' }
];
export const ScatterChartDataLabels = () => {
    const [labelPosition, setLabelPosition] = useState<DataLabelPosition>('auto');
    const [hideOverlappingValue, setHideOverlappingValue] = useState<ToggleValue>('off');
    const [dataCollisionValue, setDataCollisionValue] = useState<DataLabelCollision>('none');
    const [resolveLabelOverlap, setResolveLabelOverlap] = useState<ToggleValue>('off');
    const [tooltipDisplay, setTooltipDisplay] = useState<ToggleValue>('on');
    const dataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'id'
    }), []);
    const handleLabelPositionValueChanged = (event: JetElementCustomEvent<DataLabelPosition>) => {
        setLabelPosition(event.detail.value ?? 'auto');
    };
    const handleResolveLabelOverlapValueChanged = (event: JetElementCustomEvent<ToggleValue>) => {
        setResolveLabelOverlap(event.detail.value ?? 'off');
    };
    const handleHideOverlappingValueChanged = (event: JetElementCustomEvent<ToggleValue>) => {
        setHideOverlappingValue(event.detail.value ?? 'off');
    };
    const handleTooltipDisplayValueChanged = (event: JetElementCustomEvent<ToggleValue>) => {
        setTooltipDisplay(event.detail.value ?? 'on');
    };
    const handleDataCollisionValueChanged = (event: JetElementCustomEvent<DataLabelCollision>) => {
        setDataCollisionValue(event.detail.value ?? 'none');
    };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => (<oj-chart-item x={item.data.x} y={item.data.y} label={`${item.data.series} - ${item.data.group}`} groupId={[item.data.group]} seriesId={item.data.series}/>);
    const ojChartProps: Partial<ComponentProps<'oj-chart'>> = {
        styleDefaults: {
            dataLabelPosition: labelPosition,
            dataLabelCollision: dataCollisionValue,
            hideOverlappingLabels: hideOverlappingValue,
            resolveLabelOverlap: resolveLabelOverlap
        },
        valueFormats: {
            label: {
                tooltipDisplay: tooltipDisplay
            }
        }
    };
    return (<div id="chart-container">
      <div class="oj-panel oj-bg-neutral-30">
        <oj-form-layout aria-controls="scatterChart">
          <demo-select-enum id="labelPositionId" labelHint="Data Label Position" value={labelPosition} onvalueChanged={handleLabelPositionValueChanged} enumValues={["auto","center","aboveMarker","belowMarker","beforeMarker","afterMarker","none"]}/>
        </oj-form-layout>
        <oj-form-layout aria-controls="scatterChart" columns={2}>
          <demo-radioset-enum direction="row" labelHint="Resolve Label Ovelap" id="resolveLabelOverlap" value={resolveLabelOverlap} onvalueChanged={handleResolveLabelOverlapValueChanged} enumValues={["on","off"]}/>
          <demo-radioset-enum direction="row" labelHint="Hide Overlapping Labels" id="hideOverlappingValue" value={hideOverlappingValue} onvalueChanged={handleHideOverlappingValueChanged} enumValues={["on","off"]}/>
          <demo-radioset-enum direction="row" labelHint="Label Display in Tooltip" id="labelTooltipDisplay" value={tooltipDisplay} onvalueChanged={handleTooltipDisplayValueChanged} enumValues={["on","off"]}/>
          <demo-radioset-enum direction="row" labelHint="Plot Area Collision Avoidance" id="dataCollisionValue" value={dataCollisionValue} onvalueChanged={handleDataCollisionValueChanged} enumValues={["none","fitInBounds"]}/>
        </oj-form-layout>
      </div>

      <oj-chart id="scatterChart" type="scatter" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" class="demo-scatterchart-datalabels-style" {...ojChartProps}>
        <template slot="itemTemplate" render={itemTemplateRenderer}/>
      </oj-chart>
    </div>);
};
export default ScatterChartDataLabels;

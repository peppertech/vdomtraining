import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojtoolbar';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as quarterDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ChartType = 'area' | 'bar' | 'combo' | 'line' | 'lineWithArea';
type StackableChartType = Exclude<ChartType, 'line'>;
type DataCursor = NonNullable<ComponentProps<'oj-chart'>['dataCursor']>;
type DataCursorBehavior = NonNullable<ComponentProps<'oj-chart'>['dataCursorBehavior']>;
type QuarterDatum = {
    id: number;
    quarter: string;
    series: string;
    value: number;
};
type ItemTemplateContext = {
    data: QuarterDatum;
};

const quarterData = JSON.parse(quarterDataText as string) as QuarterDatum[];

export const ChartDataCursor = () => {
    const [stackValue, setStackValue] = useState<ChartStack>('off');
    const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
    const [dataCursorValue, setDataCursorValue] = useState<DataCursor>('on');
    const [dataCursorBehaviorValue, setDataCursorBehaviorValue] = useState<DataCursorBehavior>('snap');
    const [chartTypeValue, setChartTypeValue] = useState<ChartType>('area');
    const disableControls = chartTypeValue === 'line' || dataCursorValue === 'off';
    const stackControlType: StackableChartType | null = chartTypeValue === 'line' ? null : chartTypeValue;

    const dataProvider = useMemo(() => new ArrayDataProvider(quarterData, {
        keyAttributes: 'id'
    }), []);

    const handleChartTypeValueValueChanged = (event: JetElementCustomEvent<ChartType>) => {
        setChartTypeValue(event.detail.value);
    };

    const handleDataCursorValueValueChanged = (event: JetElementCustomEvent<DataCursor>) => {
        setDataCursorValue(event.detail.value);
    };

    const handleDataCursorBehaviorValueValueChanged = (event: JetElementCustomEvent<DataCursorBehavior>) => {
        setDataCursorBehaviorValue(event.detail.value);
    };

    const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
        setOrientationValue(event.detail.value);
    };

    const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
        setStackValue(event.detail.value);
    };

    const itemTemplateRenderer = (item: ItemTemplateContext) => {
        return <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series}/>;
    };

    return (
        <div id="chart-container">
            <oj-form-layout maxColumns={2} aria-controls="chart">
                <demo-radioset-enum direction="row" labelHint="Chart Type" onvalueChanged={handleChartTypeValueValueChanged} value={chartTypeValue} enumValues={["area", "bar", "combo", "line", "lineWithArea"]} />
                <demo-radioset-enum labelHint="Data Cursor" onvalueChanged={handleDataCursorValueValueChanged} value={dataCursorValue} direction="row" enumValues={["auto", "on", "off"]} />
                <demo-radioset-enum direction="row" labelHint="Data Cursor Behavior" onvalueChanged={handleDataCursorBehaviorValueValueChanged} value={dataCursorBehaviorValue} disabled={disableControls} enumValues={["smooth", "snap"]} />
            </oj-form-layout>
            <oj-chart id="chart" type={chartTypeValue} data={dataProvider} dataCursor={dataCursorValue} dataCursorBehavior={dataCursorBehaviorValue} animationOnDisplay="auto" animationOnDataChange="auto" orientation={orientationValue} stack={stackValue}>
                <template slot="itemTemplate" render={itemTemplateRenderer} />
            </oj-chart>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="chart">
                <demo-chart-orientation-control id="orientationControl" type={chartTypeValue} focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                {stackControlType ? <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" /> : null}
                {stackControlType ? <demo-chart-stack-control id="stackControl" type={stackControlType} focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue} /> : null}
            </oj-toolbar>
        </div>
    );
};

export default ChartDataCursor;

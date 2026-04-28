import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojchart';
import 'ojs/ojinputnumber';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';

type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ChartSplitDualY = ComponentProps<'oj-chart'>['splitDualY'];
type SplitterPosition = ComponentProps<'oj-input-number'>['value'];
type BarChartItem = {
    id: number;
    group: string;
    series: string;
    value: number;
};
type ItemTemplateContext = {
    data: BarChartItem;
};
type SeriesTemplateContext = {
    index: number;
};

const data = JSON.parse(dataText as string) as BarChartItem[];
const toOptionalNumber = (value: SplitterPosition): number | undefined => value ?? undefined;

export const BarChartDualY = () => {
    const [stackValue, setStackValue] = useState<ChartStack>('on');
    const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
    const [dualY, setDualY] = useState<ChartSplitDualY>('off');
    const [splitterValue, setSplitterValue] = useState<SplitterPosition>(0.5);

    const dataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'id'
    }), []);
    const splitterDisabled = dualY === 'off';

    const handleDualYValueChanged = (event: JetElementCustomEvent<ChartSplitDualY>) => {
        setDualY(event.detail.value);
    };

    const handleSplitterValueValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
        setSplitterValue(event.detail.value);
    };

    const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
        setOrientationValue(event.detail.value);
    };

    const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
        setStackValue(event.detail.value);
    };

    const itemTemplateRenderer = (item: ItemTemplateContext) => {
        return <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };

    const seriesTemplateRenderer = (series: SeriesTemplateContext) => {
        return <oj-chart-series assignedToY2={series.index === 1 || series.index === 3 ? 'on' : 'off'}/>;
    };

    const ojChartProps: Partial<ComponentProps<'oj-chart'>> = { legend: {
            position: "top"
        }, yAxis: {
            title: "Y1 Axis Title"
        }, y2Axis: {
            title: "Y2 Axis Title"
        } };

    return (<div id="chart-container">
            <oj-form-layout aria-controls="barChart">
                    <demo-radioset-enum direction="row" labelHint="Split Dual Y" onvalueChanged={handleDualYValueChanged} value={dualY} enumValues={["on", "off"]}/>
                    <oj-input-number labelHint="Splitter Position" max={1} min={0} step={0.1} disabled={splitterDisabled} onvalueChanged={handleSplitterValueValueChanged} value={splitterValue}/>
                </oj-form-layout>
            <oj-chart id="barChart" type="bar" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" orientation={orientationValue} stack={stackValue} splitDualY={dualY} splitterPosition={toOptionalNumber(splitterValue)} {...ojChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                    <template slot="seriesTemplate" render={seriesTemplateRenderer}/>
                </oj-chart>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="barChart">
                    <demo-chart-orientation-control id="orientationControl" type="bar" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue}/>
                    <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator"/>
                    <demo-chart-stack-control id="stackControl" type="bar" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue}/>
                </oj-toolbar>
        </div>);
};

export default BarChartDualY;

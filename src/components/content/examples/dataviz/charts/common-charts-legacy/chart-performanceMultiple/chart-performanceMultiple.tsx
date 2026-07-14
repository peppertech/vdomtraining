import "css!./demo.css";
import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojbutton';
import 'ojs/ojchart';
import * as Context from 'ojs/ojcontext';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojtoolbar';
import 'preact';
import type { ComponentProps } from 'preact';
import { useEffect,useMemo,useState } from 'preact/hooks';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import '../../../../../../jet-composites/demo-select-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type NumberValueChangedEvent = JetElementCustomEvent<ComponentProps<'oj-input-number'>['value']>;
type ChartType = NonNullable<ComponentProps<'oj-chart'>['type']>;
interface ChartData {
    id: string;
    seriesId: string;
    groupId: string[];
    value: number;
    x?: number;
    y?: number;
    z?: number;
}
interface ChartConfig {
    id: string;
    chartType: ChartType;
    shapedValue: 'on' | 'off';
    dataProvider: ArrayDataProvider<ChartData['id'], ChartData>;
}
const generateChartData = (numGroups: number, numSeries: number, chartType: ChartType) => {
    const data: ChartData[] = [];
    for (let s = 0; s < numSeries; s++) {
        for (let g = 0; g < numGroups; g++) {
            const item: ChartData = {
                id: `s${s}-g${g}`,
                seriesId: `Series ${s + 1}`,
                groupId: [`Group ${g + 1}`],
                value: (Math.random() * 200) / (s + 1)
            };
            if (chartType === 'scatter' || chartType === 'bubble') {
                item.x = Math.random() * 200;
                item.y = Math.random() * 200;
                item.z = Math.random() * 200;
            }
            data.push(item);
        }
    }
    return new ArrayDataProvider<ChartData['id'], ChartData>(data, {
        keyAttributes: 'id'
    });
};
const buildChartList = (numCharts: number, numGroups: number, numSeries: number, chartType: ChartType, shapedValue: 'on' | 'off') => {
    return Array.from({ length: numCharts }, (_unused: unknown, index: number) => ({
        id: `chart-${index + 1}`,
        chartType,
        shapedValue,
        dataProvider: generateChartData(numGroups, numSeries, chartType)
    }));
};
export const ChartPerformanceMultiple = () => {
    const [numCharts, setNumCharts] = useState<number>(4);
    const [numSeries, setNumSeries] = useState<number>(5);
    const [numGroups, setNumGroups] = useState<number>(10);
    const [chartType, setChartType] = useState<ChartType>('bar');
    const [shapedValue, setShapedValue] = useState<'on' | 'off'>('on');
    const [axisDisplayValue, setAxisDisplayValue] = useState<'on' | 'off'>('on');
    const [animationValue, setAnimationValue] = useState<'auto' | 'none'>('auto');
    const [indicatorValue, setIndicatorValue] = useState<'all' | 'none'>('none');
    const [timeValue, setTimeValue] = useState<number>(0);
    const [chartList, setChartList] = useState<ChartConfig[]>(() => buildChartList(4, 10, 5, 'bar', 'on'));
    const animationIndicatorValueDisabled = animationValue === 'none';
    const timerText = timeValue > 0 ? `Time:  ${timeValue}ms` : '';
    const axisDataValue = useMemo(() => axisDisplayValue === 'on'
        ? {}
        : { rendered: 'off' as const, tickLabel: { rendered: 'off' as const }, axisLine: { rendered: 'off' as const }, majorTick: { rendered: 'off' as const } }, [axisDisplayValue]);
    const styleDefaultValue = useMemo(() => ({ animationIndicators: indicatorValue }), [indicatorValue]);
    const legendOffChartProps: Partial<ComponentProps<'oj-chart'>> = { legend: {
            rendered: 'off'
        } };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item value={item.data.value} groupId={item.data.groupId} seriesId={item.data.seriesId} x={item.data.x} y={item.data.y} z={item.data.z}/>;
    };
    const handleNumChartsValueChanged = (event: NumberValueChangedEvent) => {
        setNumCharts(event.detail.value ?? 1);
    };
    const handleNumSeriesValueChanged = (event: NumberValueChangedEvent) => {
        setNumSeries(event.detail.value ?? 1);
    };
    const handleNumGroupsValueChanged = (event: NumberValueChangedEvent) => {
        setNumGroups(event.detail.value ?? 1);
    };
    const handleShapedValueValueChanged = (event: JetElementCustomEvent<'on' | 'off'>) => {
        setShapedValue(event.detail.value);
    };
    const handleChartTypeValueChanged = (event: JetElementCustomEvent<ChartType>) => {
        setChartType(event.detail.value ?? 'bar');
    };
    const handleAxisDisplayValueChanged = (event: JetElementCustomEvent<'on' | 'off'>) => {
        setAxisDisplayValue(event.detail.value);
    };
    const handleAnimationValueChanged = (event: JetElementCustomEvent<'auto' | 'none'>) => {
        setAnimationValue(event.detail.value);
    };
    const handleIndicatorValueChanged = (event: JetElementCustomEvent<'all' | 'none'>) => {
        setIndicatorValue(event.detail.value);
    };
    const refreshData = () => {
        setTimeValue(0);
        const start = Date.now();
        setChartList(buildChartList(numCharts, numGroups, numSeries, chartType, shapedValue));
        Context.getPageContext().getBusyContext().whenReady().then(() => {
            setTimeValue(Date.now() - start);
        });
    };
    const renderChart = (current: ChartConfig) => (current.shapedValue === 'on' ? (<oj-chart key={`${current.id}-shaped`} id="chart" type={current.chartType} data={current.dataProvider} stack="on" animationOnDisplay={animationValue} animationOnDataChange={animationValue} xAxis={axisDataValue} yAxis={axisDataValue} styleDefaults={styleDefaultValue} class="oj-sm-padding-1x demo-performance-multiple-chart oj-sm-float-start" aria-label="Data visualization chart used for performance testing with multiple chart instances" {...legendOffChartProps}/>) : (<oj-chart key={`${current.id}-templated`} id="chart2" type={current.chartType} data={current.dataProvider} stack="on" animationOnDisplay={animationValue} animationOnDataChange={animationValue} xAxis={axisDataValue} yAxis={axisDataValue} styleDefaults={styleDefaultValue} class="oj-sm-padding-1x demo-performance-multiple-chart oj-sm-float-start" aria-label="Data visualization chart used for performance testing with multiple chart instances" {...legendOffChartProps}>
                <template slot="itemTemplate" render={itemTemplateRenderer}/>
            </oj-chart>));
    useEffect(() => {
        refreshData();
    }, [numCharts, numGroups, numSeries, chartType, shapedValue]);
    return (<div id="chart-container">
            <oj-toolbar chroming="outlined">
                <oj-button id="updateButton" aria-controls="chart chart2" onojAction={refreshData}>Regenerate Data</oj-button>
                <p class="bold" id="timerText">{timerText}</p>
            </oj-toolbar>
            <oj-form-layout maxColumns={2} aria-controls="chart chart2">
                <oj-input-number labelHint="Number of Instances" value={numCharts} min={1} step={1} onvalueChanged={handleNumChartsValueChanged}/>
                <oj-input-number value={numSeries} min={1} step={1} labelHint="Series" onvalueChanged={handleNumSeriesValueChanged}/>
                <oj-input-number labelHint="Groups" value={numGroups} min={1} step={1} onvalueChanged={handleNumGroupsValueChanged}/>
                <demo-radioset-enum labelHint="Shaped Data" direction="row" onvalueChanged={handleShapedValueValueChanged} value={shapedValue} enumValues={["on", "off"]}/>
                <demo-select-enum labelHint="Chart Type" onvalueChanged={handleChartTypeValueChanged} value={chartType} enumValues={["bar", "area", "line", "combo", "scatter", "bubble", "pie", "funnel"]}/>
                <demo-radioset-enum labelHint="Axis & Labels" value={axisDisplayValue} direction="row" onvalueChanged={handleAxisDisplayValueChanged} enumValues={["on", "off"]}/>
                <demo-radioset-enum direction="row" labelHint="Animation" value={animationValue} onvalueChanged={handleAnimationValueChanged} enumValues={["auto", "none"]}/>
                <demo-radioset-enum labelHint="Animation Indicators" value={indicatorValue} direction="row" onvalueChanged={handleIndicatorValueChanged} disabled={animationIndicatorValueDisabled} enumValues={["all", "none"]}/>
            </oj-form-layout>
            <br />
            {chartList.map(renderChart)}
        </div>);
};
export default ChartPerformanceMultiple;

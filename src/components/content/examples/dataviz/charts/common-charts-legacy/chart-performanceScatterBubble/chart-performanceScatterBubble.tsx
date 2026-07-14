import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojbutton';
import 'ojs/ojchart';
import * as Context from 'ojs/ojcontext';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'preact';
import type { ComponentProps } from 'preact';
import { useEffect,useMemo,useState } from 'preact/hooks';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type ValueChangedEvent<TValue> = JetElementCustomEvent<TValue>;
type NumberValueChangedEvent = JetElementCustomEvent<ComponentProps<'oj-input-number'>['value']>;
interface ScatterBubbleItem {
    id: string;
    seriesId: string;
    groupId: string[];
    x: number;
    y: number;
    z: number;
}
const generateRandomData = (numGroups: number, numSeries: number) => {
    const data: ScatterBubbleItem[] = [];
    for (let s = 0; s < numSeries; s++) {
        for (let g = 0; g < numGroups; g++) {
            data.push({
                id: `s${s}-g${g}`,
                seriesId: `Series ${s + 1}`,
                groupId: [`Group ${g + 1}`],
                x: Math.random() * 200,
                y: Math.random() * 200,
                z: Math.random()
            });
        }
    }
    return new ArrayDataProvider(data, { keyAttributes: 'id' });
};
export const ChartPerformanceScatterBubble = () => {
    const [chartType, setChartType] = useState<'bubble' | 'scatter'>('bubble');
    const [animationValue, setAnimationValue] = useState<'auto' | 'none'>('auto');
    const [indicatorValue, setIndicatorValue] = useState<'all' | 'none'>('none');
    const [timeValue, setTimeValue] = useState<number>(0);
    const [shapedValue, setShapedValue] = useState<'on' | 'off'>('on');
    const [numGroups, setNumGroups] = useState<number>(10);
    const [numSeries, setNumSeries] = useState<number>(5);
    const [dataProvider, setDataProvider] = useState<ReturnType<typeof generateRandomData>>(() => generateRandomData(10, 5));
    const styleData = useMemo(() => ({ animationIndicators: indicatorValue }), [indicatorValue]);
    const legendOffChartProps: Partial<ComponentProps<'oj-chart'>> = { legend: {
            rendered: 'off'
        } };
    const animationIndicatorDisabled = animationValue !== 'auto';
    const userText = `Data Items:  ${numGroups * numSeries}`;
    const timerText = timeValue > 0 ? `Time:  ${timeValue}ms` : '';
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item groupId={item.data.groupId} seriesId={item.data.seriesId} x={item.data.x} y={item.data.y} z={item.data.z}/>;
    };
    const handleShapedValueValueChanged = (event: ValueChangedEvent<'on' | 'off'>) => {
        setShapedValue(event.detail.value);
    };
    const handleChartTypeValueChanged = (event: ValueChangedEvent<'bubble' | 'scatter'>) => {
        setChartType(event.detail.value);
    };
    const handleAnimationValueValueChanged = (event: ValueChangedEvent<'auto' | 'none'>) => {
        setAnimationValue(event.detail.value);
    };
    const handleIndicatorValueValueChanged = (event: ValueChangedEvent<'all' | 'none'>) => {
        setIndicatorValue(event.detail.value);
    };
    const handleNumSeriesValueChanged = (event: NumberValueChangedEvent) => {
        setNumSeries(event.detail.value ?? 1);
    };
    const handleNumGroupsValueChanged = (event: NumberValueChangedEvent) => {
        setNumGroups(event.detail.value ?? 1);
    };
    const refreshData = () => {
        setTimeValue(0);
        const start = Date.now();
        setDataProvider(generateRandomData(numGroups, numSeries));
        Context.getPageContext().getBusyContext().whenReady().then(() => {
            setTimeValue(Date.now() - start);
        });
    };
    useEffect(() => {
        refreshData();
    }, [numGroups, numSeries]);
    return (<div id="chart-container">
            <div class="oj-flex oj-sm-padding-2x-bottom">
                <div class="oj-flex-item">
                    <oj-button id="updateButton" onojAction={refreshData} aria-controls="chart chart2">Regenerate Data</oj-button>
                </div>
                <div class="oj-flex-item oj-sm-margin-1x-top"><p class="bold" id="userText">{userText}</p></div>
                <div class="oj-flex-item oj-sm-margin-1x-top"><p class="bold" id="timerText">{timerText}</p></div>
            </div>
            <oj-form-layout maxColumns={2} aria-controls="chart chart2">
                <oj-input-number labelHint="Series" value={numSeries} min={1} step={1} onvalueChanged={handleNumSeriesValueChanged}/>
                <oj-input-number labelHint="Groups" value={numGroups} min={1} step={1} onvalueChanged={handleNumGroupsValueChanged}/>
                <demo-radioset-enum labelHint="Shaped Data" onvalueChanged={handleShapedValueValueChanged} value={shapedValue} enumValues={["on", "off"]} direction="row"/>
                <demo-radioset-enum labelHint="Type" onvalueChanged={handleChartTypeValueChanged} value={chartType} enumValues={["bubble", "scatter"]} direction="row"/>
                <demo-radioset-enum labelHint="Animation" onvalueChanged={handleAnimationValueValueChanged} value={animationValue} enumValues={["auto", "none"]} direction="row"/>
                <demo-radioset-enum labelHint="Animation Indicators" onvalueChanged={handleIndicatorValueValueChanged} value={indicatorValue} direction="row" disabled={animationIndicatorDisabled} enumValues={["all", "none"]}/>
            </oj-form-layout>
            {shapedValue === 'on' ? (<oj-chart id="chart" type={chartType} data={dataProvider} animationOnDisplay={animationValue} animationOnDataChange={animationValue} styleDefaults={styleData} aria-label="Data visualization chart used for performance testing with scatter and bubble chart instances" {...legendOffChartProps}/>) : null}
            {shapedValue === 'off' ? (<oj-chart id="chart2" type={chartType} data={dataProvider} animationOnDisplay={animationValue} animationOnDataChange={animationValue} styleDefaults={styleData} aria-label="Data visualization chart used for performance testing with scatter and bubble chart instances" {...legendOffChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-chart>) : null}
        </div>);
};
export default ChartPerformanceScatterBubble;

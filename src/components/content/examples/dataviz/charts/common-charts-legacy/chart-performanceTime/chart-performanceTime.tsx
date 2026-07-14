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
interface TimeChartItem {
    id: string;
    seriesId: string;
    groupId: string[];
    value: number;
}
const generateRandomData = (start: number, interval: number, numGroups: number, numSeries: number) => {
    const data: TimeChartItem[] = [];
    for (let s = 0; s < numSeries; s++) {
        for (let g = 0; g < numGroups; g++) {
            const time = new Date(start + g * interval).toISOString();
            data.push({
                id: `s${s}-g${g}`,
                seriesId: `Series ${s + 1}`,
                groupId: [time],
                value: (Math.random() * 200) / (s + 1)
            });
        }
    }
    return new ArrayDataProvider(data, { keyAttributes: 'id' });
};
export const ChartPerformanceTime = () => {
    const [animationValue, setAnimationValue] = useState<'auto' | 'none'>('auto');
    const [chartType, setChartType] = useState<'bar' | 'area' | 'line' | 'combo'>('bar');
    const [indicatorValue, setIndicatorValue] = useState<'all' | 'none'>('none');
    const [timeValue, setTimeValue] = useState<number>(0);
    const [shapedValue, setShapedValue] = useState<'on' | 'off'>('on');
    const [numSeries, setNumSeries] = useState<number>(5);
    const [numGroups, setNumGroups] = useState<number>(10);
    const [dataProvider, setDataProvider] = useState<ReturnType<typeof generateRandomData>>(() => generateRandomData(new Date(2014, 6, 1).getTime(), 1000 * 60 * 60 * 24 * 7, 10, 5));
    const styleData = useMemo(() => ({ animationIndicators: indicatorValue }), [indicatorValue]);
    const legendOffChartProps: Partial<ComponentProps<'oj-chart'>> = { legend: {
            rendered: 'off'
        } };
    const animationIndicatorValueDisabled = animationValue !== 'auto';
    const userText = `Data Items:  ${numGroups * numSeries}`;
    const timerText = timeValue > 0 ? `Time:  ${timeValue}ms` : '';
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item groupId={item.data.groupId} seriesId={item.data.seriesId} value={item.data.value}/>;
    };
    const handleShapedValueValueChanged = (event: ValueChangedEvent<'on' | 'off'>) => {
        setShapedValue(event.detail.value);
    };
    const handleChartTypeValueChanged = (event: ValueChangedEvent<'bar' | 'area' | 'line' | 'combo'>) => {
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
        setDataProvider(generateRandomData(new Date(2014, 6, 1).getTime(), 1000 * 60 * 60 * 24 * 7, numGroups, numSeries));
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
                    <oj-button id="updateButton" onojAction={refreshData}>Regenerate Data</oj-button>
                </div>
                <div class="oj-flex-item oj-sm-margin-1x-top"><p class="bold" id="userText">{userText}</p></div>
                <div class="oj-flex-item oj-sm-margin-1x-top"><p class="bold" id="timerText">{timerText}</p></div>
            </div>
            <oj-form-layout aria-controls="chart chart2" maxColumns={2}>
                <oj-input-number id="input-number-id-series" labelHint="Series" value={numSeries} min={1} step={1} onvalueChanged={handleNumSeriesValueChanged}/>
                <oj-input-number id="inputnumber-id" labelHint="Groups" value={numGroups} min={1} step={1} onvalueChanged={handleNumGroupsValueChanged}/>
                <demo-radioset-enum direction="row" labelHint="Shaped Data" onvalueChanged={handleShapedValueValueChanged} value={shapedValue} enumValues={["on", "off"]}/>
                <demo-radioset-enum direction="row" labelHint="Type" onvalueChanged={handleChartTypeValueChanged} value={chartType} enumValues={["bar", "area", "line", "combo"]}/>
                <demo-radioset-enum direction="row" labelHint="Animation" onvalueChanged={handleAnimationValueValueChanged} value={animationValue} enumValues={["auto", "none"]}/>
                <demo-radioset-enum disabled={animationIndicatorValueDisabled} labelHint="Animation Indicators" direction="row" onvalueChanged={handleIndicatorValueValueChanged} value={indicatorValue} enumValues={["all", "none"]}/>
            </oj-form-layout>
            {shapedValue === 'on' ? (<oj-chart id="chart" type={chartType} data={dataProvider} stack="on" timeAxisType="enabled" animationOnDisplay={animationValue} animationOnDataChange={animationValue} styleDefaults={styleData} aria-label="Data visualization chart used for performance testing with multiple chart instances" {...legendOffChartProps}/>) : null}
            {shapedValue === 'off' ? (<oj-chart id="chart2" type={chartType} data={dataProvider} stack="on" timeAxisType="enabled" animationOnDisplay={animationValue} animationOnDataChange={animationValue} styleDefaults={styleData} aria-label="Data visualization chart used for performance testing with multiple chart instances" {...legendOffChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-chart>) : null}
        </div>);
};
export default ChartPerformanceTime;

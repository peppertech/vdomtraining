import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as Context from 'ojs/ojcontext';
import 'ojs/ojbutton';
import 'ojs/ojchart';
import 'ojs/ojinputnumber';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import 'ojs/ojformlayout';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type NumberValueChangedEvent = JetElementCustomEvent<ComponentProps<'oj-input-number'>['value']>;
type ChartType = NonNullable<ComponentProps<'oj-chart'>['type']>;
type AnimationValue = 'auto' | 'none';
type IndicatorValue = 'all' | 'none';
type ShapedDataValue = 'on' | 'off';
type ChartDatum = {
    id: string;
    seriesId: string;
    groupId: string[];
    value: number;
};
type ItemTemplateContext = {
    data: ChartDatum;
};

const generateRandomData = (numSeries: number, numGroups: number): ChartDatum[] => {
    const data: ChartDatum[] = [];
    for (let s = 0; s < numSeries; s++) {
        for (let g = 0; g < numGroups; g++) {
            const id = `id${s}-${g}`;
            const randomValue = (Math.random() * 200) / (s + 1);
            data.push({
                id,
                seriesId: `Series ${s + 1}`,
                groupId: [`Group ${g + 1}`],
                value: randomValue
            });
        }
    }
    return data;
};

export const ChartPerformanceCategorical = () => {
    const [chartType, setChartType] = useState<ChartType>('bar');
    const [animationValue, setAnimationValue] = useState<AnimationValue>('auto');
    const [indicatorValue, setIndicatorValue] = useState<IndicatorValue>('none');
    const [timeValue, setTimeValue] = useState<number>(0);
    const [shapedData, setShapedData] = useState<ShapedDataValue>('on');
    const [numSeries, setNumSeries] = useState<number>(5);
    const [numGroups, setNumGroups] = useState<number>(10);
    const [chartItems, setChartItems] = useState<ChartDatum[]>(() => generateRandomData(5, 10));

    const dataProvider = useMemo(() => new ArrayDataProvider(chartItems, {
        keyAttributes: 'id'
    }), [chartItems]);
    const styleData = useMemo(() => ({ animationIndicators: indicatorValue }), [indicatorValue]);
    const legendOffChartProps: Partial<ComponentProps<'oj-chart'>> = { legend: {
            rendered: 'off'
        } };
    const animationIndicatorDisabled = animationValue === 'none';
    const userText = `Data Items:  ${numGroups * numSeries}`;
    const timerText = timeValue > 0 ? `Time:  ${timeValue}ms` : '';

    const itemTemplateRenderer = (item: ItemTemplateContext) => {
        return <oj-chart-item value={item.data.value} groupId={item.data.groupId} seriesId={item.data.seriesId}/>;
    };

    const handleShapedDataValueChanged = (event: JetElementCustomEvent<ShapedDataValue>) => {
        setShapedData(event.detail.value);
    };

    const handleChartTypeValueChanged = (event: JetElementCustomEvent<ChartType>) => {
        setChartType(event.detail.value);
    };

    const handleAnimationValueValueChanged = (event: JetElementCustomEvent<AnimationValue>) => {
        setAnimationValue(event.detail.value);
    };

    const handleIndicatorValueValueChanged = (event: JetElementCustomEvent<IndicatorValue>) => {
        setIndicatorValue(event.detail.value);
    };

    const handleNumSeriesValueChanged = (event: NumberValueChangedEvent) => {
        setNumSeries(event.detail.value ?? 1);
    };

    const handleNumGroupsValueChanged = (event: NumberValueChangedEvent) => {
        setNumGroups(event.detail.value ?? 1);
    };

    const updateData = (seriesCount: number, groupCount: number) => {
        setTimeValue(0);
        const busyContext = Context.getPageContext().getBusyContext();
        const start = Date.now();
        setChartItems(generateRandomData(seriesCount, groupCount));
        busyContext.whenReady().then(() => {
            setTimeValue(Date.now() - start);
        });
    };

    const refreshData = () => {
        updateData(numSeries, numGroups);
    };

    return (<div id="chart-container">
            <div class="oj-flex oj-sm-padding-2x-bottom">
                <div class="oj-flex-item">
                    <oj-button id="updateButton" aria-controls="chart1 chart2" onojAction={refreshData}>Regenerate Data</oj-button>
                </div>
                <div class="oj-flex-item oj-sm-margin-1x-top"><p class="bold" id="userText">{userText}</p></div>
                <div class="oj-flex-item oj-sm-margin-1x-top"><p class="bold" id="timerText">{timerText}</p></div>
            </div>
            <oj-form-layout aria-controls="chart1 chart2" maxColumns={2}>
                <oj-input-number labelHint="Series" value={numSeries} min={1} max={100} step={1} onvalueChanged={handleNumSeriesValueChanged}/>
                <oj-input-number labelHint="Groups" value={numGroups} min={1} step={1} onvalueChanged={handleNumGroupsValueChanged}/>
                <demo-radioset-enum labelHint="ShapedData" direction="row" onvalueChanged={handleShapedDataValueChanged} value={shapedData} enumValues={["on", "off"]}/>
                <demo-radioset-enum labelHint="Type" onvalueChanged={handleChartTypeValueChanged} value={chartType} direction="row" enumValues={["bar", "area", "line", "combo"]}/>
                <demo-radioset-enum direction="row" labelHint="Animation" onvalueChanged={handleAnimationValueValueChanged} value={animationValue} enumValues={["auto", "none"]}/>
                <demo-radioset-enum labelHint="Animation Indicators" onvalueChanged={handleIndicatorValueValueChanged} value={indicatorValue} direction="row" disabled={animationIndicatorDisabled} enumValues={["all", "none"]}/>
            </oj-form-layout>
            {shapedData === 'off' ? (<oj-chart id="chart1" type={chartType} data={dataProvider} stack="on" animationOnDisplay={animationValue} animationOnDataChange={animationValue} styleDefaults={styleData} aria-label="Performance test chart showing how different chart types render varying numbers of series and groups." {...legendOffChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-chart>) : null}
            {shapedData === 'on' ? (<oj-chart id="chart2" type={chartType} data={dataProvider} stack="on" animationOnDisplay={animationValue} animationOnDataChange={animationValue} styleDefaults={styleData} aria-label="Performance test chart when shaped data is provided to show how different chart types render varying numbers of series and groups." {...legendOffChartProps}/>) : null}
        </div>);
};

export default ChartPerformanceCategorical;

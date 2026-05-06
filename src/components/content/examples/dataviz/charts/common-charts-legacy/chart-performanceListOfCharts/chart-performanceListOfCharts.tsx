import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as Context from 'ojs/ojcontext';
import 'ojs/ojlistview';
import 'ojs/ojinputnumber';
import 'ojs/ojpagingcontrol';
import 'ojs/ojchart';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import 'ojs/ojformlayout';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import "css!./demo.css";
type NumberValueChangedEvent = JetElementCustomEvent<ComponentProps<'oj-input-number'>['value']>;
type ScrollPolicyValue = NonNullable<ComponentProps<'oj-list-view'>['scrollPolicy']>;
type ShapedValue = 'on' | 'off';
type ChartType = 'bar' | 'line' | 'pie';
type ChartDatum = {
    id: string;
    seriesId: string;
    groupId: string[];
    value: number;
};
type ChartListItem = {
    id: number;
    title: string;
    type: ChartType;
    dataProvider: ArrayDataProvider<ChartDatum['id'], ChartDatum>;
    shapedValue: ShapedValue;
};
export const ChartPerformanceListOfCharts = () => {
    const [scrollPolicyValue, setScrollPolicyValue] = useState<ScrollPolicyValue>('loadMoreOnScroll');
    const [shapedValue, setShapedValue] = useState<ShapedValue>('on');
    const [timeValue, setTimeValue] = useState<number>(0);
    const [numItems, setNumItems] = useState<number>(50);
    const [dataSource, setDataSource] = useState<ArrayDataProvider<ChartListItem['id'], ChartListItem>>(new ArrayDataProvider<ChartListItem['id'], ChartListItem>([], { keyAttributes: 'id' }));
    const scrollPolicyOptionsConfig: ComponentProps<'oj-list-view'>['scrollPolicyOptions'] = { fetchSize: 10, maxCount: 10000 };
    const legendOffChartProps: Partial<ComponentProps<'oj-chart'>> = { legend: {
            rendered: 'off'
        } };
    const timerText = timeValue > 0 ? `Time:  ${timeValue}ms` : '';
    const handleShapedValueValueChanged = (event: JetElementCustomEvent<ShapedValue>) => {
        setShapedValue(event.detail.value);
    };
    const handleScrollPolicyValueValueChanged = (event: JetElementCustomEvent<ScrollPolicyValue>) => {
        setScrollPolicyValue(event.detail.value);
    };
    const handleNumItemsValueChanged = (event: NumberValueChangedEvent) => {
        setNumItems(event.detail.value ?? 10);
    };
    const generateChartData = (numSeries: number, numGroups: number): ArrayDataProvider<ChartDatum['id'], ChartDatum> => {
        const data: ChartDatum[] = [];
        for (let i = 0; i < numSeries; i++) {
            for (let j = 0; j < numGroups; j++) {
                data.push({
                    id: `s${i}-g${j}`,
                    seriesId: `Series ${i + 1}`,
                    groupId: [String.fromCharCode('A'.charCodeAt(0) + j)],
                    value: Math.round(Math.random() * 100)
                });
            }
        }
        return new ArrayDataProvider(data, { keyAttributes: 'id' });
    };
    const generateData = (count: number, nextShapedValue: ShapedValue): ChartListItem[] => {
        const data: ChartListItem[] = [];
        for (let i = 0; i < count; i++) {
            let type: ChartType;
            let chartData: ArrayDataProvider<ChartDatum['id'], ChartDatum>;
            if (i % 3 === 0) {
                type = 'bar';
                chartData = generateChartData(5, 10);
            }
            else if (i % 3 === 1) {
                type = 'line';
                chartData = generateChartData(2, 25);
            }
            else {
                type = 'pie';
                chartData = generateChartData(12, 1);
            }
            data.push({
                id: i,
                title: `Chart ${i + 1}`,
                type,
                dataProvider: chartData,
                shapedValue: nextShapedValue
            });
        }
        return data;
    };
    const measureTime = () => {
        setTimeValue(0);
        const start = Date.now();
        const busyContext = Context.getPageContext().getBusyContext();
        busyContext.whenReady().then(() => {
            setTimeValue(Date.now() - start);
        });
    };
    const updateData = () => {
        setDataSource(new ArrayDataProvider(generateData(numItems, shapedValue), {
            keyAttributes: 'id'
        }));
        measureTime();
    };
    const chartItemTemplateRenderer = (item: any) => {
        return <oj-chart-item groupId={item.data.groupId} seriesId={item.data.seriesId} value={item.data.value}/>;
    };
    const listItemTemplateRenderer = ($current: any) => {
        return <li id={$current.data.id} class="demo-chart-card">
                <strong>{$current.data.title}</strong>
                {$current.data.shapedValue === 'on' ? (<oj-chart type={$current.data.type} data={$current.data.dataProvider} aria-label="Chart displaying data relationships visually with shaped data." {...legendOffChartProps}/>) : null}
                {$current.data.shapedValue === 'off' ? (<oj-chart type={$current.data.type} data={$current.data.dataProvider} aria-label="Chart displaying data relationships visually." {...legendOffChartProps}>
                        <template slot="itemTemplate" render={chartItemTemplateRenderer}/>
                    </oj-chart>) : null}
            </li>;
    };
    useEffect(() => {
        updateData();
    }, [numItems, shapedValue]);
    return (<div id="listview-container">
            <oj-form-layout aria-controls="listview" maxColumns={2}>
                <oj-input-number labelHint="Number of Charts" min={10} step={10} value={numItems} onvalueChanged={handleNumItemsValueChanged}/>
                <demo-radioset-enum onvalueChanged={handleShapedValueValueChanged} value={shapedValue} labelHint="Shaped Data" direction="row" enumValues={["on", "off"]}/>
                <demo-radioset-enum onvalueChanged={handleScrollPolicyValueValueChanged} value={scrollPolicyValue} direction="row" labelHint="Scroll Policy" enumValues={["loadMoreOnScroll", "loadAll"]}/>
                <div class="oj-sm-margin-1x-top"><p class="bold" id="timerText">{timerText}</p></div>
            </oj-form-layout>
            <oj-list-view id="listview" aria-label="performance test for charts in list view" display="card" class="demo-performance-list-view" data={dataSource} scrollPolicy={scrollPolicyValue} scrollPolicyOptions={scrollPolicyOptionsConfig}>
                <template slot="itemTemplate" render={listItemTemplateRenderer}/>
            </oj-list-view>
        </div>);
};
export default ChartPerformanceListOfCharts;

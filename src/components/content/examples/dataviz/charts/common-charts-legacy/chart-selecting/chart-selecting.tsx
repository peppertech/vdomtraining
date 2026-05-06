import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import * as bubbleDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/commonCategoriesBubbleData.json';
import * as timeSeriesDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/commonCategoriesTimeSeriesData.json';
import { ojChart } from 'ojs/ojchart';
import 'ojs/ojlegend';
import 'ojs/ojchart';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import "css!./demo.css";
interface BubbleDatum {
    id: number;
    x: number;
    y: number;
    z: number;
    group: string;
    series: string;
    text: string;
}
interface TimeSeriesDatum {
    id: number;
    value: number;
    group: string;
    series: string;
}
type ChartSelection = NonNullable<ComponentProps<'oj-chart'>['selection']>;
type ChartSelectionChangedEvent = Parameters<NonNullable<ComponentProps<'oj-chart'>['onselectionChanged']>>[0];
type BubbleSelectInputEvent = ojChart.ojSelectInput<string, BubbleDatum, null>;
type TimeSeriesSelectInputEvent = ojChart.ojSelectInput<string, TimeSeriesDatum, null>;
type LegendItemTemplateContext = {
    data: BubbleDatum;
};
type BubbleItemTemplateContext = {
    data: BubbleDatum;
};
type TimeSeriesItemTemplateContext = {
    data: TimeSeriesDatum;
};
const bubbleData = JSON.parse(bubbleDataText as string) as BubbleDatum[];
const timeSeriesData = JSON.parse(timeSeriesDataText as string) as TimeSeriesDatum[];
export const ChartSelecting = () => {
    const selected = useMemo(() => [0, 1, 2, 3, 4], []);
    const [selectedItemsValue, setSelectedItemsValue] = useState<ChartSelection>(selected);
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const data = bubbleData;
    const legendData = data.filter((item, index) => {
        return index % 5 === 0; // discard all rows with duplicate series fields
    });
    const legendDataProvider = useMemo(() => new ArrayDataProvider<BubbleDatum['text'], BubbleDatum>(legendData, {
        keyAttributes: 'text'
    }), [legendData]);
    const bubbleDataProvider = useMemo(() => new ArrayDataProvider<BubbleDatum['id'], BubbleDatum>(data, {
        keyAttributes: 'id'
    }), [data]);
    const timeSeriesDataProvider = useMemo(() => new ArrayDataProvider<TimeSeriesDatum['id'], TimeSeriesDatum>(timeSeriesData, {
        keyAttributes: 'id'
    }), []);
    const handleSelectedItemsValueSelectionChanged = (event: ChartSelectionChangedEvent) => {
        setSelectedItemsValue(event.detail.value ?? []);
    };
    const syncSelection = (items: ChartSelection, chartIds: string[]) => {
        chartIds.forEach((chartId) => {
            const chart = document.getElementById(chartId) as ojChart<string, BubbleDatum | TimeSeriesDatum, null, null> | null;
            if (chart) {
                chart.selection = items;
            }
        });
    };
    const scatterSelectInput = (event: BubbleSelectInputEvent) => {
        syncSelection(event.detail.items, ['bubbleChart', 'barChart', 'areaChart']);
    };
    const bubbleSelectInput = (event: BubbleSelectInputEvent) => {
        syncSelection(event.detail.items, ['scatterChart', 'barChart', 'areaChart']);
    };
    const barSelectInput = (event: TimeSeriesSelectInputEvent) => {
        syncSelection(event.detail.items, ['scatterChart', 'bubbleChart', 'areaChart']);
    };
    const areaSelectInput = (event: TimeSeriesSelectInputEvent) => {
        syncSelection(event.detail.items, ['scatterChart', 'bubbleChart', 'barChart']);
    };
    const itemTemplateRenderer = ($current: LegendItemTemplateContext) => {
        return <oj-legend-item text={$current.data.series} color={colorHandler.getValue($current.data.series)} shortDesc={$current.data.series}/>;
    };
    const OjChartProps: Partial<ComponentProps<'oj-chart'>> = { legend: {
            rendered: "off"
        } };
    const itemTemplateRenderer2 = (item: BubbleItemTemplateContext) => {
        return <oj-chart-item x={item.data.x} y={item.data.y} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    const OjChartProps2: Partial<ComponentProps<'oj-chart'>> = { legend: {
            rendered: "off"
        } };
    const itemTemplateRenderer3 = (item: BubbleItemTemplateContext) => {
        return <oj-chart-item x={item.data.x} y={item.data.y} z={item.data.z} categories={[item.data.series]} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    const OjChartProps3: Partial<ComponentProps<'oj-chart'>> = { legend: {
            rendered: "off"
        } };
    const itemTemplateRenderer4 = (item: TimeSeriesItemTemplateContext) => {
        return <oj-chart-item value={item.data.value} categories={[item.data.series]} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    const OjChartProps4: Partial<ComponentProps<'oj-chart'>> = { legend: {
            rendered: "off"
        } };
    const itemTemplateRenderer5 = (item: TimeSeriesItemTemplateContext) => {
        return <oj-chart-item value={item.data.value} categories={[item.data.series]} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    return (<div id="chart-container">
            <oj-legend id="legend1" orientation="horizontal" data={legendDataProvider} halign="center" class="demo-selecting-legend-height">
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-legend>
            <div class="oj-sm-odd-cols-12 oj-md-odd-cols-6">
                    <div class="oj-flex">
                              <oj-chart class="oj-flex-item" id="scatterChart" type="scatter" data={bubbleDataProvider} animationOnDisplay="auto" animationOnDataChange="auto" selectionMode="multiple" onselectionChanged={handleSelectedItemsValueSelectionChanged} selection={selectedItemsValue} onojSelectInput={scatterSelectInput} {...OjChartProps}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer2}/>
                                      </oj-chart>
                              <oj-chart class="oj-flex-item" id="bubbleChart" type="bubble" data={bubbleDataProvider} animationOnDisplay="auto" animationOnDataChange="auto" selectionMode="multiple" onselectionChanged={handleSelectedItemsValueSelectionChanged} selection={selectedItemsValue} onojSelectInput={bubbleSelectInput} {...OjChartProps2}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer3}/>
                                      </oj-chart>
                          </div>
                    <div class="oj-flex">
                              <oj-chart class="oj-flex-item" id="barChart" type="bar" data={timeSeriesDataProvider} animationOnDisplay="auto" animationOnDataChange="auto" selectionMode="multiple" onselectionChanged={handleSelectedItemsValueSelectionChanged} selection={selectedItemsValue} onojSelectInput={barSelectInput} {...OjChartProps3}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer4}/>
                                      </oj-chart>
                              <oj-chart class="oj-flex-item" id="areaChart" type="area" data={timeSeriesDataProvider} stack="on" animationOnDisplay="auto" animationOnDataChange="auto" selectionMode="multiple" onselectionChanged={handleSelectedItemsValueSelectionChanged} selection={selectedItemsValue} onojSelectInput={areaSelectInput} {...OjChartProps4}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer5}/>
                                      </oj-chart>
                          </div>
                </div>
        </div>);
};
export default ChartSelecting;

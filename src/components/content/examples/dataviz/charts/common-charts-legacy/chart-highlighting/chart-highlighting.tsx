import "css!./demo.css";
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojchart';
import 'ojs/ojlegend';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as bubbleDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/commonCategoriesBubbleData.json';
import * as singleGroupDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/commonCategoriesSingleGroupData.json';
import * as timeSeriesDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/commonCategoriesTimeSeriesData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
interface SingleGroupItem {
    id: string;
    series: string;
    group: string;
    value: number;
    text?: string;
}
interface TimeSeriesItem {
    id: string;
    series: string;
    group: string;
    value: number;
}
interface BubbleItem {
    id: string;
    series: string;
    group: string;
    x: number;
    y: number;
    z: number;
}
type HighlightedCategoriesChangedEvent = Parameters<NonNullable<ComponentProps<'oj-chart'>['onhighlightedCategoriesChanged']>>[0];
const singleGroupData = JSON.parse(singleGroupDataText as string) as SingleGroupItem[];
const timeSeriesData = JSON.parse(timeSeriesDataText as string) as TimeSeriesItem[];
const bubbleData = JSON.parse(bubbleDataText as string) as BubbleItem[];
export const ChartHighlighting = () => {
    const data = useMemo<SingleGroupItem[]>(() => singleGroupData, []);
    const [highlightedCategoriesValue, setHighlightedCategoriesValue] = useState<string[]>(() => [data[0].series]);
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const singleGroupDataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'id'
    }), [data]);
    const timeSeriesDataProvider = useMemo(() => new ArrayDataProvider(timeSeriesData, {
        keyAttributes: 'id'
    }), []);
    const bubbleDataProvider = useMemo(() => new ArrayDataProvider(bubbleData, {
        keyAttributes: 'id'
    }), []);
    const legendDataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'text'
    }), [data]);
    const handleHighlightedCategoriesValueHighlightedCategoriesChanged = (event: HighlightedCategoriesChangedEvent) => {
        setHighlightedCategoriesValue(event.detail.value ?? []);
    };
    const itemTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-legend-item text={$current.data.series} color={colorHandler.getValue($current.data.series)} shortDesc={'Highlight: ' + $current.data.series} categories={[$current.data.series]}/>;
    };
    const OjChartProps: Partial<ComponentProps<'oj-chart'>> = { legend: {
            rendered: "off"
        } };
    const itemTemplateRenderer2 = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item value={item.data.value} categories={[item.data.series]} color={colorHandler.getValue(item.data.series)} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    const OjChartProps2: Partial<ComponentProps<'oj-chart'>> = { legend: {
            rendered: "off"
        } };
    const itemTemplateRenderer3 = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item x={item.data.x} y={item.data.y} z={item.data.z} categories={[item.data.series]} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    const OjChartProps3: Partial<ComponentProps<'oj-chart'>> = { legend: {
            rendered: "off"
        } };
    const itemTemplateRenderer4 = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item value={item.data.value} categories={[item.data.series]} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    const OjChartProps4: Partial<ComponentProps<'oj-chart'>> = { legend: {
            rendered: "off"
        } };
    const itemTemplateRenderer5 = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item value={item.data.value} categories={[item.data.series]} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    const OjChartProps5: Partial<ComponentProps<'oj-chart'>> = { legend: {
            rendered: "off"
        } };
    const itemTemplateRenderer6 = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item value={item.data.value} categories={[item.data.series]} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    const OjChartProps6: Partial<ComponentProps<'oj-chart'>> = { legend: {
            rendered: "off"
        } };
    const itemTemplateRenderer7 = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item value={item.data.value} categories={[item.data.series]} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    return (<div id="chart-container">
            <oj-legend class="demo-highlighting-legend-height" id="legend1" aria-controls="barChart1 bubbleChart barChart2 areaChart pieChart funnelChart" orientation="horizontal" data={legendDataProvider} halign="center" onhighlightedCategoriesChanged={handleHighlightedCategoriesValueHighlightedCategoriesChanged} highlightedCategories={highlightedCategoriesValue} hoverBehavior="dim">
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-legend>
            <div class="oj-sm-odd-cols-12 oj-md-odd-cols-6">
                    <div class="oj-flex">
                              <oj-chart class="oj-flex-item" id="barChart" type="bar" data={singleGroupDataProvider} animationOnDisplay="auto" animationOnDataChange="auto" onhighlightedCategoriesChanged={handleHighlightedCategoriesValueHighlightedCategoriesChanged} highlightedCategories={highlightedCategoriesValue} hoverBehavior="dim" {...OjChartProps}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer2}/>
                                      </oj-chart>
                              <oj-chart class="oj-flex-item" id="bubbleChart" type="bubble" data={bubbleDataProvider} animationOnDisplay="auto" animationOnDataChange="auto" onhighlightedCategoriesChanged={handleHighlightedCategoriesValueHighlightedCategoriesChanged} highlightedCategories={highlightedCategoriesValue} hoverBehavior="dim" {...OjChartProps2}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer3}/>
                                      </oj-chart>
                          </div>
                    <div class="oj-flex">
                              <oj-chart class="oj-flex-item" id="barChart2" type="bar" data={timeSeriesDataProvider} animationOnDisplay="auto" animationOnDataChange="auto" onhighlightedCategoriesChanged={handleHighlightedCategoriesValueHighlightedCategoriesChanged} highlightedCategories={highlightedCategoriesValue} hoverBehavior="dim" {...OjChartProps3}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer4}/>
                                      </oj-chart>
                              <oj-chart id="areaChart" type="area" class="oj-flex-item" data={timeSeriesDataProvider} stack="on" animationOnDisplay="auto" animationOnDataChange="auto" onhighlightedCategoriesChanged={handleHighlightedCategoriesValueHighlightedCategoriesChanged} highlightedCategories={highlightedCategoriesValue} hoverBehavior="dim" {...OjChartProps4}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer5}/>
                                      </oj-chart>
                          </div>
                    <div class="oj-flex">
                              <oj-chart id="pieChart" class="oj-flex-item" type="pie" data={singleGroupDataProvider} animationOnDisplay="auto" animationOnDataChange="auto" onhighlightedCategoriesChanged={handleHighlightedCategoriesValueHighlightedCategoriesChanged} highlightedCategories={highlightedCategoriesValue} hoverBehavior="dim" {...OjChartProps5}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer6}/>
                                      </oj-chart>
                              <oj-chart id="funnelChart" type="funnel" class="oj-flex-item" data={singleGroupDataProvider} orientation="horizontal" animationOnDisplay="auto" animationOnDataChange="none" onhighlightedCategoriesChanged={handleHighlightedCategoriesValueHighlightedCategoriesChanged} highlightedCategories={highlightedCategoriesValue} hoverBehavior="dim" {...OjChartProps6}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer7}/>
                                      </oj-chart>
                          </div>
                </div>
        </div>);
};
export default ChartHighlighting;

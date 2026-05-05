import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as stockDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/stockTwoYearsData.json';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import { ojChart } from 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojchart';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
type ChartSelection = ComponentProps<'oj-chart'>['selection'];
type ChartSelectionMode = ComponentProps<'oj-chart'>['selectionMode'];
type StockSeriesType = 'auto' | 'area' | 'bar' | 'candlestick' | 'line' | 'lineWithArea';
type StockChartItem = {
    id: number;
    group: number;
    series: string;
    open: number;
    close: number;
    high: number;
    low: number;
    volume: number;
};
const stockData = JSON.parse(stockDataText as string) as StockChartItem[];
export const StockChartSelection = () => {
    const selected = useMemo(() => [487, 493, 494], []);
    const [selectedItemsValue, setSelectedItemsValue] = useState<ChartSelection>(selected);
    const [selectionEventInfo, setSelectionEventInfo] = useState<string>('');
    const yAxisConverter = useMemo(() => new IntlNumberConverter({ style: 'currency', currency: 'USD' }), []);
    const [seriesTypeValue, setSeriesTypeValue] = useState<StockSeriesType>('auto');
    const [selectionValue, setSelectionValue] = useState<ChartSelectionMode>('multiple');
    const viewportMinValue = stockData[480]?.group;
    const dataProvider = useMemo(() => new ArrayDataProvider(stockData, {
        keyAttributes: 'id'
    }), []);
    const idToItemMap = useMemo<Record<number, StockChartItem>>(() => stockData.reduce<Record<number, StockChartItem>>((accumulator, item) => {
        accumulator[item.id] = item;
        return accumulator;
    }, {}), []);
    const selectionInfo = () => {
        let items = '';
        const selection = selectedItemsValue ?? [];
        if (selection.length > 0) {
            items += 'items:\n';
            for (let i = 0; i < selection.length; i++) {
                const id = selection[i];
                const item = idToItemMap[id];
                if (item) {
                    const date = new Date(+`${item.group}`);
                    items += `${date.getDate()} ${date.toString().split(' ')[1]} ${date.getFullYear()}\n`;
                }
            }
            items += selectionEventInfo;
        }
        return items.trim();
    };
    const handleSelectionValueValueChanged = (event: JetElementCustomEvent<ChartSelectionMode>) => {
        setSelectionValue(event.detail.value);
    };
    const handleSeriesTypeValueValueChanged = (event: JetElementCustomEvent<StockSeriesType>) => {
        setSeriesTypeValue(event.detail.value);
    };
    const selectionListener = (event: ojChart.selectionChanged<number, Record<number, string | number>, null, null>) => {
        setSelectedItemsValue(event.detail['value'] ?? []);
    };
    const itemTemplateRenderer = (item: any) => {
        return <oj-chart-item open={item.data.open} close={item.data.close} high={item.data.high} low={item.data.low} volume={item.data.volume} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    const seriesTemplateRenderer = (series: any) => {
        return <oj-chart-series type={seriesTypeValue}/>;
    };
    const ojChartProps: Partial<ComponentProps<'oj-chart'>> = { xAxis: {
            viewportMin: viewportMinValue
        }, yAxis: {
            tickLabel: {
                converter: yAxisConverter
            }
        }, legend: {
            rendered: "off"
        } };
    return (<div id="chart-container">
            <oj-form-layout aria-controls="barChart">
                    <demo-radioset-enum direction="row" onvalueChanged={handleSelectionValueValueChanged} value={selectionValue} enumValues={["none", "single", "multiple"]} labelHint="Selection"/>
                </oj-form-layout>
            <oj-chart id="stockChart" type="stock" data={dataProvider} zoomAndScroll="live" selectionMode={selectionValue} selection={selectedItemsValue} hideAndShowBehavior="withRescale" onselectionChanged={selectionListener} class="oj-sm-margin-4x-bottom" {...ojChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                    <template slot="seriesTemplate" render={seriesTemplateRenderer}/>
                </oj-chart>
            <demo-radioset-enum id="basicSelect" direction="row" labelHint="Series Type" aria-controls="stockChart" onvalueChanged={handleSeriesTypeValueValueChanged} value={seriesTypeValue} enumValues={["auto", "area", "bar", "candlestick", "line", "lineWithArea"]}/>
            <div>
                    <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Selection</div>
                    <div style={{ whiteSpace: 'pre-line' }}>{selectionInfo()}</div>
                </div>
        </div>);
};
export default StockChartSelection;

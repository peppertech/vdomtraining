import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as stockDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/stockTwoYearsData.json';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import { ojChart } from 'ojs/ojchart';
import 'ojs/ojchart';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
type TimePeriod = '1 Week' | '1 Month' | '3 Month' | 'Max';
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
const twoYearData = JSON.parse(stockDataText as string) as StockChartItem[];
const currentTime = 1427486400000;
const getDateText = (time?: number) => {
    if (!time) {
        return '';
    }
    const date = new Date(time);
    return `${date.getDate()} ${date.toString().split(' ')[1]} ${date.getFullYear()}`;
};
const findClosestGroup = (array: StockChartItem[], time: number) => {
    let low = 0;
    let high = array.length;
    while (high - low > 1) {
        const mid = Math.round((low + high) / 2);
        if (array[mid].group <= time) {
            low = mid;
        }
        else {
            high = mid;
        }
    }
    return low;
};
const getIntervalMinFromValue = (value: TimePeriod) => {
    if (value === '1 Week') {
        return twoYearData[495].group;
    }
    if (value === '1 Month') {
        return twoYearData[480].group;
    }
    if (value === '3 Month') {
        return twoYearData[438].group;
    }
    return twoYearData[0].group;
};
export const StockChartDefault = () => {
    const [seriesTypeValue, setSeriesTypeValue] = useState<StockSeriesType>('auto');
    const [intervalValue, setIntervalValue] = useState<TimePeriod>('3 Month');
    const [viewportMinValue, setViewportMinValue] = useState<number>(twoYearData[438].group);
    const [intervalMin, setIntervalMin] = useState<number>(twoYearData[438].group);
    const [intervalMax, setIntervalMax] = useState<number>(currentTime);
    const dataProvider = useMemo(() => new ArrayDataProvider(twoYearData, {
        keyAttributes: 'id'
    }), []);
    const yAxisConverter = useMemo(() => new IntlNumberConverter({ style: 'currency', currency: 'USD' }), []);
    const percentChangeNum = useMemo(() => {
        const startIndex = findClosestGroup(twoYearData, intervalMin);
        const endIndex = findClosestGroup(twoYearData, intervalMax);
        const startClose = twoYearData[startIndex].close;
        const endClose = twoYearData[endIndex].close;
        return Math.round(((endClose - startClose) / startClose) * 10000) / 100;
    }, [intervalMax, intervalMin]);
    const trendColor = useMemo(() => percentChangeNum > 0
        ? 'var(--oj-chart-stock-rising-bg-color)'
        : 'var(--oj-chart-stock-falling-bg-color)', [percentChangeNum]);
    const ledRotation = useMemo(() => (percentChangeNum > 0 ? 0 : 180), [percentChangeNum]);
    const currentText = useMemo(() => `${getDateText(intervalMin)} - ${getDateText(intervalMax)}`, [intervalMax, intervalMin]);
    const percentChange = useMemo(() => `${percentChangeNum}%`, [percentChangeNum]);
    const xAxis = useMemo(() => ({ viewportMin: viewportMinValue }), [viewportMinValue]);
    const handleIntervalValueChanged = (event: JetElementCustomEvent<TimePeriod>) => {
        const nextInterval = event.detail.value;
        const nextViewportMin = getIntervalMinFromValue(nextInterval);
        setIntervalValue(nextInterval);
        setViewportMinValue(nextViewportMin);
        setIntervalMin(nextViewportMin);
        setIntervalMax(currentTime);
    };
    const handleSeriesTypeValueChanged = (event: JetElementCustomEvent<StockSeriesType>) => {
        setSeriesTypeValue(event.detail.value);
    };
    const handleViewportChange = (event: ojChart.ojViewportChange) => {
        setIntervalMin(event.detail.xMin);
        setIntervalMax(event.detail.xMax);
    };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => (<oj-chart-item open={item.data.open} close={item.data.close} high={item.data.high} low={item.data.low} volume={item.data.volume} groupId={[item.data.group]} seriesId={item.data.series}/>);
    const seriesTemplateRenderer = () => <oj-chart-series type={seriesTypeValue}/>;
    const chartProps: Partial<ComponentProps<'oj-chart'>> = {
        'hideAndShowBehavior': 'withRescale',
        'dataCursor': 'on',
        'zoomAndScroll': 'live',
        overview: {
            rendered: 'on'
        },
        legend: {
            rendered: 'off'
        },
        yAxis: {
            tickLabel: {
                converter: yAxisConverter
            }
        }
    };
    return (<div id="chart-container">
      <div class="oj-typography-heading-md oj-helper-text-align-center">
        Fake Corporation (NYSE:FAKE)
      </div>
      <div class="oj-flex oj-sm-flex-items-initial oj-sm-margin-4x-bottom oj-sm-align-items-center">
        <demo-radioset-enum direction="row" labelHint="Time Period" id="radioButtonset" aria-controls="stockChart" value={intervalValue} onvalueChanged={handleIntervalValueChanged} class="oj-flex-item" enumValues={["1 Week", "1 Month", "3 Month", "Max"]}/>
        <div class="oj-helper-margin-start-auto oj-flex oj-flex-item oj-sm-align-items-center">
          <span class="oj-typography-bold oj-flex-item oj-sm-padding-2x-end">{currentText}</span>
          <span class="oj-typography-bold oj-flex-item oj-sm-padding-2x-end" style={{ color: trendColor }}>
            {percentChange}
          </span>
          <span class={`${ledRotation === 0 ? 'oj-ux-ico-triangle-up-s' : 'oj-ux-ico-triangle-down-s'} oj-typography-body-xl`} style={{ color: trendColor }}/>
        </div>
      </div>

      <oj-chart id="stockChart" type="stock" data={dataProvider} xAxis={xAxis} onojViewportChange={handleViewportChange} class="oj-sm-width-full" {...chartProps}>
        <template slot="itemTemplate" render={itemTemplateRenderer}/>
        <template slot="seriesTemplate" render={seriesTemplateRenderer}/>
      </oj-chart>

      <demo-radioset-enum id="basicSelect" direction="row" labelHint="Series Type" aria-controls="stockChart" value={seriesTypeValue} onvalueChanged={handleSeriesTypeValueChanged} class="oj-sm-margin-4x-top" enumValues={["auto", "area", "bar", "candlestick", "line", "lineWithArea"]}/>
    </div>);
};
export default StockChartDefault;

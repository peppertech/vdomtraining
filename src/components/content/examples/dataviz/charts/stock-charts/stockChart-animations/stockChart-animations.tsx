import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojbutton';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
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
const dayInMs = 1000 * 60 * 60 * 24;
const initialCurrentTime = 1427486400000;
const getDateText = (time: number) => {
    const date = new Date(time);
    return `${date.getDate()} ${date.toString().split(' ')[1]} ${date.getFullYear()}`;
};
const generateGroups = (start: number, interval: number, numGroups: number) => {
    const groups: number[] = [];
    for (let index = 0; index < numGroups; index += 1) {
        if (index % 7 !== 5 && index % 7 !== 6) {
            groups.push(start + index * interval);
        }
    }
    return groups;
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
export const StockChartAnimations = () => {
    const currentTimeRef = useRef(initialCurrentTime);
    const groupsRef = useRef(generateGroups(initialCurrentTime - dayInMs * 347, dayInMs, 350));
    const dataCacheRef = useRef<Record<number, StockChartItem>>({});
    const generateStockData = (groups: number[], firstOpen: number, useCache: any = true) => {
        const items: StockChartItem[] = [];
        for (let index = 0; index < groups.length; index += 1) {
            const group = groups[index];
            let item = dataCacheRef.current[group];
            if (!item || !useCache) {
                if (index === 0) {
                    item = {
                        id: 0,
                        series: 'FAKE',
                        group,
                        open: firstOpen,
                        close: Math.random() * 5 + firstOpen,
                        high: 202,
                        low: 199,
                        volume: 1000000
                    };
                }
                else {
                    const previousClose = items[index - 1].close;
                    const close = previousClose + Math.random() * 5 * Math.pow(-1, Math.round(Math.random()));
                    const high = Math.max(previousClose, close) + Math.random() * 2;
                    const low = Math.min(previousClose, close) - Math.random() * 2;
                    item = {
                        id: index,
                        series: 'FAKE',
                        group,
                        open: previousClose,
                        close,
                        high,
                        low,
                        volume: 1000000 + Math.random() * 10000000
                    };
                }
                dataCacheRef.current[group] = item;
            }
            else {
                item = { ...item, id: index };
            }
            items.push(item);
        }
        return items;
    };
    const [seriesTypeValue, setSeriesTypeValue] = useState<StockSeriesType>('auto');
    const [stockData, setStockData] = useState<StockChartItem[]>(() => generateStockData(groupsRef.current, 200));
    const [currentTime, setCurrentTime] = useState<number>(initialCurrentTime);
    const [viewportMinValue] = useState<number>(() => stockData[200].group);
    const dataProvider = useMemo(() => new ArrayDataProvider(stockData, {
        keyAttributes: 'id'
    }), [stockData]);
    const yAxisConverter = useMemo(() => new IntlNumberConverter({ style: 'currency', currency: 'USD' }), []);
    const percentChangeNum = useMemo(() => {
        const startIndex = findClosestGroup(stockData, viewportMinValue);
        const endIndex = findClosestGroup(stockData, currentTime);
        const startClose = stockData[startIndex].close;
        const endClose = stockData[endIndex].close;
        return Math.round(((endClose - startClose) / startClose) * 10000) / 100;
    }, [currentTime, stockData, viewportMinValue]);
    const trendColor = useMemo(() => percentChangeNum > 0
        ? 'var(--oj-chart-stock-rising-bg-color)'
        : 'var(--oj-chart-stock-falling-bg-color)', [percentChangeNum]);
    const ledRotation = useMemo(() => (percentChangeNum > 0 ? 0 : 180), [percentChangeNum]);
    const currentText = useMemo(() => `${getDateText(viewportMinValue)} - ${getDateText(currentTime)}`, [currentTime, viewportMinValue]);
    const percentChange = useMemo(() => `${percentChangeNum}%`, [percentChangeNum]);
    const handleSeriesTypeValueChanged = (event: any) => {
        setSeriesTypeValue(event.detail.value);
    };
    const seriesDataChange = () => {
        dataCacheRef.current = {};
        setStockData(generateStockData(groupsRef.current, 200, false));
    };
    const seriesDataAddRemove = () => {
        if (stockData.length <= 250) {
            const nextCurrentTime = currentTimeRef.current + 45 * dayInMs;
            const additionalGroups = generateGroups(currentTimeRef.current + 3 * dayInMs, dayInMs, 42);
            groupsRef.current = groupsRef.current.concat(additionalGroups);
            currentTimeRef.current = nextCurrentTime;
            setCurrentTime(nextCurrentTime);
            setStockData(generateStockData(groupsRef.current, 200));
            return;
        }
        const nextGroups = [...groupsRef.current];
        nextGroups.splice(250, 30);
        groupsRef.current = nextGroups;
        const nextCurrentTime = currentTimeRef.current - 45 * dayInMs;
        currentTimeRef.current = nextCurrentTime;
        setCurrentTime(nextCurrentTime);
        setStockData(generateStockData(groupsRef.current, 200));
    };
    const itemTemplateRenderer = (item: any) => (<oj-chart-item open={item.data.open} close={item.data.close} high={item.data.high} low={item.data.low} volume={item.data.volume} groupId={[item.data.group]} seriesId={item.data.series}/>);
    const seriesTemplateRenderer = () => <oj-chart-series type={seriesTypeValue}/>;
    const chartProps: Partial<ComponentProps<'oj-chart'>> = {
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
        },
        xAxis: {
            viewportMin: viewportMinValue
        },
        styleDefaults: {
            animationIndicators: 'none'
        }
    };
    return (<div id="chart-container">
      <div class="oj-flex oj-sm-flex-items-initial oj-sm-margin-4x-bottom oj-sm-align-items-center">
        <oj-toolbar chroming="outlined" aria-label="Button Controls Toolbar" aria-controls="stockChart">
          <oj-button id="button1" onojAction={seriesDataChange}>
            Update values
          </oj-button>
          <oj-button id="button2" onojAction={seriesDataAddRemove}>
            Add/Remove Series Data Items
          </oj-button>
        </oj-toolbar>
        <div class="oj-helper-margin-start-auto oj-flex oj-flex-item oj-sm-align-items-center">
          <span class="oj-typography-bold oj-flex-item oj-sm-padding-2x-end">{currentText}</span>
          <span class="oj-typography-bold oj-flex-item oj-sm-padding-2x-end" style={{ color: trendColor }}>
            {percentChange}
          </span>
          <span class={`${ledRotation === 0 ? 'oj-ux-ico-triangle-up-s' : 'oj-ux-ico-triangle-down-s'} oj-typography-body-xl`} style={{ color: trendColor }}/>
        </div>
      </div>

      <oj-chart id="stockChart" type="stock" animation-on-display="auto" animation-on-data-change="auto" data={dataProvider} class="oj-sm-margin-4x-bottom oj-sm-width-full" {...chartProps}>
        <template slot="itemTemplate" render={itemTemplateRenderer}/>
        <template slot="seriesTemplate" render={seriesTemplateRenderer}/>
      </oj-chart>

      <demo-radioset-enum id="basicSelect" direction="row" labelHint="Series Type" aria-controls="stockChart" value={seriesTypeValue} onvalueChanged={handleSeriesTypeValueChanged} enumValues={["auto", "area", "bar", "candlestick", "line", "lineWithArea"]}/>
    </div>);
};
export default StockChartAnimations;

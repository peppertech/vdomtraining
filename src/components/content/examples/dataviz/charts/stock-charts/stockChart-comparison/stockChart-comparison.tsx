// @ts-nocheck
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as stockDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/stockTwoYearsData.json';
import * as dowJonesDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/stockDowJonesData.json';
import * as nasdaqDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/stockNASDAQData.json';
import * as sp500DataText from 'text!../data/cookbook/dataVisualizations/chart/resources/stockSP500Data.json';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import { ojChart } from 'ojs/ojchart';
import 'ojs/ojchart';
import 'ojs/ojcheckboxset';
import '../../../../../../jet-composites/demo-radioset-enum/loader';

type StockSeriesType = 'auto' | 'area' | 'bar' | 'candlestick' | 'line' | 'lineWithArea';
type CompareValue = 'dj' | 'nasdaq' | 'sandp';
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

type ReferenceObject = {
  name: string;
  color: string;
  type: string;
  items: number[];
};

const twoYearData = JSON.parse(stockDataText as string) as StockChartItem[];
const stockData = twoYearData.slice(200);

const comparisonSources: Record<CompareValue, ReferenceObject> = {
  dj: {
    name: 'Dow Jones',
    color: '#8561C8',
    type: 'line',
    items: JSON.parse(dowJonesDataText as string)
  },
  nasdaq: {
    name: 'NASDAQ',
    color: '#008000',
    type: 'line',
    items: JSON.parse(nasdaqDataText as string)
  },
  sandp: {
    name: 'S&P 500',
    color: '#ff9900',
    type: 'line',
    items: JSON.parse(sp500DataText as string)
  }
};

const findClosestGroup = (array: StockChartItem[], time: string | number) => {
  let low = 0;
  let high = array.length;
  while (high - low > 1) {
    const mid = Math.round((low + high) / 2);
    if (array[mid].group <= Number(time)) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return low;
};

const buildComparisonData = (startTime: number, compareList: CompareValue[]) => {
  const startIndex = findClosestGroup(stockData, startTime);
  const startClose = stockData[startIndex].close;
  const referenceObjects = compareList.map((key) => {
    const source = comparisonSources[key];
    const startReference = source.items[startIndex];
    return {
      ...source,
      items: source.items.map((item) => (item - startReference) / startReference)
    };
  });

  const transformedStockData = stockData.map((item) => ({
    ...item,
    open: (item.open - startClose) / startClose,
    close: (item.close - startClose) / startClose,
    high: (item.high - startClose) / startClose,
    low: (item.low - startClose) / startClose
  }));

  return { transformedStockData, referenceObjects };
};

export const StockChartComparison = () => {
  const [seriesTypeValue, setSeriesTypeValue] = useState<StockSeriesType>('auto');
  const [compareListValue, setCompareListValue] = useState<CompareValue[]>(['dj']);
  const [viewportMinValue, setViewportMinValue] = useState<number>(twoYearData[438].group);

  const { transformedStockData, referenceObjects } = useMemo(
    () => buildComparisonData(viewportMinValue, compareListValue),
    [compareListValue, viewportMinValue]
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(transformedStockData, {
        keyAttributes: 'id'
      }),
    [transformedStockData]
  );
  const yAxisConverter = useMemo(() => new IntlNumberConverter({ style: 'percent' }), []);

  const tooltipFunction = (dataContext: DatavizTooltipContext<DatavizChartDatum>) => {
    (dataContext.parentElement as HTMLElement).style.borderColor = '#000000';

    const tooltipElem = document.createElement('div');
    const textDiv = document.createElement('div');
    textDiv.style.textAlign = 'center';
    tooltipElem.appendChild(textDiv);

    const dateText = document.createElement('span');
    const date = new Date(Number(dataContext.group));
    dateText.textContent = `${date.getDate()} ${date.toString().split(' ')[1]} ${date.getFullYear()}`;
    dateText.style.fontWeight = 'bold';
    textDiv.appendChild(dateText);
    textDiv.appendChild(document.createElement('br'));

    const table = document.createElement('table');
    textDiv.appendChild(table);

    const appendRow = (name: string, color: string, value: number) => {
      const row = document.createElement('tr');
      table.appendChild(row);

      const colorCell = document.createElement('td');
      row.appendChild(colorCell);
      colorCell.style.backgroundColor = color;
      colorCell.style.backgroundClip = 'padding-box';
      colorCell.style.border = '4px solid transparent';
      colorCell.style.width = '6px';

      const nameCell = document.createElement('td');
      row.appendChild(nameCell);
      const nameText = document.createElement('span');
      nameText.textContent = name;
      nameText.style.cssFloat = 'left';
      nameCell.appendChild(nameText);

      const valueCell = document.createElement('td');
      row.appendChild(valueCell);
      const valueText = document.createElement('span');
      valueText.textContent = `${Math.abs(Math.round(value * 10000) / 100)}%`;
      valueText.style.color =
        value >= 0
          ? 'var(--oj-chart-stock-rising-bg-color)'
          : 'var(--oj-chart-stock-falling-bg-color)';
      valueText.textContent += value >= 0 ? ' ▲' : ' ▼';
      valueText.style.fontStyle = 'italic';
      valueText.style.cssFloat = 'right';
      valueCell.appendChild(valueText);
    };

    appendRow(String(dataContext.series), '#267db3', Number(dataContext.close));

    const groupIndex = findClosestGroup(transformedStockData, Number(dataContext.group));
    referenceObjects.forEach((referenceObject) => {
      appendRow(referenceObject.name, referenceObject.color, referenceObject.items[groupIndex]);
    });

    return { insert: tooltipElem };
  };

  const handleCompareListValueChanged = (
    event: JetElementCustomEvent<ComponentProps<'oj-checkboxset'>['value']>
  ) => {
    setCompareListValue((event.detail.value ?? []) as CompareValue[]);
  };

  const handleSeriesTypeValueChanged = (event: JetElementCustomEvent<StockSeriesType>) => {
    setSeriesTypeValue(event.detail.value);
  };

  const handleViewportChange = (event: ojChart.ojViewportChange) => {
    setViewportMinValue(event.detail.xMin);
  };

  const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => (
    <oj-chart-item
      open={item.data.open}
      close={item.data.close}
      high={item.data.high}
      low={item.data.low}
      volume={item.data.volume}
      groupId={[item.data.group]}
      seriesId={item.data.series}
    />
  );

  const seriesTemplateRenderer = () => <oj-chart-series type={seriesTypeValue} />;

  const chartProps: Partial<ComponentProps<'oj-chart'>> = {
    'legend.rendered': 'off',
    'tooltip.renderer': tooltipFunction,
    'dataCursor': 'on',
    'zoomAndScroll': 'live',
    'hideAndShowBehavior': 'withRescale',
    'xAxis.viewportMin': viewportMinValue,
    'yAxis.referenceObjects': referenceObjects,
    'yAxis.tickLabel.converter': yAxisConverter
  };

  return (
    <div id="chart-container">
      <div class="oj-typography-heading-md oj-helper-text-align-center">
        Fake Corporation (NYSE:FAKE)
      </div>
      <oj-checkboxset
        id="compareCheckboxset"
        aria-controls="stockChart"
        class="oj-choice-direction-row"
        value={compareListValue}
        onvalueChanged={handleCompareListValueChanged}
        labelHint="Compare"
      >
        <oj-option value="dj" style={{ color: comparisonSources.dj.color }}>
          Dow Jones
        </oj-option>
        <oj-option value="nasdaq" style={{ color: comparisonSources.nasdaq.color }}>
          NASDAQ
        </oj-option>
        <oj-option value="sandp" style={{ color: comparisonSources.sandp.color }}>
          S&amp;P 500
        </oj-option>
      </oj-checkboxset>

      <oj-chart
        id="stockChart"
        animation-on-display="auto"
        animation-on-data-change="auto"
        type="stock"
        data={dataProvider}
        onojViewportChange={handleViewportChange}
        class="oj-sm-margin-4x-bottom oj-sm-width-full"
        {...chartProps}
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
        <template slot="seriesTemplate" render={seriesTemplateRenderer} />
      </oj-chart>

      <demo-radioset-enum
        id="basicSelect"
        direction="row"
        labelHint="Series Type"
        aria-controls="stockChart"
        value={seriesTypeValue}
        onvalueChanged={handleSeriesTypeValueChanged}
        enumValues={["auto", "area", "bar", "candlestick", "line", "lineWithArea"]}
      />
    </div>
  );
};

export default StockChartComparison;

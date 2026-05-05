// @ts-nocheck
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as stockDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/stockTwoYearsData.json';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import '../../../../../../jet-composites/demo-input-json/loader';
import '../../../../../../jet-composites/demo-select-enum/loader';
import '../../../../../../jet-composites/demo-tabs/loader';

type CurrentTab = 'stock' | 'series' | 'text' | 'plotArea';
type TickStyle = 'solid' | 'dashed' | 'dotted';
type TickLabelPosition = 'outside' | 'inside';
type ChartTextStyle = {
  fontStyle: string;
  color: string;
};
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
const stockData = twoYearData.slice(470);

export const StockChartStyles = () => {
  const [currentTab, setCurrentTab] = useState<CurrentTab>('stock');
  const [color1, setColor1] = useState('');
  const [borderColor1, setBorderColor1] = useState('#0F3248');
  const [plotAreaColor, setPlotAreaColor] = useState('rgba(255, 255, 255, 0)');
  const [plotAreaBorderColor, setPlotAreaBorderColor] = useState('#000000');
  const [plotAreaBorderWidth, setPlotAreaBorderWidth] = useState(0);
  const [barGapRatio, setBarGapRatio] = useState(0.3);
  const [maxBarWidth, setMaxBarWidth] = useState(25);
  const [stockRisingColor, setStockRisingColor] = useState('#68C182');
  const [stockFallingColor, setStockFallingColor] = useState('#ED6647');
  const [stockRangeColor, setStockRangeColor] = useState('#D3D4D6');
  const [stockVolumeColor, setStockVolumeColor] = useState('#267DB3');
  const [xTitle, setXTitle] = useState('X-Axis Title');
  const [xStyle, setXStyle] = useState<ChartTextStyle>({ fontStyle: 'italic', color: '#6070C7' });
  const [xAxisLineColor, setXAxisLineColor] = useState('#9E9E9E');
  const [xAxisLineWidth, setXAxisLineWidth] = useState(1);
  const [yTitle, setYTitle] = useState('Y-Axis Title');
  const [yStyle, setYStyle] = useState<ChartTextStyle>({ fontStyle: 'italic', color: '#6070C7' });
  const [yMajorTickColor, setYMajorTickColor] = useState('#C4CED7');
  const [yMajorTickWidth, setYMajorTickWidth] = useState(1);
  const [yMajorTickStyle, setYMajorTickStyle] = useState<TickStyle>('solid');
  const [yTickLabelPosition, setYTickLabelPosition] = useState<TickLabelPosition>('outside');
  const [y2Title, setY2Title] = useState('Y2-Axis Title');
  const [y2Style, setY2Style] = useState<ChartTextStyle>({ fontStyle: 'italic', color: '#6070C7' });
  const [y2MajorTickColor, setY2MajorTickColor] = useState('#C4CED7');
  const [y2MajorTickWidth, setY2MajorTickWidth] = useState(1);
  const [y2MajorTickStyle, setY2MajorTickStyle] = useState<TickStyle>('solid');
  const [y2TickLabelPosition, setY2TickLabelPosition] = useState<TickLabelPosition>('outside');

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(stockData, {
        keyAttributes: 'id'
      }),
    []
  );

  const plotArea = useMemo(
    () => ({
      backgroundColor: plotAreaColor,
      borderColor: plotAreaBorderColor,
      borderWidth: plotAreaBorderWidth
    }),
    [plotAreaBorderColor, plotAreaBorderWidth, plotAreaColor]
  );

  const styleDefaults = useMemo(
    () => ({
      barGapRatio,
      maxBarWidth,
      stockRisingColor,
      stockFallingColor,
      stockRangeColor,
      stockVolumeColor
    }),
    [barGapRatio, maxBarWidth, stockFallingColor, stockRangeColor, stockRisingColor, stockVolumeColor]
  );

  const xAxis = useMemo(
    () => ({
      title: xTitle,
      titleStyle: xStyle,
      axisLine: {
        lineColor: xAxisLineColor,
        lineWidth: xAxisLineWidth
      }
    }),
    [xAxisLineColor, xAxisLineWidth, xStyle, xTitle]
  );

  const yAxis = useMemo(
    () => ({
      title: yTitle,
      titleStyle: yStyle,
      majorTick: {
        lineColor: yMajorTickColor,
        lineWidth: yMajorTickWidth,
        lineStyle: yMajorTickStyle
      },
      tickLabel: {
        position: yTickLabelPosition
      }
    }),
    [yMajorTickColor, yMajorTickStyle, yMajorTickWidth, yStyle, yTickLabelPosition, yTitle]
  );

  const y2Axis = useMemo(
    () => ({
      title: y2Title,
      titleStyle: y2Style,
      position: 'start',
      majorTick: {
        lineColor: y2MajorTickColor,
        lineWidth: y2MajorTickWidth,
        lineStyle: y2MajorTickStyle
      },
      tickLabel: {
        position: y2TickLabelPosition
      }
    }),
    [y2MajorTickColor, y2MajorTickStyle, y2MajorTickWidth, y2Style, y2TickLabelPosition, y2Title]
  );

  const handleCurrentTabValueChanged = (event: JetElementCustomEvent<CurrentTab>) => {
    setCurrentTab(event.detail.value);
  };

  const itemTemplateRenderer = (item: any) => (
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

  const seriesTemplateRenderer = () => (
    <oj-chart-series type="candlestick" color={color1} borderColor={borderColor1} />
  );

  return (
    <div id="chart-container" class="oj-flex oj-sm-padding-1x oj-sm-flex-items-1">
      <oj-chart
        id="stockChart"
        type="stock"
        data={dataProvider}
        animation-on-data-change="auto"
        plotArea={plotArea}
        styleDefaults={styleDefaults}
        xAxis={xAxis}
        yAxis={yAxis}
        y2Axis={y2Axis}
        class="oj-flex-item oj-sm-margin-8x-top"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
        <template slot="seriesTemplate" render={seriesTemplateRenderer} />
      </oj-chart>

      <demo-tabs
        class="oj-flex-item"
        headers={[
          {"id":"stock", "label":"Stock Styles"},
          {"id":"series", "label":"Series Styles"},
          {"id":"text", "label":"Text Styles"},
          {"id":"plotArea", "label":"Plot Area Styles"}
        ]}
        value={currentTab}
        onvalueChanged={handleCurrentTabValueChanged}
      >
        <div class="oj-sm-padding-1x">
          <div class="oj-typography-bold oj-sm-margin-2x-vertical">Stock Style Attributes</div>
          <oj-form-layout maxColumns={2} aria-controls="stockChart">
            <oj-input-number
              labelHint="barGapRatio"
              id="barGapRatio"
              value={barGapRatio}
              min={0}
              max={1}
              step={0.1}
              onvalueChanged={(event: any) => setBarGapRatio(event.detail.value ?? 0)}
            />
            <oj-input-number
              labelHint="maxBarWidth"
              min={0}
              id="maxBarWidth"
              value={maxBarWidth}
              onvalueChanged={(event: any) => setMaxBarWidth(event.detail.value ?? 0)}
            />
            <oj-input-text
              labelHint="stockFallingColor"
              id="fallingColor"
              value={stockFallingColor}
              onvalueChanged={(event: any) => setStockFallingColor(event.detail.value ?? '')}
            />
            <oj-input-text
              labelHint="stockRisingColor"
              id="risingColor"
              value={stockRisingColor}
              onvalueChanged={(event: any) => setStockRisingColor(event.detail.value ?? '')}
            />
            <oj-input-text
              labelHint="stockRangeColor"
              id="rangeColor"
              value={stockRangeColor}
              onvalueChanged={(event: any) => setStockRangeColor(event.detail.value ?? '')}
            />
            <oj-input-text
              labelHint="stockVolumeColor"
              id="volumeColor"
              value={stockVolumeColor}
              onvalueChanged={(event: any) => setStockVolumeColor(event.detail.value ?? '')}
            />
          </oj-form-layout>
        </div>

        <div class="oj-sm-padding-1x">
          <div class="oj-typography-bold oj-sm-margin-2x-vertical">Series Attributes</div>
          <oj-form-layout maxColumns={2} aria-controls="stockChart">
            <oj-input-text
              labelHint="color"
              id="color1"
              value={color1}
              onvalueChanged={(event: any) => setColor1(event.detail.value ?? '')}
            />
            <oj-input-text
              labelHint="borderColor"
              id="borderColor1"
              value={borderColor1}
              onvalueChanged={(event: any) => setBorderColor1(event.detail.value ?? '')}
            />
          </oj-form-layout>
        </div>

        <div class="oj-sm-padding-1x">
          <div class="oj-typography-bold oj-sm-margin-2x-vertical">X-Axis</div>
          <oj-form-layout maxColumns={2} aria-controls="stockChart">
            <oj-input-text
              labelHint="title"
              id="xTitle"
              value={xTitle}
              onvalueChanged={(event: any) => setXTitle(event.detail.value ?? '')}
            />
            <demo-input-json
              labelHint="titleStyle"
              id="xStyle"
              value={xStyle}
              onvalueChanged={(event: any) => setXStyle(event.detail.value)}
            />
          </oj-form-layout>

          <div class="oj-typography-bold oj-sm-margin-2x-vertical">Y-Axis</div>
          <oj-form-layout maxColumns={2} aria-controls="stockChart">
            <oj-input-text
              labelHint="title"
              id="yTitle"
              value={yTitle}
              onvalueChanged={(event: any) => setYTitle(event.detail.value ?? '')}
            />
            <demo-input-json
              labelHint="titleStyle"
              id="yStyle"
              value={yStyle}
              onvalueChanged={(event: any) => setYStyle(event.detail.value)}
            />
          </oj-form-layout>

          <div class="oj-typography-bold oj-sm-margin-2x-vertical">Y2-Axis</div>
          <oj-form-layout maxColumns={2} aria-controls="stockChart">
            <oj-input-text
              id="y2Title"
              labelHint="title"
              value={y2Title}
              onvalueChanged={(event: any) => setY2Title(event.detail.value ?? '')}
            />
            <demo-input-json
              id="y2Style"
              labelHint="titleStyle"
              value={y2Style}
              onvalueChanged={(event: any) => setY2Style(event.detail.value)}
            />
          </oj-form-layout>
        </div>

        <div class="oj-sm-padding-1x">
          <div class="oj-typography-bold oj-sm-margin-2x-vertical">Plot Area</div>
          <oj-form-layout maxColumns={2} aria-controls="stockChart">
            <oj-input-text
              id="background"
              labelHint="backgroundColor"
              value={plotAreaColor}
              onvalueChanged={(event: any) => setPlotAreaColor(event.detail.value ?? '')}
            />
            <oj-input-text
              id="borderColor"
              labelHint="borderColor"
              value={plotAreaBorderColor}
              onvalueChanged={(event: any) => setPlotAreaBorderColor(event.detail.value ?? '')}
            />
            <oj-input-number
              id="borderWidth"
              labelHint="borderWidth"
              min={0}
              value={plotAreaBorderWidth}
              onvalueChanged={(event: any) => setPlotAreaBorderWidth(event.detail.value ?? 0)}
            />
          </oj-form-layout>

          <div class="oj-typography-bold oj-sm-margin-2x-vertical">X-Axis</div>
          <div class="oj-typography-bold oj-sm-margin-2x-vertical">axisLine</div>
          <oj-form-layout maxColumns={2} aria-controls="stockChart">
            <oj-input-text
              id="xAxisLineColor"
              labelHint="lineColor"
              value={xAxisLineColor}
              onvalueChanged={(event: any) => setXAxisLineColor(event.detail.value ?? '')}
            />
            <oj-input-number
              id="xAxisLineWidth"
              labelHint="lineWidth"
              min={0}
              value={xAxisLineWidth}
              onvalueChanged={(event: any) => setXAxisLineWidth(event.detail.value ?? 0)}
            />
          </oj-form-layout>

          <div class="oj-typography-bold oj-sm-margin-2x-vertical">Y-Axis</div>
          <div class="oj-typography-bold oj-sm-margin-2x-vertical">majorTick</div>
          <oj-form-layout maxColumns={2} aria-controls="stockChart">
            <oj-input-text
              id="yMajorTickColor"
              labelHint="lineColor"
              value={yMajorTickColor}
              onvalueChanged={(event: any) => setYMajorTickColor(event.detail.value ?? '')}
            />
            <oj-input-number
              id="yMajorTickWidth"
              labelHint="lineWidth"
              min={0}
              value={yMajorTickWidth}
              onvalueChanged={(event: any) => setYMajorTickWidth(event.detail.value ?? 0)}
            />
            <demo-select-enum
              id="yMajorTickStyle"
              labelHint="lineStyle"
              value={yMajorTickStyle}
              onvalueChanged={(event: any) => setYMajorTickStyle(event.detail.value)}
              enumValues={["solid", "dashed", "dotted"]}
            />
          </oj-form-layout>

          <div class="oj-typography-bold oj-sm-margin-2x-vertical">tickLabel</div>
          <oj-form-layout maxColumns={2} aria-controls="stockChart">
            <demo-select-enum
              id="yTickLabelPosition"
              labelHint="position"
              aria-controls="stockChart"
              value={yTickLabelPosition}
              onvalueChanged={(event: any) => setYTickLabelPosition(event.detail.value)}
              enumValues={["outside", "inside"]}
            />
          </oj-form-layout>

          <div class="oj-typography-bold oj-sm-margin-2x-vertical">Y2-Axis</div>
          <div class="oj-typography-bold oj-sm-margin-2x-vertical">majorTick</div>
          <oj-form-layout maxColumns={2} aria-controls="stockChart">
            <oj-input-text
              id="y2MajorTickColor"
              labelHint="lineColor"
              value={y2MajorTickColor}
              onvalueChanged={(event: any) => setY2MajorTickColor(event.detail.value ?? '')}
            />
            <oj-input-number
              id="y2MajorTickWidth"
              labelHint="lineWidth"
              min={0}
              value={y2MajorTickWidth}
              onvalueChanged={(event: any) => setY2MajorTickWidth(event.detail.value ?? 0)}
            />
            <demo-select-enum
              id="y2MajorTickStyle"
              labelHint="lineStyle"
              aria-controls="stockChart"
              value={y2MajorTickStyle}
              onvalueChanged={(event: any) => setY2MajorTickStyle(event.detail.value)}
              enumValues={["solid", "dashed", "dotted"]}
            />
          </oj-form-layout>

          <div class="oj-typography-bold oj-sm-margin-2x-vertical">tickLabel</div>
          <oj-form-layout maxColumns={2} aria-controls="stockChart">
            <demo-select-enum
              id="y2TickLabelPosition"
              labelHint="position"
              aria-controls="stockChart"
              value={y2TickLabelPosition}
              onvalueChanged={(event: any) => setY2TickLabelPosition(event.detail.value)}
              enumValues={["outside", "inside"]}
            />
          </oj-form-layout>
        </div>
      </demo-tabs>
    </div>
  );
};

export default StockChartStyles;

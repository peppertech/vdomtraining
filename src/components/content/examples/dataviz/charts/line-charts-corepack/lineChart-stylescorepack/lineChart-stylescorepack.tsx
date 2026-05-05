import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import "css!./demo.css";
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as quarterDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import 'ojs/ojinputtext';
import 'ojs/ojinputnumber';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-select-enum/loader';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-input-json/loader';
import '../../../../../../jet-composites/demo-tabs/loader';

type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type TextInputValue = ComponentProps<'oj-input-text'>['value'];
type NumberInputValue = ComponentProps<'oj-input-number'>['value'];
type CurrentTab = 'seriesStyles' | 'textStyles' | 'plotAreaStyles';
type LineType =
  | 'straight'
  | 'curved'
  | 'stepped'
  | 'centeredStepped'
  | 'segmented'
  | 'centeredSegmented'
  | 'none';
type LineStyle = 'solid' | 'dashed' | 'dotted';
type MarkerShape = 'auto' | 'circle' | 'diamond' | 'human' | 'plus' | 'square' | 'star' | 'triangleDown' | 'triangleUp';
type TickLabelPosition = 'inside' | 'outside';
type ChartTextStyle = {
  fontStyle: string;
  color: string;
};
type PlotArea = NonNullable<ComponentProps<'oj-chart'>['plotArea']>;
type XAxis = NonNullable<ComponentProps<'oj-chart'>['xAxis']>;
type YAxis = NonNullable<ComponentProps<'oj-chart'>['yAxis']>;

type LineChartItem = {
  id: number;
  quarter: string;
  series: string;
  value: number;
};

type ChartItemTemplateContext = {
  data: LineChartItem;
};

type ChartSeriesTemplateContext = {
  id: string;
};

const quarterData = JSON.parse(quarterDataText as string) as LineChartItem[];

export const LineChartStylescorepack = () => {
  const [selectedTab, setSelectedTab] = useState<CurrentTab>('seriesStyles');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [color, setColor] = useState<TextInputValue>('#ED6647');
  const [lineWidth, setLineWidth] = useState<NumberInputValue>(3);
  const [lineType, setLineType] = useState<LineType>('straight');
  const [lineStyle, setLineStyle] = useState<LineStyle>('solid');
  const [markerColor, setMarkerColor] = useState<TextInputValue>('#ED6647');
  const [markerSize, setMarkerSize] = useState<NumberInputValue>(8);
  const [markerShape, setMarkerShape] = useState<MarkerShape>('auto');
  const [plotAreaColor, setPlotAreaColor] = useState<TextInputValue>('rgba(255, 255, 255, 0)');
  const [plotAreaBorderColor, setPlotAreaBorderColor] = useState<TextInputValue>('#000000');
  const [plotAreaBorderWidth, setPlotAreaBorderWidth] = useState<NumberInputValue>(0);
  const [xTitle, setXTitle] = useState<TextInputValue>('X-Axis Title');
  const [xStyle, setXStyle] = useState<ChartTextStyle>({ fontStyle: 'italic', color: '#6070C7' });
  const [xAxisLineColor, setXAxisLineColor] = useState<TextInputValue>('#9E9E9E');
  const [xAxisLineWidth, setXAxisLineWidth] = useState<NumberInputValue>(1);
  const [yTitle, setYTitle] = useState<TextInputValue>('Y-Axis Title');
  const [yStyle, setYStyle] = useState<ChartTextStyle>({ fontStyle: 'italic', color: '#6070C7' });
  const [yMajorTickColor, setYMajorTickColor] = useState<TextInputValue>('#C4CED7');
  const [yMajorTickWidth, setYMajorTickWidth] = useState<NumberInputValue>(1);
  const [yMajorTickStyle, setYMajorTickStyle] = useState<LineStyle>('solid');
  const [yTickLabelPosition, setYTickLabelPosition] = useState<TickLabelPosition>('outside');

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(quarterData, {
        keyAttributes: 'id'
      }),
    []
  );

  const plotArea: PlotArea = {
    backgroundColor: plotAreaColor,
    borderColor: plotAreaBorderColor,
    borderWidth: plotAreaBorderWidth ?? undefined
  };

  const xAxis: XAxis = {
    title: xTitle,
    titleStyle: xStyle,
    axisLine: {
      lineColor: xAxisLineColor,
      lineWidth: xAxisLineWidth ?? undefined
    }
  };

  const yAxis: YAxis = {
    title: yTitle,
    titleStyle: yStyle,
    majorTick: {
      lineColor: yMajorTickColor,
      lineWidth: yMajorTickWidth ?? undefined,
      lineStyle: yMajorTickStyle
    },
    tickLabel: {
      position: yTickLabelPosition
    }
  };

  const handleTextInput =
    (setter: (value: TextInputValue) => void) =>
    (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
      setter(event.detail.value);
    };

  const handleNumberInput =
    (setter: (value: NumberInputValue) => void) =>
    (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
      setter(event.detail.value);
    };

  const renderChartItem = (item: ChartItemTemplateContext) => (
    <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series} />
  );

  const renderSeries = (series: ChartSeriesTemplateContext) => (
    <oj-chart-series
      color={series.id === 'Series 4' ? color ?? undefined : undefined}
      lineWidth={series.id === 'Series 4' ? lineWidth ?? undefined : undefined}
      lineType={series.id === 'Series 4' ? lineType : undefined}
      lineStyle={series.id === 'Series 4' ? lineStyle : undefined}
      markerColor={series.id === 'Series 4' ? markerColor ?? undefined : undefined}
      markerShape={series.id === 'Series 4' ? markerShape : undefined}
      markerSize={series.id === 'Series 4' ? markerSize ?? undefined : undefined}
      markerDisplayed={series.id === 'Series 4' ? 'on' : undefined}
    />
  );

  const legend: NonNullable<ComponentProps<'oj-chart'>['legend']> = {
    position: 'bottom'
  };

  return (
    <div
      id="chart-container"
      class="oj-flex oj-sm-padding-1x oj-sm-flex-items-1 demo-linechart-styles-height"
    >
      <div class="oj-flex-item">
        <oj-chart
          id="lineChart"
          type="line"
          data={dataProvider}
          animationOnDataChange="auto"
          orientation={orientationValue}
          xAxis={xAxis}
          yAxis={yAxis}
          plotArea={plotArea}
          legend={legend}
        >
          <template slot="itemTemplate" render={renderChartItem} />
          <template slot="seriesTemplate" render={renderSeries} />
        </oj-chart>
        <demo-chart-orientation-control
          type="line"
          orientation={orientationValue}
          onorientationChanged={(event: JetElementCustomEvent<ChartOrientation>) =>
            setOrientationValue(event.detail.value)
          }
          aria-controls="lineChart"
        />
      </div>
      <demo-tabs
        class="oj-flex-item"
        headers={[{"id":"seriesStyles", "label":"Series Styles"}, {"id":"textStyles", "label":"Text Styles"}, {"id":"plotAreaStyles", "label":"Plot Area Styles"}]}
        value={selectedTab}
        onvalueChanged={(event: JetElementCustomEvent<CurrentTab>) => setSelectedTab(event.detail.value)}
      >
        <div class="oj-sm-padding-1x">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Series Attributes - Series 4</div>
          <oj-form-layout aria-controls="lineChart" maxColumns={2}>
            <oj-input-text value={color} onvalueChanged={handleTextInput(setColor)} labelHint="Color" />
            <oj-input-number value={lineWidth} onvalueChanged={handleNumberInput(setLineWidth)} labelHint="Line Width" />
            <demo-select-enum
              value={lineType}
              onvalueChanged={(event: JetElementCustomEvent<LineType>) => setLineType(event.detail.value)}
              labelHint="Line Type"
              enumValues={["straight", "curved", "stepped", "centeredStepped", "segmented", "centeredSegmented", "none"]}
            />
            <demo-select-enum
              value={lineStyle}
              onvalueChanged={(event: JetElementCustomEvent<LineStyle>) => setLineStyle(event.detail.value)}
              labelHint="Line Style"
              enumValues={["solid", "dashed", "dotted"]}
            />
            <oj-input-text value={markerColor} onvalueChanged={handleTextInput(setMarkerColor)} labelHint="Marker Color" />
            <oj-input-number value={markerSize} onvalueChanged={handleNumberInput(setMarkerSize)} labelHint="Marker Size" />
            <demo-select-enum
              value={markerShape}
              onvalueChanged={(event: JetElementCustomEvent<MarkerShape>) => setMarkerShape(event.detail.value)}
              labelHint="Marker Shape"
              enumValues={["auto", "circle", "diamond", "human", "plus", "square", "star", "triangleDown", "triangleUp"]}
            />
          </oj-form-layout>
        </div>
        <div class="oj-sm-padding-1x">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">X-Axis</div>
          <oj-form-layout aria-controls="lineChart" maxColumns={2}>
            <oj-input-text value={xTitle} onvalueChanged={handleTextInput(setXTitle)} labelHint="Title" />
            <demo-input-json
              value={xStyle}
              onvalueChanged={(event: JetElementCustomEvent<ChartTextStyle>) => setXStyle(event.detail.value)}
              labelHint="Title Style"
            />
          </oj-form-layout>
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Y-Axis</div>
          <oj-form-layout aria-controls="lineChart" maxColumns={2}>
            <oj-input-text value={yTitle} onvalueChanged={handleTextInput(setYTitle)} labelHint="Title" />
            <demo-input-json
              value={yStyle}
              onvalueChanged={(event: JetElementCustomEvent<ChartTextStyle>) => setYStyle(event.detail.value)}
              labelHint="Title Style"
            />
          </oj-form-layout>
        </div>
        <div class="oj-sm-padding-1x">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Plot Area</div>
          <oj-form-layout aria-controls="lineChart" maxColumns={2}>
            <oj-input-text
              value={plotAreaColor}
              onvalueChanged={handleTextInput(setPlotAreaColor)}
              labelHint="Background Color"
            />
            <oj-input-text
              value={plotAreaBorderColor}
              onvalueChanged={handleTextInput(setPlotAreaBorderColor)}
              labelHint="Border Color"
            />
            <oj-input-number
              value={plotAreaBorderWidth}
              onvalueChanged={handleNumberInput(setPlotAreaBorderWidth)}
              labelHint="Border Width"
            />
          </oj-form-layout>
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">X-Axis (Axis Line)</div>
          <oj-form-layout aria-controls="lineChart" maxColumns={2}>
            <oj-input-text
              value={xAxisLineColor}
              onvalueChanged={handleTextInput(setXAxisLineColor)}
              labelHint="Line Color"
            />
            <oj-input-number
              value={xAxisLineWidth}
              onvalueChanged={handleNumberInput(setXAxisLineWidth)}
              labelHint="Line Width"
            />
          </oj-form-layout>
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Y-Axis (Major Tick)</div>
          <oj-form-layout aria-controls="lineChart" maxColumns={2}>
            <oj-input-text
              value={yMajorTickColor}
              onvalueChanged={handleTextInput(setYMajorTickColor)}
              labelHint="Line Color"
            />
            <oj-input-number
              value={yMajorTickWidth}
              onvalueChanged={handleNumberInput(setYMajorTickWidth)}
              labelHint="Line Width"
            />
            <demo-select-enum
              value={yMajorTickStyle}
              onvalueChanged={(event: JetElementCustomEvent<LineStyle>) => setYMajorTickStyle(event.detail.value)}
              labelHint="Line Style"
              enumValues={["dashed", "dotted", "solid"]}
            />
            <demo-select-enum
              value={yTickLabelPosition}
              onvalueChanged={(event: JetElementCustomEvent<TickLabelPosition>) =>
                setYTickLabelPosition(event.detail.value)
              }
              labelHint="Tick Position"
              enumValues={["inside", "outside"]}
            />
          </oj-form-layout>
        </div>
      </demo-tabs>
    </div>
  );
};

export default LineChartStylescorepack;

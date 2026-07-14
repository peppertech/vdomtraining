import "css!./demo.css";
import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import 'ojs/ojtoolbar';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as quarterDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import '../../../../../../jet-composites/demo-input-json/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import '../../../../../../jet-composites/demo-select-enum/loader';
import '../../../../../../jet-composites/demo-tabs/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type TextInputValue = ComponentProps<'oj-input-text'>['value'];
type NumberInputValue = ComponentProps<'oj-input-number'>['value'];
type CurrentTab = 'seriesStyles' | 'textStyles' | 'plotAreaStyles';
type LineType = 'straight' | 'curved' | 'stepped' | 'centeredStepped' | 'segmented' | 'centeredSegmented' | 'none';
type LineStyle = 'solid' | 'dashed' | 'dotted';
type Pattern =
  | 'auto'
  | 'smallChecker'
  | 'largeTriangle'
  | 'largeDiagonalRight'
  | 'largeDiamond'
  | 'smallCrosshatch'
  | 'largeDiagonalLeft'
  | 'largeCrosshatch'
  | 'smallDiagonalLeft'
  | 'smallDiagonalRight'
  | 'smallDiamond'
  | 'smallTriangle'
  | 'largeChecker';
type MarkerDisplayed = 'on' | 'off';
type MarkerShape = 'auto' | 'circle' | 'diamond' | 'human' | 'plus' | 'square' | 'star' | 'triangleDown' | 'triangleUp';
type TickLabelPosition = 'inside' | 'outside';
type ChartTextStyle = { fontStyle: string; color: string };
type PlotArea = NonNullable<ComponentProps<'oj-chart'>['plotArea']>;
type XAxis = NonNullable<ComponentProps<'oj-chart'>['xAxis']>;
type YAxis = NonNullable<ComponentProps<'oj-chart'>['yAxis']>;
type LineWithAreaChartItem = { id: number; quarter: string; series: string; value: number };
type ChartItemTemplateContext = { data: LineWithAreaChartItem };
type ChartSeriesTemplateContext = { id: string };

const quarterData = JSON.parse(quarterDataText as string) as LineWithAreaChartItem[];

export const LineWithAreaChartStyles = () => {
  const [selectedTab, setSelectedTab] = useState<CurrentTab>('seriesStyles');
  const [stackValue, setStackValue] = useState<ChartStack>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [color, setColor] = useState<TextInputValue>('#ED6647');
  const [borderColor, setBorderColor] = useState<TextInputValue>('#0F3248');
  const [borderWidth, setBorderWidth] = useState<NumberInputValue>(1);
  const [lineWidth, setLineWidth] = useState<NumberInputValue>(3);
  const [lineType, setLineType] = useState<LineType>('straight');
  const [lineStyle, setLineStyle] = useState<LineStyle>('solid');
  const [pattern, setPattern] = useState<Pattern>('smallChecker');
  const [areaColor, setAreaColor] = useState<TextInputValue>('#ED6647');
  const [markerDisplayed, setMarkerDisplayed] = useState<MarkerDisplayed>('on');
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

  const dataProvider = useMemo(() => new ArrayDataProvider(quarterData, { keyAttributes: 'id' }), []);
  const plotArea: PlotArea = {
    backgroundColor: plotAreaColor,
    borderColor: plotAreaBorderColor,
    borderWidth: plotAreaBorderWidth ?? undefined
  };
  const xAxis: XAxis = {
    title: xTitle,
    titleStyle: xStyle,
    axisLine: { lineColor: xAxisLineColor, lineWidth: xAxisLineWidth ?? undefined }
  };
  const yAxis: YAxis = {
    title: yTitle,
    titleStyle: yStyle,
    majorTick: {
      lineColor: yMajorTickColor,
      lineWidth: yMajorTickWidth ?? undefined,
      lineStyle: yMajorTickStyle
    },
    tickLabel: { position: yTickLabelPosition }
  };
  const legend: NonNullable<ComponentProps<'oj-chart'>['legend']> = { position: 'bottom' };

  const handleTextInput =
    (setter: (value: TextInputValue) => void) =>
    (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) =>
      setter(event.detail.value);
  const handleNumberInput =
    (setter: (value: NumberInputValue) => void) =>
    (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) =>
      setter(event.detail.value);

  const itemTemplateRenderer = (item: ChartItemTemplateContext) => (
    <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series} />
  );
  const seriesTemplateRenderer = (series: ChartSeriesTemplateContext) => (
    <oj-chart-series
      areaColor={series.id === 'Series 4' ? areaColor ?? undefined : undefined}
      borderColor={series.id === 'Series 4' ? borderColor ?? undefined : undefined}
      borderWidth={series.id === 'Series 4' ? borderWidth ?? undefined : undefined}
      color={series.id === 'Series 4' ? color ?? undefined : undefined}
      lineWidth={series.id === 'Series 4' ? lineWidth ?? undefined : undefined}
      lineType={series.id === 'Series 4' ? lineType : undefined}
      lineStyle={series.id === 'Series 4' ? lineStyle : undefined}
      markerColor={series.id === 'Series 4' ? markerColor ?? undefined : undefined}
      markerDisplayed={series.id === 'Series 4' ? markerDisplayed : undefined}
      markerShape={series.id === 'Series 4' ? markerShape : undefined}
      markerSize={series.id === 'Series 4' ? markerSize ?? undefined : undefined}
      pattern={series.id === 'Series 4' ? pattern : undefined}
    />
  );

  return (
    <div id="chart-container" class="oj-flex oj-sm-flex-items-1 demo-linewithareachart-styles-minheight">
      <div class="oj-flex-item">
        <oj-chart
          id="lineAreaChart"
          type="lineWithArea"
          data={dataProvider}
          animationOnDataChange="auto"
          orientation={orientationValue}
          stack={stackValue}
          xAxis={xAxis}
          yAxis={yAxis}
          legend={legend}
          plotArea={plotArea}
        >
          <template slot="itemTemplate" render={itemTemplateRenderer} />
          <template slot="seriesTemplate" render={seriesTemplateRenderer} />
        </oj-chart>
        <oj-toolbar aria-controls="lineAreaChart">
          <demo-chart-orientation-control
            type="lineWithArea"
            focusManagement="none"
            orientation={orientationValue}
            onorientationChanged={(event: JetElementCustomEvent<ChartOrientation>) => setOrientationValue(event.detail.value)}
          />
          <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
          <demo-chart-stack-control
            type="lineWithArea"
            focusManagement="none"
            stack={stackValue}
            onstackChanged={(event: JetElementCustomEvent<ChartStack>) => setStackValue(event.detail.value)}
          />
        </oj-toolbar>
      </div>
      <demo-tabs
        class="oj-flex-item"
        headers={[{"id":"seriesStyles","label":"Series Styles"},{"id":"textStyles","label":"Text Styles"},{"id":"plotAreaStyles","label":"Plot Area Styles"}]}
        value={selectedTab}
        onvalueChanged={(event: JetElementCustomEvent<CurrentTab>) => setSelectedTab(event.detail.value)}
      >
        <div class="oj-sm-padding-1x">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Series Attributes - Series 4</div>
          <oj-form-layout aria-controls="lineChart" maxColumns={2}>
            <oj-input-text value={color} labelHint="Color" onvalueChanged={handleTextInput(setColor)} />
            <oj-input-text value={borderColor} labelHint="Border Color" onvalueChanged={handleTextInput(setBorderColor)} />
            <oj-input-number value={borderWidth} labelHint="Border Width" onvalueChanged={handleNumberInput(setBorderWidth)} />
            <oj-input-text value={areaColor} labelHint="Area Color" onvalueChanged={handleTextInput(setAreaColor)} />
            <oj-input-number value={lineWidth} labelHint="Line Width" onvalueChanged={handleNumberInput(setLineWidth)} />
            <demo-select-enum value={lineType} labelHint="Line Type" enumValues={["straight","curved","stepped","centeredStepped","segmented","centeredSegmented","none"]} onvalueChanged={(event: JetElementCustomEvent<LineType>) => setLineType(event.detail.value)} />
            <demo-select-enum value={lineStyle} labelHint="Line Style" enumValues={["solid","dashed","dotted"]} onvalueChanged={(event: JetElementCustomEvent<LineStyle>) => setLineStyle(event.detail.value)} />
            <demo-radioset-enum value={markerDisplayed} labelHint="Display Markers" direction="row" enumValues={["on","off"]} onvalueChanged={(event: JetElementCustomEvent<MarkerDisplayed>) => setMarkerDisplayed(event.detail.value)} />
            <oj-input-text value={markerColor} labelHint="Marker Color" onvalueChanged={handleTextInput(setMarkerColor)} />
            <oj-input-number value={markerSize} labelHint="Marker Size" onvalueChanged={handleNumberInput(setMarkerSize)} />
            <demo-select-enum value={markerShape} labelHint="Marker Shape" enumValues={["auto","circle","diamond","human","plus","square","star","triangleDown","triangleUp"]} onvalueChanged={(event: JetElementCustomEvent<MarkerShape>) => setMarkerShape(event.detail.value)} />
            <demo-select-enum value={pattern} labelHint="Pattern" enumValues={["auto","smallChecker","largeTriangle","largeDiagonalRight","largeDiamond","smallCrosshatch","largeDiagonalLeft","largeCrosshatch","smallDiagonalLeft","smallDiagonalRight","smallDiamond","smallTriangle","largeChecker"]} onvalueChanged={(event: JetElementCustomEvent<Pattern>) => setPattern(event.detail.value)} />
          </oj-form-layout>
        </div>
        <div class="oj-sm-padding-1x">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">X-Axis</div>
          <oj-form-layout aria-controls="lineChart" maxColumns={2}>
            <oj-input-text value={xTitle} labelHint="Title" onvalueChanged={handleTextInput(setXTitle)} />
            <demo-input-json value={xStyle} labelHint="Title Style" onvalueChanged={(event: JetElementCustomEvent<ChartTextStyle>) => setXStyle(event.detail.value)} />
          </oj-form-layout>
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Y-Axis</div>
          <oj-form-layout aria-controls="lineChart" maxColumns={2}>
            <oj-input-text value={yTitle} labelHint="Title" onvalueChanged={handleTextInput(setYTitle)} />
            <demo-input-json value={yStyle} labelHint="Title Style" onvalueChanged={(event: JetElementCustomEvent<ChartTextStyle>) => setYStyle(event.detail.value)} />
          </oj-form-layout>
        </div>
        <div class="oj-sm-padding-1x">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Plot Area</div>
          <oj-form-layout aria-controls="lineChart" maxColumns={2}>
            <oj-input-text value={plotAreaColor} labelHint="Background Color" onvalueChanged={handleTextInput(setPlotAreaColor)} />
            <oj-input-text value={plotAreaBorderColor} labelHint="Border Color" onvalueChanged={handleTextInput(setPlotAreaBorderColor)} />
            <oj-input-number value={plotAreaBorderWidth} labelHint="Border Width" onvalueChanged={handleNumberInput(setPlotAreaBorderWidth)} />
          </oj-form-layout>
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">X-Axis (Axis Line)</div>
          <oj-form-layout aria-controls="lineChart" maxColumns={2}>
            <oj-input-text value={xAxisLineColor} labelHint="Line Color" onvalueChanged={handleTextInput(setXAxisLineColor)} />
            <oj-input-number value={xAxisLineWidth} labelHint="Line Width" onvalueChanged={handleNumberInput(setXAxisLineWidth)} />
          </oj-form-layout>
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Y-Axis (Major Tick)</div>
          <oj-form-layout aria-controls="lineChart" maxColumns={2}>
            <oj-input-text value={yMajorTickColor} labelHint="Line Color" onvalueChanged={handleTextInput(setYMajorTickColor)} />
            <oj-input-number value={yMajorTickWidth} labelHint="Line Width" onvalueChanged={handleNumberInput(setYMajorTickWidth)} />
            <demo-select-enum value={yMajorTickStyle} labelHint="Line Style" enumValues={["dashed","dotted","solid"]} onvalueChanged={(event: JetElementCustomEvent<LineStyle>) => setYMajorTickStyle(event.detail.value)} />
            <demo-select-enum value={yTickLabelPosition} labelHint="Tick Position" enumValues={["inside","outside"]} onvalueChanged={(event: JetElementCustomEvent<TickLabelPosition>) => setYTickLabelPosition(event.detail.value)} />
          </oj-form-layout>
        </div>
      </demo-tabs>
    </div>
  );
};

export default LineWithAreaChartStyles;

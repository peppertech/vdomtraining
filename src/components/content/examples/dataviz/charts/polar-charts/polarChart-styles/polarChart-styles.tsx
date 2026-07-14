import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as bubbleDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicCoordData.json';
import * as lineDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/twoSeriesDualYData.json';
import '../../../../../../jet-composites/demo-select-enum/loader';
import '../../../../../../jet-composites/demo-tabs/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type CurrentTab = 'seriesStyles' | 'plotAreaStyles';
type TextInputValue = ComponentProps<'oj-input-text'>['value'];
type NumberInputValue = ComponentProps<'oj-input-number'>['value'];
type TextChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0];
type NumberChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0];
type Pattern =
  | 'auto'
  | 'smallChecker'
  | 'smallCrosshatch'
  | 'smallDiagonalLeft'
  | 'smallDiagonalRight'
  | 'smallDiamond'
  | 'smallTriangle'
  | 'largeChecker'
  | 'largeCrosshatch'
  | 'largeDiagonalLeft'
  | 'largeDiagonalRight'
  | 'largeDiamond'
  | 'largeTriangle';
type MarkerShape =
  | 'auto'
  | 'square'
  | 'circle'
  | 'diamond'
  | 'plus'
  | 'triangleDown'
  | 'triangleUp'
  | 'human'
  | 'star';
type LineStyle = 'solid' | 'dashed' | 'dotted';
type TickLabelPosition = 'outside' | 'inside';
type BubbleChartItem = {
  id: number;
  group: string;
  series: string;
  x: number;
  y: number;
  z: number;
};
type LineChartItem = {
  id: number;
  group: string;
  series: string;
  value: number;
};
type SeriesTemplateContext = {
  id: string;
};

const bubbleData = JSON.parse(bubbleDataText as string) as BubbleChartItem[];
const lineData = JSON.parse(lineDataText as string) as LineChartItem[];

export const PolarChartStyles = () => {
  const [currentTab, setCurrentTab] = useState<CurrentTab>('seriesStyles');

  const [plotAreaColor, setPlotAreaColor] = useState<TextInputValue>('#F2F2F2');
  const [plotAreaBorderColor, setPlotAreaBorderColor] = useState<TextInputValue>('#000000');
  const [plotAreaBorderWidth, setPlotAreaBorderWidth] = useState<NumberInputValue>(0);

  const [xAxisLineColor, setXAxisLineColor] = useState<TextInputValue>('#9E9E9E');
  const [xAxisLineWidth, setXAxisLineWidth] = useState<NumberInputValue>(1);
  const [xMajorTickColor, setXMajorTickColor] = useState<TextInputValue>('#C4CED7');
  const [xMajorTickWidth, setXMajorTickWidth] = useState<NumberInputValue>(1);
  const [xMajorTickStyle, setXMajorTickStyle] = useState<LineStyle>('solid');

  const [yAxisLineColor, setYAxisLineColor] = useState<TextInputValue>('#9E9E9E');
  const [yAxisLineWidth, setYAxisLineWidth] = useState<NumberInputValue>(1);
  const [yMajorTickColor, setYMajorTickColor] = useState<TextInputValue>('#C4CED7');
  const [yMajorTickWidth, setYMajorTickWidth] = useState<NumberInputValue>(1);
  const [yMajorTickStyle, setYMajorTickStyle] = useState<LineStyle>('solid');

  const [color1, setColor1] = useState<TextInputValue>('#267DB3');
  const [borderColor1, setBorderColor1] = useState<TextInputValue>('#0F3248');
  const [pattern1, setPattern1] = useState<Pattern>('smallChecker');
  const [markerShape1, setMarkerShape1] = useState<MarkerShape>('auto');

  const [color2, setColor2] = useState<TextInputValue>('#267DB3');
  const [markerColor, setMarkerColor] = useState<TextInputValue>('#267DB3');
  const [markerShape2, setMarkerShape2] = useState<MarkerShape>('auto');
  const [markerSize, setMarkerSize] = useState<NumberInputValue>(8);
  const [polarLineWidth, setPolarLineWidth] = useState<NumberInputValue>(3);
  const [polarLineStyle, setPolarLineStyle] = useState<LineStyle>('solid');

  const bubbleDataProvider = useMemo(
    () => new ArrayDataProvider<number, BubbleChartItem>(bubbleData, { keyAttributes: 'id' }),
    []
  );
  const lineDataProvider = useMemo(
    () => new ArrayDataProvider<number, LineChartItem>(lineData, { keyAttributes: 'id' }),
    []
  );

  const plotArea = {
    backgroundColor: plotAreaColor,
    borderColor: plotAreaBorderColor,
    borderWidth: plotAreaBorderWidth ?? undefined
  };

  const xAxis = {
    axisLine: {
      lineColor: xAxisLineColor,
      lineWidth: xAxisLineWidth ?? undefined
    },
    majorTick: {
      lineColor: xMajorTickColor,
      lineWidth: xMajorTickWidth ?? undefined,
      lineStyle: xMajorTickStyle
    }
  };

  const yAxis = {
    axisLine: {
      lineColor: yAxisLineColor,
      lineWidth: yAxisLineWidth ?? undefined
    },
    majorTick: {
      lineColor: yMajorTickColor,
      lineWidth: yMajorTickWidth ?? undefined,
      lineStyle: yMajorTickStyle
    },
    tickLabel: {
      position: 'outside' as TickLabelPosition,
      style: {
        fontStyle: 'italic',
        'background-color': 'rgba(255, 0, 0, 0.3)'
      }
    }
  };

  const handleCurrentTabChanged = (event: JetElementCustomEvent<CurrentTab>) => {
    setCurrentTab(event.detail.value);
  };

  const bubbleItemTemplateRenderer = (item: { data: BubbleChartItem }) => (
    <oj-chart-item
      x={item.data.x}
      y={item.data.y}
      z={item.data.z}
      groupId={[item.data.group]}
      seriesId={item.data.series}
    />
  );

  const lineItemTemplateRenderer = (item: { data: LineChartItem }) => (
    <oj-chart-item
      value={item.data.value}
      groupId={[item.data.group]}
      seriesId={item.data.series}
    />
  );

  const bubbleSeriesTemplateRenderer = (series: SeriesTemplateContext) => (
    <oj-chart-series
      color={series.id === 'Series 1' ? color1 ?? undefined : undefined}
      borderColor={series.id === 'Series 1' ? borderColor1 ?? undefined : undefined}
      markerShape={series.id === 'Series 1' ? markerShape1 : undefined}
      pattern={series.id === 'Series 1' ? pattern1 : undefined}
    />
  );

  const lineSeriesTemplateRenderer = (series: SeriesTemplateContext) => (
    <oj-chart-series
      color={series.id === 'Series 1' ? color2 ?? undefined : undefined}
      lineWidth={series.id === 'Series 1' ? polarLineWidth ?? undefined : undefined}
      lineStyle={series.id === 'Series 1' ? polarLineStyle : undefined}
      markerColor={series.id === 'Series 1' ? markerColor ?? undefined : undefined}
      markerShape={series.id === 'Series 1' ? markerShape2 : undefined}
      markerSize={series.id === 'Series 1' ? markerSize ?? undefined : undefined}
      markerDisplayed={series.id === 'Series 1' ? 'on' : undefined}
    />
  );

  return (
    <div id="chart-container">
      <div class="oj-flex">
        <oj-chart
          class="oj-flex-item"
          id="polarBubbleChart"
          type="bubble"
          coordinateSystem="polar"
          data={bubbleDataProvider}
          animationOnDataChange="auto"
          xAxis={xAxis}
          yAxis={yAxis}
          plotArea={plotArea}
        >
          <template slot="itemTemplate" render={bubbleItemTemplateRenderer} />
          <template slot="seriesTemplate" render={bubbleSeriesTemplateRenderer} />
        </oj-chart>
        <oj-chart
          class="oj-flex-item"
          id="polarLineChart"
          type="line"
          coordinateSystem="polar"
          polarGridShape="polygon"
          data={lineDataProvider}
          animationOnDataChange="auto"
          xAxis={xAxis}
          yAxis={yAxis}
          plotArea={plotArea}
        >
          <template slot="itemTemplate" render={lineItemTemplateRenderer} />
          <template slot="seriesTemplate" render={lineSeriesTemplateRenderer} />
        </oj-chart>
      </div>

      <demo-tabs
        value={currentTab}
        onvalueChanged={handleCurrentTabChanged}
        headers={[{"id":"seriesStyles","label":"Series Styles"},{"id":"plotAreaStyles","label":"Plot Area Styles"}]}
      >
        <div class="oj-sm-padding-1x">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">
            Polar Bubble Chart - Series 1
          </div>
          <oj-form-layout aria-controls="polarLineChart polarBubbleChart" maxColumns={2}>
            <oj-input-text
              id="color"
              labelHint="color"
              value={color1}
              onvalueChanged={(event: TextChangedEvent) => setColor1(event.detail.value)}
            />
            <oj-input-text
              id="borderColor1"
              labelHint="borderColor"
              value={borderColor1}
              onvalueChanged={(event: TextChangedEvent) => setBorderColor1(event.detail.value)}
            />
            <demo-select-enum
              id="pattern"
              value={pattern1}
              labelHint="pattern"
              onvalueChanged={(event: JetElementCustomEvent<Pattern>) =>
                setPattern1(event.detail.value)
              }
              enumValues={
                '["auto", "smallChecker", "smallCrosshatch", "smallDiagonalLeft", "smallDiagonalRight", "smallDiamond", "smallTriangle", "largeChecker", "largeCrosshatch", "largeDiagonalLeft", "largeDiagonalRight", "largeDiamond", "largeTriangle"]'
              }
            />
            <demo-select-enum
              id="markerShape1"
              value={markerShape1}
              labelHint="markerShape"
              onvalueChanged={(event: JetElementCustomEvent<MarkerShape>) =>
                setMarkerShape1(event.detail.value)
              }
              enumValues={["auto","square","circle","diamond","plus","triangleDown","triangleUp","human","star"]}
            />
          </oj-form-layout>

          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">
            Polar Line Chart - Series 1
          </div>
          <oj-form-layout aria-controls="polarLineChart polarBubbleChart" maxColumns={2}>
            <oj-input-text
              id="color2"
              labelHint="color"
              value={color2}
              onvalueChanged={(event: TextChangedEvent) => setColor2(event.detail.value)}
            />
            <oj-input-number
              id="polarLineWidth"
              labelHint="lineWidth"
              value={polarLineWidth}
              min={0}
              step={1}
              onvalueChanged={(event: NumberChangedEvent) =>
                setPolarLineWidth(event.detail.value)
              }
            />
            <demo-select-enum
              id="polarLineStyle"
              value={polarLineStyle}
              labelHint="lineStyle"
              onvalueChanged={(event: JetElementCustomEvent<LineStyle>) =>
                setPolarLineStyle(event.detail.value)
              }
              enumValues={["solid","dashed","dotted"]}
            />
            <oj-input-text
              id="markerColor"
              labelHint="markerColor"
              value={markerColor}
              onvalueChanged={(event: TextChangedEvent) => setMarkerColor(event.detail.value)}
            />
            <oj-input-number
              id="markerSize"
              labelHint="markerSize"
              value={markerSize}
              min={0}
              step={1}
              onvalueChanged={(event: NumberChangedEvent) => setMarkerSize(event.detail.value)}
            />
            <demo-select-enum
              id="markerShape2"
              value={markerShape2}
              labelHint="markerShape"
              onvalueChanged={(event: JetElementCustomEvent<MarkerShape>) =>
                setMarkerShape2(event.detail.value)
              }
              enumValues={["auto","square","circle","diamond","plus","triangleDown","triangleUp","human","star"]}
            />
          </oj-form-layout>
        </div>

        <div class="oj-sm-padding-1x">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">X-Axis</div>
          <div class="oj-typography-subheading-xs oj-sm-margin-2x-vertical">axisLine</div>
          <oj-form-layout aria-controls="polarLineChart polarBubbleChart" maxColumns={2}>
            <oj-input-text
              id="xAxisLineColor"
              labelHint="lineColor"
              value={xAxisLineColor}
              onvalueChanged={(event: TextChangedEvent) => setXAxisLineColor(event.detail.value)}
            />
            <oj-input-number
              id="xAxisLineWidth"
              labelHint="lineWidth"
              value={xAxisLineWidth}
              min={0}
              step={1}
              onvalueChanged={(event: NumberChangedEvent) =>
                setXAxisLineWidth(event.detail.value)
              }
            />
          </oj-form-layout>

          <div class="oj-typography-subheading-xs oj-sm-margin-2x-vertical">majorTick</div>
          <oj-form-layout aria-controls="polarLineChart polarBubbleChart" maxColumns={2}>
            <oj-input-text
              id="xMajorTickColor"
              labelHint="lineColor"
              value={xMajorTickColor}
              onvalueChanged={(event: TextChangedEvent) => setXMajorTickColor(event.detail.value)}
            />
            <oj-input-number
              id="xMajorTickWidth"
              labelHint="lineWidth"
              value={xMajorTickWidth}
              min={0}
              step={1}
              onvalueChanged={(event: NumberChangedEvent) =>
                setXMajorTickWidth(event.detail.value)
              }
            />
            <demo-select-enum
              id="xMajorTickStyle"
              labelHint="lineStyle"
              value={xMajorTickStyle}
              onvalueChanged={(event: JetElementCustomEvent<LineStyle>) =>
                setXMajorTickStyle(event.detail.value)
              }
              enumValues={["solid","dashed","dotted"]}
            />
          </oj-form-layout>

          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Y-Axis</div>
          <div class="oj-typography-subheading-xs oj-sm-margin-2x-vertical">axisLine</div>
          <oj-form-layout aria-controls="polarLineChart polarBubbleChart" maxColumns={2}>
            <oj-input-text
              id="yAxisLineColor"
              labelHint="lineColor"
              value={yAxisLineColor}
              onvalueChanged={(event: TextChangedEvent) => setYAxisLineColor(event.detail.value)}
            />
            <oj-input-number
              id="yAxisLineWidth"
              labelHint="lineWidth"
              value={yAxisLineWidth}
              min={0}
              step={1}
              onvalueChanged={(event: NumberChangedEvent) =>
                setYAxisLineWidth(event.detail.value)
              }
            />
          </oj-form-layout>

          <div class="oj-typography-subheading-xs oj-sm-margin-2x-vertical">majorTick</div>
          <oj-form-layout aria-controls="polarLineChart polarBubbleChart" maxColumns={2}>
            <oj-input-text
              id="yMajorTickColor"
              labelHint="lineColor"
              value={yMajorTickColor}
              onvalueChanged={(event: TextChangedEvent) => setYMajorTickColor(event.detail.value)}
            />
            <oj-input-number
              id="yMajorTickWidth"
              labelHint="lineWidth"
              value={yMajorTickWidth}
              min={0}
              step={1}
              onvalueChanged={(event: NumberChangedEvent) =>
                setYMajorTickWidth(event.detail.value)
              }
            />
            <demo-select-enum
              id="yMajorTickStyle"
              labelHint="lineStyle"
              value={yMajorTickStyle}
              onvalueChanged={(event: JetElementCustomEvent<LineStyle>) =>
                setYMajorTickStyle(event.detail.value)
              }
              enumValues={["solid","dashed","dotted"]}
            />
          </oj-form-layout>

          <div class="oj-typography-subheading-xs oj-sm-margin-2x-vertical">Plot Area</div>
          <oj-form-layout aria-controls="polarLineChart polarBubbleChart" maxColumns={2}>
            <oj-input-text
              id="background"
              labelHint="backgroundColor"
              value={plotAreaColor}
              onvalueChanged={(event: TextChangedEvent) => setPlotAreaColor(event.detail.value)}
            />
            <oj-input-text
              id="borderColor"
              labelHint="borderColor"
              value={plotAreaBorderColor}
              onvalueChanged={(event: TextChangedEvent) =>
                setPlotAreaBorderColor(event.detail.value)
              }
            />
            <oj-input-number
              id="borderWidth"
              labelHint="borderWidth"
              value={plotAreaBorderWidth}
              min={0}
              step={1}
              onvalueChanged={(event: NumberChangedEvent) =>
                setPlotAreaBorderWidth(event.detail.value)
              }
            />
          </oj-form-layout>
        </div>
      </demo-tabs>
    </div>
  );
};

export default PolarChartStyles;

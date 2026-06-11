// @ts-nocheck
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicCoordData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import '../../../../../../jet-composites/demo-input-json/loader';
import '../../../../../../jet-composites/demo-select-enum/loader';
import '../../../../../../jet-composites/demo-tabs/loader';
import 'css!./demo.css';
type CurrentTab = 'seriesStyles' | 'textStyles' | 'plotAreaStyles';
type TextInputValue = ComponentProps<'oj-input-text'>['value'];
type NumberInputValue = ComponentProps<'oj-input-number'>['value'];
type MarkerShape = 'auto' | 'square' | 'circle' | 'diamond' | 'plus' | 'triangleDown' | 'triangleUp' | 'human' | 'star';
type TickStyle = 'solid' | 'dashed' | 'dotted';
type TickLabelPosition = 'outside' | 'inside';
type ChartTextStyle = {
    fontStyle: string;
    color: string;
};
type ScatterChartItem = {
    id: number;
    group: string;
    series: string;
    x: number;
    y: number;
};
const data = JSON.parse(dataText as string) as ScatterChartItem[];
export const ScatterChartStyles = () => {
    const [currentTab, setCurrentTab] = useState<CurrentTab>('seriesStyles');
    const [color1, setColor1] = useState<TextInputValue>('#267DB3');
    const [borderColor1, setBorderColor1] = useState<TextInputValue>('#0F3248');
    const [markerShape1, setMarkerShape1] = useState<MarkerShape>('human');
    const [markerSize1, setMarkerSize1] = useState<NumberInputValue>(20);
    const [plotAreaColor, setPlotAreaColor] = useState<TextInputValue>('#F2F2F2');
    const [plotAreaBorderColor, setPlotAreaBorderColor] = useState<TextInputValue>('#000000');
    const [plotAreaBorderWidth, setPlotAreaBorderWidth] = useState<NumberInputValue>(0);
    const [xTitle, setXTitle] = useState<TextInputValue>('X-Axis Title');
    const [xStyle, setXStyle] = useState<ChartTextStyle>({ fontStyle: 'italic', color: '#6070C7' });
    const [xMajorTickColor, setXMajorTickColor] = useState<TextInputValue>('#C4CED7');
    const [xMajorTickWidth, setXMajorTickWidth] = useState<NumberInputValue>(1);
    const [xMajorTickStyle, setXMajorTickStyle] = useState<TickStyle>('solid');
    const [xAxisLineColor, setXAxisLineColor] = useState<TextInputValue>('#9E9E9E');
    const [xAxisLineWidth, setXAxisLineWidth] = useState<NumberInputValue>(1);
    const [yTitle, setYTitle] = useState<TextInputValue>('Y-Axis Title');
    const [yStyle, setYStyle] = useState<ChartTextStyle>({ fontStyle: 'italic', color: '#6070C7' });
    const [yAxisLineColor, setYAxisLineColor] = useState<TextInputValue>('#9E9E9E');
    const [yAxisLineWidth, setYAxisLineWidth] = useState<NumberInputValue>(1);
    const [yMajorTickColor, setYMajorTickColor] = useState<TextInputValue>('#C4CED7');
    const [yMajorTickWidth, setYMajorTickWidth] = useState<NumberInputValue>(1);
    const [yMajorTickStyle, setYMajorTickStyle] = useState<TickStyle>('solid');
    const [yTickLabelPosition, setYTickLabelPosition] = useState<TickLabelPosition>('outside');
    const dataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'id'
    }), []);
    const plotArea = {
        backgroundColor: plotAreaColor,
        borderColor: plotAreaBorderColor,
        borderWidth: plotAreaBorderWidth
    };
    const xAxis = {
        title: xTitle,
        titleStyle: xStyle,
        axisLine: {
            lineColor: xAxisLineColor,
            lineWidth: xAxisLineWidth
        },
        majorTick: {
            lineColor: xMajorTickColor,
            lineWidth: xMajorTickWidth,
            lineStyle: xMajorTickStyle
        }
    };
    const yAxis = {
        title: yTitle,
        titleStyle: yStyle,
        axisLine: {
            lineColor: yAxisLineColor,
            lineWidth: yAxisLineWidth
        },
        majorTick: {
            lineColor: yMajorTickColor,
            lineWidth: yMajorTickWidth,
            lineStyle: yMajorTickStyle
        },
        tickLabel: {
            position: yTickLabelPosition
        }
    };
    const handleCurrentTabValueChanged = (event: JetElementCustomEvent<CurrentTab>) => {
        setCurrentTab(event.detail.value);
    };
    const handleColor1ValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setColor1(event.detail.value);
    };
    const handleBorderColor1ValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setBorderColor1(event.detail.value);
    };
    const handleMarkerShape1ValueChanged = (event: JetElementCustomEvent<MarkerShape>) => {
        setMarkerShape1(event.detail.value);
    };
    const handleMarkerSize1ValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
        setMarkerSize1(event.detail.value);
    };
    const handlePlotAreaColorValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setPlotAreaColor(event.detail.value);
    };
    const handlePlotAreaBorderColorValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setPlotAreaBorderColor(event.detail.value);
    };
    const handlePlotAreaBorderWidthValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
        setPlotAreaBorderWidth(event.detail.value);
    };
    const handleXTitleValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setXTitle(event.detail.value);
    };
    const handleXStyleValueChanged = (event: JetElementCustomEvent<ChartTextStyle>) => {
        setXStyle(event.detail.value);
    };
    const handleXMajorTickColorValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setXMajorTickColor(event.detail.value);
    };
    const handleXMajorTickWidthValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
        setXMajorTickWidth(event.detail.value);
    };
    const handleXMajorTickStyleValueChanged = (event: JetElementCustomEvent<TickStyle>) => {
        setXMajorTickStyle(event.detail.value);
    };
    const handleXAxisLineColorValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setXAxisLineColor(event.detail.value);
    };
    const handleXAxisLineWidthValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
        setXAxisLineWidth(event.detail.value);
    };
    const handleYTitleValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setYTitle(event.detail.value);
    };
    const handleYStyleValueChanged = (event: JetElementCustomEvent<ChartTextStyle>) => {
        setYStyle(event.detail.value);
    };
    const handleYAxisLineColorValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setYAxisLineColor(event.detail.value);
    };
    const handleYAxisLineWidthValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
        setYAxisLineWidth(event.detail.value);
    };
    const handleYMajorTickColorValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setYMajorTickColor(event.detail.value);
    };
    const handleYMajorTickWidthValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
        setYMajorTickWidth(event.detail.value);
    };
    const handleYMajorTickStyleValueChanged = (event: JetElementCustomEvent<TickStyle>) => {
        setYMajorTickStyle(event.detail.value);
    };
    const handleYTickLabelPositionValueChanged = (event: JetElementCustomEvent<TickLabelPosition>) => {
        setYTickLabelPosition(event.detail.value);
    };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => (<oj-chart-item x={item.data.x} y={item.data.y} groupId={[item.data.group]} seriesId={item.data.series}/>);
    const seriesTemplateRenderer = (series: DatavizSeriesTemplateContext) => (<oj-chart-series color={series.id === 'Series 1' ? color1 : undefined} borderColor={series.id === 'Series 1' ? borderColor1 : undefined} markerShape={series.id === 'Series 1' ? markerShape1 : undefined} markerSize={series.id === 'Series 1' ? markerSize1 : undefined}/>);
    const ojChartProps: Partial<ComponentProps<'oj-chart'>> = {
        'legend.position': 'bottom'
    };
    return (<div id="chart-container" class="oj-flex oj-sm-padding-1x oj-sm-flex-items-1">
      <div class="oj-flex-item oj-sm-12 oj-md-6">
        <oj-chart id="scatterChart" type="scatter" data={dataProvider} animationOnDataChange="auto" plotArea={plotArea} xAxis={xAxis} yAxis={yAxis} {...ojChartProps}>
          <template slot="itemTemplate" render={itemTemplateRenderer}/>
          <template slot="seriesTemplate" render={seriesTemplateRenderer}/>
        </oj-chart>
      </div>
      <demo-tabs class="oj-flex-item oj-sm-12 oj-md-6 demo-scatterchart-style-minheight" value={currentTab} onvalueChanged={handleCurrentTabValueChanged} headers={[{"id":"seriesStyles","label":"Series Styles"},{"id":"textStyles","label":"Text Styles"},{"id":"plotAreaStyles","label":"Plot Area Styles"}]}>
        <div class="oj-sm-padding-1x">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Series Attributes - Series 1</div>
          <oj-form-layout aria-controls="scatterChart" maxColumns={2}>
            <oj-input-text labelHint="color" id="color" value={color1} onvalueChanged={handleColor1ValueChanged}/>
            <oj-input-text labelHint="borderColor" id="borderColor1" value={borderColor1} onvalueChanged={handleBorderColor1ValueChanged}/>
            <oj-input-number labelHint="markerSize" min={0} id="markerSize1" value={markerSize1} onvalueChanged={handleMarkerSize1ValueChanged}/>
            <demo-select-enum labelHint="markerShape" id="markerShape" aria-controls="scatterChart" value={markerShape1} onvalueChanged={handleMarkerShape1ValueChanged} enumValues={["auto","square","circle","diamond","plus","triangleDown","triangleUp","human","star"]}/>
          </oj-form-layout>
        </div>

        <div class="oj-sm-padding-1x">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">X - Axis</div>
          <oj-form-layout maxColumns={2} aria-controls="scatterChart">
            <oj-input-text labelHint="title" id="xTitle" value={xTitle} onvalueChanged={handleXTitleValueChanged}/>
            <demo-input-json labelHint="titleStyle" id="xStyle" value={xStyle} onvalueChanged={handleXStyleValueChanged}/>
          </oj-form-layout>

          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Y - Axis</div>
          <oj-form-layout maxColumns={2} aria-controls="scatterChart">
            <oj-input-text labelHint="title" id="yTitle" value={yTitle} onvalueChanged={handleYTitleValueChanged}/>
            <demo-input-json labelHint="titleStyle" id="yStyle" value={yStyle} onvalueChanged={handleYStyleValueChanged}/>
          </oj-form-layout>
        </div>

        <div class="oj-sm-padding-1x">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Plot Area</div>
          <oj-form-layout maxColumns={2} aria-controls="scatterChart">
            <oj-input-text id="background" labelHint="backgroundColor" value={plotAreaColor} onvalueChanged={handlePlotAreaColorValueChanged}/>
            <oj-input-text id="borderColor" labelHint="borderColor" value={plotAreaBorderColor} onvalueChanged={handlePlotAreaBorderColorValueChanged}/>
            <oj-input-number id="borderWidth" labelHint="borderWidth" min={0} value={plotAreaBorderWidth} onvalueChanged={handlePlotAreaBorderWidthValueChanged}/>
          </oj-form-layout>

          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">X-Axis</div>
          <div class="oj-typography-body-md oj-typography-bold oj-sm-margin-2x-vertical">axisLine</div>
          <oj-form-layout maxColumns={2} aria-controls="scatterChart">
            <oj-input-text labelHint="lineColor" id="xAxisLineColor" value={xAxisLineColor} onvalueChanged={handleXAxisLineColorValueChanged}/>
            <oj-input-number labelHint="lineWidth" id="xAxisLineWidth" min={0} value={xAxisLineWidth} onvalueChanged={handleXAxisLineWidthValueChanged}/>
          </oj-form-layout>

          <div class="oj-typography-body-md oj-typography-bold oj-sm-margin-2x-vertical">majorTick</div>
          <oj-form-layout maxColumns={2} aria-controls="scatterChart">
            <oj-input-text labelHint="lineColor" id="xMajorTickColor" value={xMajorTickColor} onvalueChanged={handleXMajorTickColorValueChanged}/>
            <oj-input-number labelHint="lineWidth" id="xMajorTickWidth" min={0} value={xMajorTickWidth} onvalueChanged={handleXMajorTickWidthValueChanged}/>
            <demo-select-enum labelHint="lineStyle" id="xMajorTickStyle" aria-controls="scatterChart" value={xMajorTickStyle} onvalueChanged={handleXMajorTickStyleValueChanged} enumValues={["solid","dashed","dotted"]}/>
          </oj-form-layout>

          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Y-Axis</div>
          <div class="oj-typography-body-md oj-typography-bold oj-sm-margin-2x-vertical">axisLine</div>
          <oj-form-layout maxColumns={2} aria-controls="scatterChart">
            <oj-input-text labelHint="lineColor" id="yAxisLineColor" value={yAxisLineColor} onvalueChanged={handleYAxisLineColorValueChanged}/>
            <oj-input-number labelHint="lineWidth" id="yAxisLineWidth" min={0} value={yAxisLineWidth} onvalueChanged={handleYAxisLineWidthValueChanged}/>
          </oj-form-layout>

          <div class="oj-typography-body-md oj-typography-bold oj-sm-margin-2x-vertical">majorTick</div>
          <oj-form-layout maxColumns={2} aria-controls="scatterChart">
            <oj-input-text labelHint="lineColor" id="yMajorTickColor" value={yMajorTickColor} onvalueChanged={handleYMajorTickColorValueChanged}/>
            <oj-input-number labelHint="lineWidth" id="yMajorTickWidth" min={0} value={yMajorTickWidth} onvalueChanged={handleYMajorTickWidthValueChanged}/>
            <demo-select-enum labelHint="lineStyle" id="yMajorTickStyle" aria-controls="scatterChart" value={yMajorTickStyle} onvalueChanged={handleYMajorTickStyleValueChanged} enumValues={["solid","dashed","dotted"]}/>
            <demo-select-enum labelHint="position" id="yTickLabelPosition" aria-controls="scatterChart" value={yTickLabelPosition} onvalueChanged={handleYTickLabelPositionValueChanged} enumValues={["outside","inside"]}/>
          </oj-form-layout>
        </div>
      </demo-tabs>
    </div>);
};
export default ScatterChartStyles;

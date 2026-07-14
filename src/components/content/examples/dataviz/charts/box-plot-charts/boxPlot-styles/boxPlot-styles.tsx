import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import 'ojs/ojtoolbar';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/boxPlotTwoSeriesData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-input-json/loader';
import '../../../../../../jet-composites/demo-select-enum/loader';
import '../../../../../../jet-composites/demo-tabs/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type CurrentTab = 'barStyles' | 'seriesStyles' | 'textStyles' | 'plotAreaStyles';
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ChartPlotArea = NonNullable<ComponentProps<'oj-chart'>['plotArea']>;
type ChartStyleDefaults = NonNullable<ComponentProps<'oj-chart'>['styleDefaults']>;
type ChartXAxis = NonNullable<ComponentProps<'oj-chart'>['xAxis']>;
type ChartYAxis = NonNullable<ComponentProps<'oj-chart'>['yAxis']>;
type ChartLegend = NonNullable<ComponentProps<'oj-chart'>['legend']>;
type TextInputValue = ComponentProps<'oj-input-text'>['value'];
type NumberInputValue = ComponentProps<'oj-input-number'>['value'];
type Pattern = 'auto' | 'smallChecker' | 'largeTriangle' | 'largeDiagonalRight' | 'largeDiamond' | 'smallCrosshatch' | 'largeDiagonalLeft' | 'largeCrosshatch' | 'smallDiagonalLeft' | 'smallDiagonalRight' | 'smallDiamond' | 'smallTriangle' | 'largeChecker';
type MarkerShape = 'auto' | 'square' | 'circle' | 'diamond' | 'plus' | 'triangleDown' | 'triangleUp' | 'human' | 'star';
type TickStyle = 'solid' | 'dashed' | 'dotted';
type TickLabelPosition = 'outside' | 'inside';
type ChartTextStyle = {
    fontStyle: string;
    color: string;
};
type SvgStyle = {
    strokeWidth: string;
    stroke: string;
};
type BoxPlotItem = {
    id: number;
    group: string;
    series: string;
    low: number;
    high: number;
    q1: number;
    q2: number;
    q3: number;
    outliers: number[];
};
type ItemTemplateContext = {
    data: BoxPlotItem;
};
type SeriesTemplateContext = {
    id: string;
};

const toOptionalNumber = (value: NumberInputValue): number | undefined => value ?? undefined;
const data = JSON.parse(dataText as string) as BoxPlotItem[];
export const BoxPlotStyles = () => {
    const [currentTab, setCurrentTab] = useState<CurrentTab>('barStyles');
    const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
    const [barGapRatio, setBarGapRatio] = useState<NumberInputValue>(0.3);
    const [maxBarWidth, setMaxBarWidth] = useState<NumberInputValue>(16);
    const [color1, setColor1] = useState<TextInputValue>('#8561C8');
    const [borderColor1, setBorderColor1] = useState<TextInputValue>('#0F3248');
    const [pattern1, setPattern1] = useState<Pattern>('smallChecker');
    const [q2Color, setQ2Color] = useState<TextInputValue>('#8561C8');
    const [q3Color, setQ3Color] = useState<TextInputValue>('#0000FF');
    const [markerColor, setMarkerColor] = useState<TextInputValue>('#CCCCCC');
    const [markerShape, setMarkerShape] = useState<MarkerShape>('auto');
    const [markerSize, setMarkerSize] = useState<NumberInputValue>(10);
    const [whiskerLine, setWhiskerLine] = useState<SvgStyle>({
        strokeWidth: '3px',
        stroke: '#00FF00'
    });
    const [whiskerEndLine, setWhiskerEndLine] = useState<SvgStyle>({
        strokeWidth: '5px',
        stroke: '#00FFFF'
    });
    const [whiskerEndLength, setWhiskerEndLength] = useState<TextInputValue>('100%');
    const [medianLine, setMedianLine] = useState<SvgStyle>({
        strokeWidth: '3px',
        stroke: '#00FF00'
    });
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
    const [yMajorTickStyle, setYMajorTickStyle] = useState<TickStyle>('solid');
    const [yTickLabelPosition, setYTickLabelPosition] = useState<TickLabelPosition>('outside');
    const dataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'id'
    }), []);
    const plotArea = useMemo<ChartPlotArea>(() => {
        return {
            backgroundColor: plotAreaColor ?? undefined,
            borderColor: plotAreaBorderColor ?? undefined,
            borderWidth: toOptionalNumber(plotAreaBorderWidth)
        };
    }, [plotAreaBorderColor, plotAreaBorderWidth, plotAreaColor]);
    const xAxis = useMemo<ChartXAxis>(() => {
        return {
            title: xTitle ?? undefined,
            titleStyle: xStyle,
            axisLine: {
                lineColor: xAxisLineColor ?? undefined,
                lineWidth: toOptionalNumber(xAxisLineWidth)
            }
        };
    }, [xAxisLineColor, xAxisLineWidth, xStyle, xTitle]);
    const yAxis = useMemo<ChartYAxis>(() => {
        return {
            title: yTitle ?? undefined,
            titleStyle: yStyle,
            majorTick: {
                lineColor: yMajorTickColor ?? undefined,
                lineWidth: toOptionalNumber(yMajorTickWidth),
                lineStyle: yMajorTickStyle
            },
            tickLabel: {
                position: yTickLabelPosition
            }
        };
    }, [yMajorTickColor, yMajorTickStyle, yMajorTickWidth, yStyle, yTickLabelPosition, yTitle]);
    const styleDefaults = useMemo<ChartStyleDefaults>(() => {
        return {
            barGapRatio: toOptionalNumber(barGapRatio),
            maxBarWidth: toOptionalNumber(maxBarWidth)
        };
    }, [barGapRatio, maxBarWidth]);
    const legend = useMemo<ChartLegend>(() => {
        return {
            position: 'bottom'
        };
    }, []);
    const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
        setOrientationValue(event.detail.value);
    };
    const handleCurrentTabValueChanged = (event: JetElementCustomEvent<CurrentTab>) => {
        setCurrentTab(event.detail.value);
    };
    const handleBarGapRatioValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
        setBarGapRatio(event.detail.value);
    };
    const handleMaxBarWidthValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
        setMaxBarWidth(event.detail.value);
    };
    const handleColor1ValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setColor1(event.detail.value);
    };
    const handlePattern1ValueChanged = (event: JetElementCustomEvent<Pattern>) => {
        setPattern1(event.detail.value);
    };
    const handleBorderColor1ValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setBorderColor1(event.detail.value);
    };
    const handleQ2ColorValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setQ2Color(event.detail.value);
    };
    const handleQ3ColorValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setQ3Color(event.detail.value);
    };
    const handleMarkerColorValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setMarkerColor(event.detail.value);
    };
    const handleMarkerSizeValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
        setMarkerSize(event.detail.value);
    };
    const handleMarkerShapeValueChanged = (event: JetElementCustomEvent<MarkerShape>) => {
        setMarkerShape(event.detail.value);
    };
    const handleMedianLineValueChanged = (event: JetElementCustomEvent<SvgStyle>) => {
        setMedianLine(event.detail.value);
    };
    const handleWhiskerLineValueChanged = (event: JetElementCustomEvent<SvgStyle>) => {
        setWhiskerLine(event.detail.value);
    };
    const handleWhiskerEndLineValueChanged = (event: JetElementCustomEvent<SvgStyle>) => {
        setWhiskerEndLine(event.detail.value);
    };
    const handleWhiskerEndLengthValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setWhiskerEndLength(event.detail.value);
    };
    const handleXTitleValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setXTitle(event.detail.value);
    };
    const handleXStyleValueChanged = (event: JetElementCustomEvent<ChartTextStyle>) => {
        setXStyle(event.detail.value);
    };
    const handleYTitleValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setYTitle(event.detail.value);
    };
    const handleYStyleValueChanged = (event: JetElementCustomEvent<ChartTextStyle>) => {
        setYStyle(event.detail.value);
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
    const handleXAxisLineColorValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setXAxisLineColor(event.detail.value);
    };
    const handleXAxisLineWidthValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
        setXAxisLineWidth(event.detail.value);
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
    const itemTemplateRenderer = (item: ItemTemplateContext) => {
        return <oj-chart-item low={item.data.low} high={item.data.high} q1={item.data.q1} q2={item.data.q2} q3={item.data.q3} items={item.data.outliers} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    const seriesTemplateRenderer = (series: SeriesTemplateContext) => {
        const ojChartSeriesProps: Partial<ComponentProps<'oj-chart-series'>> = { boxPlot: {
                q2Color: series.id === 'Series 1' ? q2Color : undefined,
                q3Color: series.id === 'Series 1' ? q3Color : undefined,
                whiskerEndLength: series.id === 'Series 1' && whiskerEndLength ? whiskerEndLength : undefined
            } };
        return <oj-chart-series color={series.id === 'Series 1' ? color1 : undefined} borderColor={series.id === 'Series 1' ? borderColor1 : undefined} markerColor={series.id === 'Series 1' ? markerColor : undefined} markerSize={series.id === 'Series 1' ? toOptionalNumber(markerSize) : undefined} markerShape={series.id === 'Series 1' ? markerShape : undefined} pattern={series.id === 'Series 1' ? pattern1 : undefined} {...ojChartSeriesProps}/>;
    };
    return (<div id="chart-container" class="oj-flex oj-sm-padding-1x oj-sm-flex-items-1">
            <div class="oj-flex-item">
                    <oj-chart id="boxPlot" type="boxPlot" data={dataProvider} animationOnDataChange="auto" orientation={orientationValue} plotArea={plotArea} styleDefaults={styleDefaults} xAxis={xAxis} yAxis={yAxis} legend={legend}>
                              <template slot="itemTemplate" render={itemTemplateRenderer}/>
                              <template slot="seriesTemplate" render={seriesTemplateRenderer}/>
                          </oj-chart>
                    <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="boxPlot">
                              <demo-chart-orientation-control id="orientationControl" type="boxPlot" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue}/>
                          </oj-toolbar>
                </div>
            <demo-tabs class="oj-flex-item" headers={[
                { id: "barStyles", label: "Box Styles" },
                { id: "seriesStyles", label: "Series Styles" },
                { id: "textStyles", label: "Text Styles" },
                { id: "plotAreaStyles", label: "Plot Area Styles" }
            ]} onvalueChanged={handleCurrentTabValueChanged} value={currentTab}>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-bold oj-sm-margin-2x-vertical">Bar Style Attributes</div>
                              <oj-form-layout maxColumns={2} aria-controls="boxPlot">
                                          <oj-input-number id="barGapRatio" max={1} min={0} step={0.1} onvalueChanged={handleBarGapRatioValueChanged} value={barGapRatio} labelHint="barGapRatio"/>
                                          <oj-input-number id="maxBarWidth" min={0} step={2} onvalueChanged={handleMaxBarWidthValueChanged} value={maxBarWidth} labelHint="maxBarWidth"/>
                                      </oj-form-layout>
                          </div>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-bold oj-sm-margin-2x-vertical">Series Attributes - Series 1</div>
                              <oj-form-layout maxColumns={2} aria-controls="boxPlot">
                                          <oj-input-text id="color1" onvalueChanged={handleColor1ValueChanged} value={color1} labelHint="color"/>
                                          <demo-select-enum id="pattern" onvalueChanged={handlePattern1ValueChanged} value={pattern1} labelHint="pattern" enumValues={["auto", "smallChecker", "smallCrosshatch", "smallDiagonalLeft", "smallDiagonalRight", "smallDiamond", "smallTriangle", "largeChecker", "largeCrosshatch", "largeDiagonalLeft", "largeDiagonalRight", "largeDiamond", "largeTriangle"]}/>
                                          <oj-input-text id="borderColor1" onvalueChanged={handleBorderColor1ValueChanged} value={borderColor1} labelHint="borderColor"/>
                                          <oj-input-text id="q2Color" onvalueChanged={handleQ2ColorValueChanged} value={q2Color} labelHint="q2Color"/>
                                          <oj-input-text id="q3Color" onvalueChanged={handleQ3ColorValueChanged} value={q3Color} labelHint="q3Color"/>
                                          <oj-input-text id="markerColor" onvalueChanged={handleMarkerColorValueChanged} value={markerColor} labelHint="markerColor"/>
                                          <oj-input-number id="markerSize" min={0} onvalueChanged={handleMarkerSizeValueChanged} value={markerSize} labelHint="markerSize"/>
                                          <demo-select-enum id="markerShape" onvalueChanged={handleMarkerShapeValueChanged} value={markerShape} labelHint="markerShape" enumValues={["auto", "square", "circle", "diamond", "plus", "triangleDown", "triangleUp", "human", "star"]}/>
                                          <demo-input-json id="medianLine" onvalueChanged={handleMedianLineValueChanged} value={medianLine} labelHint="medianStyle"/>
                                          <demo-input-json id="whiskerLine" onvalueChanged={handleWhiskerLineValueChanged} value={whiskerLine} labelHint="whiskerSvgStyle"/>
                                          <demo-input-json id="whiskerEndLine" onvalueChanged={handleWhiskerEndLineValueChanged} value={whiskerEndLine} labelHint="whiskerEndSvgStyle"/>
                                          <oj-input-text id="whiskerEndLength" onvalueChanged={handleWhiskerEndLengthValueChanged} value={whiskerEndLength} labelHint="whiskerEndLength"/>
                                      </oj-form-layout>
                          </div>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-bold oj-sm-margin-2x-vertical">X-Axis</div>
                              <oj-form-layout maxColumns={2} aria-controls="boxPlot">
                                          <oj-input-text id="xTitle" onvalueChanged={handleXTitleValueChanged} value={xTitle} labelHint="title"/>
                                          <demo-input-json id="xStyle" onvalueChanged={handleXStyleValueChanged} value={xStyle} labelHint="titleStyle"/>
                                      </oj-form-layout>
                              <div class="oj-typography-bold oj-sm-margin-2x-vertical">Y-Axis</div>
                              <oj-form-layout maxColumns={2} aria-controls="boxPlot">
                                          <oj-input-text id="yTitle" onvalueChanged={handleYTitleValueChanged} value={yTitle} labelHint="title"/>
                                          <demo-input-json id="yStyle" onvalueChanged={handleYStyleValueChanged} value={yStyle} labelHint="titleStyle"/>
                                      </oj-form-layout>
                          </div>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-bold oj-sm-margin-2x-vertical">Plot Area</div>
                              <oj-form-layout maxColumns={2} aria-controls="boxPlot">
                                          <oj-input-text id="background" onvalueChanged={handlePlotAreaColorValueChanged} value={plotAreaColor} labelHint="backgroundColor"/>
                                          <oj-input-text id="borderColor" onvalueChanged={handlePlotAreaBorderColorValueChanged} value={plotAreaBorderColor} labelHint="borderColor"/>
                                          <oj-input-number id="borderWidth" min={0} onvalueChanged={handlePlotAreaBorderWidthValueChanged} value={plotAreaBorderWidth} labelHint="borderWidth"/>
                                      </oj-form-layout>
                              <div class="oj-typography-bold oj-sm-margin-2x-vertical">X-Axis</div>
                              <div class="oj-typography-bold oj-sm-margin-2x-vertical">axisLine</div>
                              <oj-form-layout maxColumns={2} aria-controls="boxPlot">
                                          <oj-input-text id="xAxisLineColor" onvalueChanged={handleXAxisLineColorValueChanged} value={xAxisLineColor} labelHint="lineColor"/>
                                          <oj-input-number id="xAxisLineWidth" min={0} onvalueChanged={handleXAxisLineWidthValueChanged} value={xAxisLineWidth} labelHint="lineWidth"/>
                                      </oj-form-layout>
                              <div class="oj-typography-bold oj-sm-margin-2x-vertical">Y-Axis</div>
                              <div class="oj-typography-bold oj-sm-margin-2x-vertical">majorTick</div>
                              <oj-form-layout maxColumns={2} aria-controls="boxPlot">
                                          <oj-input-text id="yMajorTickColor" onvalueChanged={handleYMajorTickColorValueChanged} value={yMajorTickColor} labelHint="lineColor"/>
                                          <oj-input-number id="yMajorTickWidth" min={0} onvalueChanged={handleYMajorTickWidthValueChanged} value={yMajorTickWidth} labelHint="lineWidth"/>
                                          <demo-select-enum id="yMajorTickStyle" onvalueChanged={handleYMajorTickStyleValueChanged} value={yMajorTickStyle} labelHint="lineStyle" enumValues={["solid", "dashed", "dotted"]}/>
                                      </oj-form-layout>
                              <div class="oj-typography-bold oj-sm-margin-2x-vertical">tickLabel</div>
                              <oj-form-layout maxColumns={2} aria-controls="boxPlot">
                                          <demo-select-enum id="yTickLabelPosition" onvalueChanged={handleYTickLabelPositionValueChanged} value={yTickLabelPosition} labelHint="position" enumValues={["outside", "inside"]}/>
                                      </oj-form-layout>
                          </div>
                </demo-tabs>
        </div>);
};
export default BoxPlotStyles;

import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as quarterDataText from 'text!../../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojchart';
import 'ojs/ojinputtext';
import 'ojs/ojinputnumber';
import 'ojs/ojtoolbar';
import 'ojs/ojformlayout';
import '../../../../../../../jet-composites/demo-select-enum/loader';
import '../../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../../jet-composites/demo-chart-stack-control/loader';
import '../../../../../../../jet-composites/demo-tabs/loader';
import '../../../../../../../jet-composites/demo-input-json/loader';
type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ChartPlotArea = NonNullable<ComponentProps<'oj-chart'>['plotArea']>;
type ChartXAxis = NonNullable<ComponentProps<'oj-chart'>['xAxis']>;
type ChartYAxis = NonNullable<ComponentProps<'oj-chart'>['yAxis']>;
type ChartLegend = NonNullable<ComponentProps<'oj-chart'>['legend']>;
type TextInputValue = ComponentProps<'oj-input-text'>['value'];
type NumberInputValue = ComponentProps<'oj-input-number'>['value'];
type CurrentTab = 'seriesStyles' | 'textStyles' | 'plotAreaStyles';
type Pattern = 'auto' | 'smallChecker' | 'largeTriangle' | 'largeDiagonalRight' | 'largeDiamond' | 'smallCrosshatch' | 'largeDiagonalLeft' | 'largeCrosshatch' | 'smallDiagonalLeft' | 'smallDiagonalRight' | 'smallDiamond' | 'smallTriangle' | 'largeChecker';
type MarkerDisplayed = 'on' | 'off';
type MarkerShape = 'auto' | 'square' | 'circle' | 'diamond' | 'plus' | 'triangleDown' | 'triangleUp' | 'human' | 'star';
type TickStyle = 'solid' | 'dashed' | 'dotted';
type TickLabelPosition = 'outside' | 'inside';
type ChartTextStyle = {
    fontStyle: string;
    color: string;
};
type AreaChartItem = {
    id: number;
    quarter: string;
    series: string;
    value: number;
};
type ItemTemplateContext = {
    data: AreaChartItem;
};
type SeriesTemplateContext = {
    id: string;
};

const toOptionalNumber = (value: NumberInputValue): number | undefined => value ?? undefined;
const quarterData = JSON.parse(quarterDataText as string) as AreaChartItem[];
export const AreaChartStyles = () => {
    const [currentTab, setCurrentTab] = useState<CurrentTab>('seriesStyles');
    const [stackValue, setStackValue] = useState<ChartStack>('off');
    const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
    const [color1, setColor1] = useState<TextInputValue>('#ED6647');
    const [borderColor1, setBorderColor1] = useState<TextInputValue>('#0F3248');
    const [borderWidth1, setBorderWidth1] = useState<NumberInputValue>(1);
    const [pattern1, setPattern1] = useState<Pattern>('smallChecker');
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
    const [yMajorTickStyle, setYMajorTickStyle] = useState<TickStyle>('solid');
    const [yTickLabelPosition, setYTickLabelPosition] = useState<TickLabelPosition>('outside');
    const dataProvider = useMemo(() => new ArrayDataProvider(quarterData, {
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
    const legend = useMemo<ChartLegend>(() => {
        return {
            position: 'bottom'
        };
    }, []);
    const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
        setOrientationValue(event.detail.value);
    };
    const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
        setStackValue(event.detail.value);
    };
    const handleCurrentTabValueChanged = (event: JetElementCustomEvent<CurrentTab>) => {
        setCurrentTab(event.detail.value);
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
    const handleBorderWidth1ValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
        setBorderWidth1(event.detail.value);
    };
    const handleMarkerDisplayedValueChanged = (event: JetElementCustomEvent<MarkerDisplayed>) => {
        setMarkerDisplayed(event.detail.value);
    };
    const handleMarkerShapeValueChanged = (event: JetElementCustomEvent<MarkerShape>) => {
        setMarkerShape(event.detail.value);
    };
    const handleMarkerColorValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setMarkerColor(event.detail.value);
    };
    const handleMarkerSizeValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
        setMarkerSize(event.detail.value);
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
        return <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series}/>;
    };
    const seriesTemplateRenderer = (series: SeriesTemplateContext) => {
        return <oj-chart-series color={series.id === 'Series 4' ? color1 : undefined} borderColor={series.id === 'Series 4' ? borderColor1 : undefined} borderWidth={series.id === 'Series 4' ? toOptionalNumber(borderWidth1) : undefined} markerDisplayed={series.id === 'Series 4' ? markerDisplayed : undefined} markerShape={series.id === 'Series 4' ? markerShape : undefined} markerColor={series.id === 'Series 4' ? markerColor : undefined} markerSize={series.id === 'Series 4' ? toOptionalNumber(markerSize) : undefined} pattern={series.id === 'Series 4' ? pattern1 : undefined}/>;
    };
    return (<div id="chart-container" class="oj-flex oj-sm-padding-1x oj-sm-flex-items-1">
            <div class="oj-flex-item">
                    <oj-chart id="areaChart" type="area" orientation={orientationValue} data={dataProvider} animationOnDataChange="auto" plotArea={plotArea} selectionMode="multiple" yAxis={yAxis} xAxis={xAxis} stack={stackValue} legend={legend}>
                              <template slot="itemTemplate" render={itemTemplateRenderer}/>
                              <template slot="seriesTemplate" render={seriesTemplateRenderer}/>
                          </oj-chart>
                    <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="areaChart">
                              <demo-chart-orientation-control id="orientationControl" type="area" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue}/>
                              <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator"/>
                              <demo-chart-stack-control id="stackControl" type="area" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue}/>
                          </oj-toolbar>
                </div>
            <demo-tabs class="oj-flex-item" headers={[{ id: "seriesStyles", label: "Series Styles" }, { id: "textStyles", label: "Text Styles" }, { id: "plotAreaStyles", label: "Plot Area Styles" }]} onvalueChanged={handleCurrentTabValueChanged} value={currentTab}>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Series Attributes - Series 4</div>
                              <oj-form-layout maxColumns={2} aria-controls="areaChart">
                                          <oj-input-text onvalueChanged={handleColor1ValueChanged} value={color1} labelHint="color"/>
                                          <demo-select-enum labelHint="pattern" onvalueChanged={handlePattern1ValueChanged} value={pattern1} enumValues={["auto", "smallChecker", "largeTriangle", "largeDiagonalRight", "largeDiamond", "smallCrosshatch", "largeDiagonalLeft", "largeCrosshatch", "smallDiagonalLeft", "smallDiagonalRight", "smallDiamond", "smallTriangle", "largeChecker"]}/>
                                          <oj-input-text labelHint="borderColor" onvalueChanged={handleBorderColor1ValueChanged} value={borderColor1}/>
                                          <oj-input-number labelHint="borderWidth" onvalueChanged={handleBorderWidth1ValueChanged} value={borderWidth1}/>
                                          <demo-select-enum onvalueChanged={handleMarkerDisplayedValueChanged} value={markerDisplayed} enumValues={["on", "off"]} labelHint="markerDisplayed"/>
                                          <demo-select-enum onvalueChanged={handleMarkerShapeValueChanged} value={markerShape} enumValues={["auto", "square", "circle", "diamond", "plus", "triangleDown", "triangleUp", "human", "star"]} labelHint="markerShape"/>
                                          <oj-input-text labelHint="markerColor" onvalueChanged={handleMarkerColorValueChanged} value={markerColor}/>
                                          <oj-input-number labelHint="markerSize" onvalueChanged={handleMarkerSizeValueChanged} value={markerSize}/>
                                      </oj-form-layout>
                          </div>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">X - Axis</div>
                              <oj-form-layout maxColumns={2} aria-controls="areaChart">
                                          <oj-input-text labelHint="title" onvalueChanged={handleXTitleValueChanged} value={xTitle}/>
                                          <demo-input-json labelHint="titleStyle" onvalueChanged={handleXStyleValueChanged} value={xStyle}/>
                                      </oj-form-layout>
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Y - Axis</div>
                              <oj-form-layout maxColumns={2} aria-controls="areaChart">
                                          <oj-input-text labelHint="title" onvalueChanged={handleYTitleValueChanged} value={yTitle}/>
                                          <demo-input-json labelHint="titleStyle" onvalueChanged={handleYStyleValueChanged} value={yStyle}/>
                                      </oj-form-layout>
                          </div>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Plot Area</div>
                              <oj-form-layout maxColumns={2} aria-controls="areaChart">
                                          <oj-input-text labelHint="background" onvalueChanged={handlePlotAreaColorValueChanged} value={plotAreaColor}/>
                                          <oj-input-text labelHint="borderColor" onvalueChanged={handlePlotAreaBorderColorValueChanged} value={plotAreaBorderColor}/>
                                          <oj-input-number labelHint="borderWidth" onvalueChanged={handlePlotAreaBorderWidthValueChanged} value={plotAreaBorderWidth}/>
                                      </oj-form-layout>
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">X Axis axisline</div>
                              <oj-form-layout maxColumns={2} aria-controls="areaChart">
                                          <oj-input-text labelHint="xAxisLineColor" onvalueChanged={handleXAxisLineColorValueChanged} value={xAxisLineColor}/>
                                          <oj-input-number labelHint="xAxisLineWidth" onvalueChanged={handleXAxisLineWidthValueChanged} value={xAxisLineWidth}/>
                                      </oj-form-layout>
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Y axis majorTick</div>
                              <oj-form-layout maxColumns={2} aria-controls="areaChart">
                                          <oj-input-text labelHint="lineColor" onvalueChanged={handleYMajorTickColorValueChanged} value={yMajorTickColor}/>
                                          <oj-input-number labelHint="yMajorTickWidth" onvalueChanged={handleYMajorTickWidthValueChanged} value={yMajorTickWidth}/>
                                          <demo-select-enum onvalueChanged={handleYMajorTickStyleValueChanged} value={yMajorTickStyle} enumValues={["solid", "dashed", "dotted"]} labelHint="lineStyle"/>
                                          <demo-select-enum labelHint="position" onvalueChanged={handleYTickLabelPositionValueChanged} value={yTickLabelPosition} enumValues={["outside", "inside"]}/>
                                      </oj-form-layout>
                          </div>
                </demo-tabs>
        </div>);
};
export default AreaChartStyles;

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
import '../../../../../../jet-composites/demo-select-enum/loader';
import '../../../../../../jet-composites/demo-tabs/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type SelectedTab = 'comboStyles' | 'seriesStyles' | 'textStyles' | 'plotAreaStyles';
type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ChartPlotArea = NonNullable<ComponentProps<'oj-chart'>['plotArea']>;
type ChartStyleDefaults = NonNullable<ComponentProps<'oj-chart'>['styleDefaults']>;
type ChartXAxis = NonNullable<ComponentProps<'oj-chart'>['xAxis']>;
type ChartYAxis = NonNullable<ComponentProps<'oj-chart'>['yAxis']>;
type ChartLegend = NonNullable<ComponentProps<'oj-chart'>['legend']>;
type TextInputValue = ComponentProps<'oj-input-text'>['value'];
type NumberInputValue = ComponentProps<'oj-input-number'>['value'];
type Pattern = 'auto' | 'smallChecker' | 'largeTriangle' | 'largeDiagonalRight' | 'largeDiamond' | 'smallCrosshatch' | 'largeDiagonalLeft' | 'largeCrosshatch' | 'smallDiagonalLeft' | 'smallDiagonalRight' | 'smallDiamond' | 'smallTriangle' | 'largeChecker';
type LineStyle = 'solid' | 'dashed' | 'dotted';
type MarkerShape = 'auto' | 'square' | 'circle' | 'diamond' | 'plus' | 'triangleDown' | 'triangleUp' | 'human' | 'star';
type TickLabelPosition = 'outside' | 'inside';
type ChartTextStyle = {
    fontStyle: string;
    color: string;
};
type CombinationChartItem = {
    id: number;
    quarter: string;
    series: string;
    value: number;
};
type ItemTemplateContext = {
    data: CombinationChartItem;
};
type SeriesTemplateContext = {
    id: string;
};

const toOptionalNumber = (value: NumberInputValue): number | undefined => value ?? undefined;
const quarterData = JSON.parse(quarterDataText as string) as CombinationChartItem[];
export const CombinationChartStyles = () => {
    const [selectedTab, setSelectedTab] = useState<SelectedTab>('comboStyles');
    const [stackValue, setStackValue] = useState<ChartStack>('off');
    const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
    const [color1, setColor1] = useState<TextInputValue>('#ED6647');
    const [borderColor1, setBorderColor1] = useState<TextInputValue>('#0F3248');
    const [pattern1, setPattern1] = useState<Pattern>('smallChecker');
    const [color2, setColor2] = useState<TextInputValue>('#FAD55C');
    const [borderColor2, setBorderColor2] = useState<TextInputValue>('#0F3248');
    const [pattern2, setPattern2] = useState<Pattern>('largeChecker');
    const [lineColor, setLineColor] = useState<TextInputValue>('#68C182');
    const [lineWidth, setLineWidth] = useState<NumberInputValue>(3);
    const [lineStyle, setLineStyle] = useState<LineStyle>('solid');
    const [markerColor, setMarkerColor] = useState<TextInputValue>('#68C182');
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
    const [barGapRatio, setBarGapRatio] = useState<NumberInputValue>(0.3);
    const [maxBarWidth, setMaxBarWidth] = useState<NumberInputValue>(100);
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
    const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
        setStackValue(event.detail.value);
    };
    const handleSelectedTabValueChanged = (event: JetElementCustomEvent<SelectedTab>) => {
        setSelectedTab(event.detail.value);
    };
    const handleBarGapRatioValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
        setBarGapRatio(event.detail.value);
    };
    const handleMaxBarWidthValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
        setMaxBarWidth(event.detail.value);
    };
    const handleLineColorValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setLineColor(event.detail.value);
    };
    const handleLineWidthValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
        setLineWidth(event.detail.value);
    };
    const handleLineStyleValueChanged = (event: JetElementCustomEvent<LineStyle>) => {
        setLineStyle(event.detail.value);
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
    const handleColor2ValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setColor2(event.detail.value);
    };
    const handleBorderColor2ValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setBorderColor2(event.detail.value);
    };
    const handlePattern2ValueChanged = (event: JetElementCustomEvent<Pattern>) => {
        setPattern2(event.detail.value);
    };
    const handleColor1ValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setColor1(event.detail.value);
    };
    const handleBorderColor1ValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setBorderColor1(event.detail.value);
    };
    const handlePattern1ValueChanged = (event: JetElementCustomEvent<Pattern>) => {
        setPattern1(event.detail.value);
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
    const handleYMajorTickStyleValueChanged = (event: JetElementCustomEvent<LineStyle>) => {
        setYMajorTickStyle(event.detail.value);
    };
    const handleYTickLabelPositionValueChanged = (event: JetElementCustomEvent<TickLabelPosition>) => {
        setYTickLabelPosition(event.detail.value);
    };
    const itemTemplateRenderer = (item: ItemTemplateContext) => {
        return <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series}/>;
    };
    const seriesTemplateRenderer = (series: SeriesTemplateContext) => {
        return <oj-chart-series color={series.id === 'Series 2' ? lineColor : series.id === 'Series 3' ? color2 : series.id === 'Series 4' ? color1 : undefined} lineWidth={series.id === 'Series 2' ? toOptionalNumber(lineWidth) : undefined} lineStyle={series.id === 'Series 2' ? lineStyle : undefined} markerColor={series.id === 'Series 2' ? markerColor : undefined} markerShape={series.id === 'Series 2' ? markerShape : undefined} markerSize={series.id === 'Series 2' ? toOptionalNumber(markerSize) : undefined} markerDisplayed={series.id === 'Series 2' ? 'on' : undefined} pattern={series.id === 'Series 3' ? pattern2 : series.id === 'Series 4' ? pattern1 : undefined} borderColor={series.id === 'Series 3' ? borderColor2 : series.id === 'Series 4' ? borderColor1 : undefined}/>;
    };
    return (<div id="chart-container" class="oj-flex oj-sm-padding-1x oj-sm-flex-items-1">
            <div class="oj-flex-item">
                    <oj-chart id="comboChart" type="combo" data={dataProvider} animationOnDataChange="auto" orientation={orientationValue} plotArea={plotArea} stack={stackValue} styleDefaults={styleDefaults} xAxis={xAxis} yAxis={yAxis} legend={legend}>
                              <template slot="itemTemplate" render={itemTemplateRenderer}/>
                              <template slot="seriesTemplate" render={seriesTemplateRenderer}/>
                          </oj-chart>
                    <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="comboChart">
                              <demo-chart-orientation-control id="orientationControl" type="combo" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue}/>
                              <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator"/>
                              <demo-chart-stack-control id="stackControl" type="combo" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue}/>
                          </oj-toolbar>
                </div>
            <demo-tabs class="oj-flex-item" onvalueChanged={handleSelectedTabValueChanged} value={selectedTab} headers={[{"id":"comboStyles","label":"Combo Styles"},{"id":"seriesStyles","label":"Series Styles"},{"id":"textStyles","label":"Text Styles"},{"id":"plotAreaStyles","label":"Plot Area Styles"}]}>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Bar Styles Attributes</div>
                              <oj-form-layout aria-controls="comboChart" maxColumns={2}>
                                          <oj-input-number labelHint="barGapRatio" max={1} min={0} step={0.1} onvalueChanged={handleBarGapRatioValueChanged} value={barGapRatio}/>
                                          <oj-input-number labelHint="maxBarWidth" onvalueChanged={handleMaxBarWidthValueChanged} value={maxBarWidth}/>
                                      </oj-form-layout>
                          </div>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Series Attributes - Series 2</div>
                              <oj-form-layout aria-controls="comboChart" maxColumns={2}>
                                          <oj-input-text id="lineColor" labelHint="color" onvalueChanged={handleLineColorValueChanged} value={lineColor}/>
                                          <oj-input-number id="lineWidth" labelHint="lineWidth" onvalueChanged={handleLineWidthValueChanged} value={lineWidth}/>
                                          <demo-select-enum id="lineStyle" labelHint="lineStyle" onvalueChanged={handleLineStyleValueChanged} value={lineStyle} enumValues={["solid","dashed","dotted"]}/>
                                          <oj-input-text id="markerColor" labelHint="markerColor" onvalueChanged={handleMarkerColorValueChanged} value={markerColor}/>
                                          <oj-input-number id="markerSize" labelHint="markerSize" onvalueChanged={handleMarkerSizeValueChanged} value={markerSize}/>
                                          <demo-select-enum id="markerShape" onvalueChanged={handleMarkerShapeValueChanged} value={markerShape} enumValues={["auto","square","circle","diamond","plus","triangleDown","triangleUp","human","star"]}/>
                                      </oj-form-layout>
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Series Attributes - Series 3</div>
                              <oj-form-layout aria-controls="comboChart" maxColumns={2}>
                                          <oj-input-text id="color2" labelHint="color" onvalueChanged={handleColor2ValueChanged} value={color2}/>
                                          <oj-input-text id="borderColor2" labelHint="borderColor" onvalueChanged={handleBorderColor2ValueChanged} value={borderColor2}/>
                                          <demo-select-enum id="pattern2" labelHint="pattern" onvalueChanged={handlePattern2ValueChanged} value={pattern2} enumValues={["auto","smallChecker","smallCrosshatch","smallDiagonalLeft","smallDiagonalRight","smallDiamond","smallTriangle","largeChecker","largeCrosshatch","largeDiagonalLeft","largeDiagonalRight","largeDiamond","largeTriangle"]}/>
                                      </oj-form-layout>
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Series Attributes - Series 4</div>
                              <oj-form-layout aria-controls="comboChart" maxColumns={2}>
                                          <oj-input-text id="color1" labelHint="color" onvalueChanged={handleColor1ValueChanged} value={color1}/>
                                          <oj-input-text id="borderColor1" labelHint="borderColor" onvalueChanged={handleBorderColor1ValueChanged} value={borderColor1}/>
                                          <demo-select-enum id="pattern1" labelHint="pattern" onvalueChanged={handlePattern1ValueChanged} value={pattern1} enumValues={["auto","smallChecker","smallCrosshatch","smallDiagonalLeft","smallDiagonalRight","smallDiamond","smallTriangle","largeChecker","largeCrosshatch","largeDiagonalLeft","largeDiagonalRight","largeDiamond","largeTriangle"]}/>
                                      </oj-form-layout>
                          </div>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">X-Axis</div>
                              <oj-form-layout aria-controls="comboChart" maxColumns={2}>
                                          <oj-input-text id="xTitle" labelHint="title" onvalueChanged={handleXTitleValueChanged} value={xTitle}/>
                                          <demo-input-json id="xStyle" labelHint="titleStyle" onvalueChanged={handleXStyleValueChanged} value={xStyle}/>
                                      </oj-form-layout>
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Y-Axis</div>
                              <oj-form-layout aria-controls="comboChart" maxColumns={2}>
                                          <oj-input-text id="yTitle" labelHint="title" onvalueChanged={handleYTitleValueChanged} value={yTitle}/>
                                          <demo-input-json id="yStyle" labelHint="titleStyle" onvalueChanged={handleYStyleValueChanged} value={yStyle}/>
                                      </oj-form-layout>
                          </div>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Plot Area</div>
                              <oj-form-layout maxColumns={2} aria-controls="comboChart">
                                          <oj-input-text id="background" labelHint="backgroundColor" onvalueChanged={handlePlotAreaColorValueChanged} value={plotAreaColor}/>
                                          <oj-input-text id="borderColor" labelHint="borderColor" onvalueChanged={handlePlotAreaBorderColorValueChanged} value={plotAreaBorderColor}/>
                                          <oj-input-number id="borderWidth" labelHint="borderWidth" onvalueChanged={handlePlotAreaBorderWidthValueChanged} value={plotAreaBorderWidth}/>
                                      </oj-form-layout>
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">X-Axis</div>
                              <div class="oj-typography-body-md oj-typography-bold oj-sm-margin-2x-vertical">axisLine</div>
                              <oj-form-layout maxColumns={2} aria-controls="comboChart">
                                          <oj-input-text id="xAxisLineColor" labelHint="lineColor" onvalueChanged={handleXAxisLineColorValueChanged} value={xAxisLineColor}/>
                                          <oj-input-number id="xAxisLineWidth" labelHint="lineWidth" onvalueChanged={handleXAxisLineWidthValueChanged} value={xAxisLineWidth}/>
                                      </oj-form-layout>
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Y-Axis</div>
                              <div class="oj-typography-body-md oj-typography-bold oj-sm-margin-2x-vertical">majorTick</div>
                              <oj-form-layout maxColumns={2} aria-controls="comboChart">
                                          <oj-input-text id="yMajorTickColor" labelHint="lineColor" onvalueChanged={handleYMajorTickColorValueChanged} value={yMajorTickColor}/>
                                          <oj-input-number id="yMajorTickWidth" labelHint="lineWidth" onvalueChanged={handleYMajorTickWidthValueChanged} value={yMajorTickWidth}/>
                                          <demo-select-enum id="yMajorTickStyle" labelHint="lineStyle" onvalueChanged={handleYMajorTickStyleValueChanged} value={yMajorTickStyle} enumValues={["solid","dashed","dotted"]}/>
                                      </oj-form-layout>
                              <div class="oj-typography-body-md oj-typography-bold oj-sm-margin-2x-vertical">tickLabel</div>
                              <demo-select-enum id="yTickLabelPosition" labelHint="Position" onvalueChanged={handleYTickLabelPositionValueChanged} value={yTickLabelPosition} enumValues={["outside","inside"]}/>
                          </div>
                </demo-tabs>
        </div>);
};
export default CombinationChartStyles;

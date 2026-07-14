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
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import '../../../../../../jet-composites/demo-input-json/loader';
import '../../../../../../jet-composites/demo-select-enum/loader';
import '../../../../../../jet-composites/demo-tabs/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type CurrentTab = 'barStyles' | 'seriesStyles' | 'textStyles' | 'plotAreaStyles';
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
type TickStyle = 'solid' | 'dashed' | 'dotted';
type TickLabelPosition = 'outside' | 'inside';
type ChartTextStyle = {
    fontStyle: string;
    color: string;
};
type BarChartItem = {
    id: number;
    group: string;
    series: string;
    value: number;
};
type ItemTemplateContext = {
    data: BarChartItem;
};
type SeriesTemplateContext = {
    id: string;
};

const toOptionalNumber = (value: NumberInputValue): number | undefined => value ?? undefined;
const data = JSON.parse(dataText as string) as BarChartItem[];
export const BarChartStyles = () => {
    const [currentTab, setCurrentTab] = useState<CurrentTab>('barStyles');
    const [stackValue, setStackValue] = useState<ChartStack>('off');
    const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
    const [barGapRatio, setBarGapRatio] = useState<NumberInputValue>(0.3);
    const [maxBarWidth, setMaxBarWidth] = useState<NumberInputValue>(16);
    const [color1, setColor1] = useState<TextInputValue>('#8561C8');
    const [borderColor1, setBorderColor1] = useState<TextInputValue>('#0F3248');
    const [pattern1, setPattern1] = useState<Pattern>('smallChecker');
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
    const [chartData] = useState<BarChartItem[]>(data);
    const dataProvider = useMemo(() => new ArrayDataProvider(chartData, {
        keyAttributes: 'id'
    }), [chartData]);
    const plotArea = useMemo<ChartPlotArea>(() => {
        return {
            backgroundColor: plotAreaColor ?? undefined,
            borderColor: plotAreaBorderColor ?? undefined,
            borderWidth: toOptionalNumber(plotAreaBorderWidth)
        };
    }, [plotAreaBorderColor, plotAreaBorderWidth, plotAreaColor]);
    const styleDefaults = useMemo<ChartStyleDefaults>(() => {
        return {
            barGapRatio: toOptionalNumber(barGapRatio),
            maxBarWidth: toOptionalNumber(maxBarWidth)
        };
    }, [barGapRatio, maxBarWidth]);
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
        return <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    const seriesTemplateRenderer = (series: SeriesTemplateContext) => {
        return <oj-chart-series color={series.id == "Series 5" ? color1 : undefined} borderColor={series.id == "Series 5" ? borderColor1 : undefined} pattern={series.id == "Series 5" ? pattern1 : undefined}/>;
    };
    return (<div id="chart-container" class="oj-flex oj-sm-padding-1x oj-sm-flex-items-1">
            <div class="oj-flex-item">
                    <oj-chart id="barChart" type="bar" data={dataProvider} animationOnDataChange="auto" orientation={orientationValue} plotArea={plotArea} stack={stackValue} styleDefaults={styleDefaults} xAxis={xAxis} yAxis={yAxis} legend={legend}>
                              <template slot="itemTemplate" render={itemTemplateRenderer}/>
                              <template slot="seriesTemplate" render={seriesTemplateRenderer}/>
                          </oj-chart>
                    <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="barChart">
                              <demo-chart-orientation-control id="orientationControl" type="bar" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue}/>
                              <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator"/>
                              <demo-chart-stack-control id="stackControl" type="bar" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue}/>
                          </oj-toolbar>
                </div>
            <demo-tabs class="oj-flex-item demo-barchart-demo-tabs-style" onvalueChanged={handleCurrentTabValueChanged} value={currentTab} headers={[
                { id: "barStyles", label: "Bar Styles" },
                { id: "seriesStyles", label: "Series Styles" },
                { id: "textStyles", label: "Text Styles" },
                { id: "plotAreaStyles", label: "Plot Area Styles" }
            ]}>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Bar Styles Attributes</div>
                              <oj-form-layout aria-controls="barChart" maxColumns={2}>
                                          <oj-input-number labelHint="barGapRatio" max={1} min={0} step={0.1} onvalueChanged={handleBarGapRatioValueChanged} value={barGapRatio}/>
                                          <oj-input-number labelHint="maxBarWidth" min={0} step={2} onvalueChanged={handleMaxBarWidthValueChanged} value={maxBarWidth}/>
                                      </oj-form-layout>
                          </div>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Series Attributes - Series 5</div>
                              <oj-form-layout aria-controls="barChart" maxColumns={2}>
                                          <oj-input-text labelHint="color" onvalueChanged={handleColor1ValueChanged} value={color1}/>
                                          <demo-select-enum onvalueChanged={handlePattern1ValueChanged} value={pattern1} labelHint="pattern" enumValues={["auto", "smallChecker", "largeTriangle", "largeDiagonalRight", "largeDiamond", "smallCrosshatch", "largeDiagonalLeft", "largeCrosshatch", "smallDiagonalLeft", "smallDiagonalRight", "smallDiamond", "smallTriangle", "largeChecker"]}/>
                                          <oj-input-text labelHint="borderColor" onvalueChanged={handleBorderColor1ValueChanged} value={borderColor1}/>
                                      </oj-form-layout>
                          </div>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">X-Axis</div>
                              <oj-form-layout aria-controls="barChart" maxColumns={2}>
                                          <oj-input-text labelHint="Title" onvalueChanged={handleXTitleValueChanged} value={xTitle}/>
                                          <demo-input-json labelHint="Style" onvalueChanged={handleXStyleValueChanged} value={xStyle}/>
                                      </oj-form-layout>
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Y-Axis</div>
                              <oj-form-layout aria-controls="barChart" maxColumns={2}>
                                          <oj-input-text labelHint="Title" onvalueChanged={handleYTitleValueChanged} value={yTitle}/>
                                          <demo-input-json labelHint="Style" onvalueChanged={handleYStyleValueChanged} value={yStyle}/>
                                      </oj-form-layout>
                          </div>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Plot Area</div>
                              <oj-form-layout aria-controls="barChart" maxColumns={2}>
                                          <oj-input-text labelHint="backgroundColor" onvalueChanged={handlePlotAreaColorValueChanged} value={plotAreaColor}/>
                                          <oj-input-text labelHint="borderColor" onvalueChanged={handlePlotAreaBorderColorValueChanged} value={plotAreaBorderColor}/>
                                          <oj-input-number labelHint="borderWidth" min={0} onvalueChanged={handlePlotAreaBorderWidthValueChanged} value={plotAreaBorderWidth}/>
                                      </oj-form-layout>
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">X-Axis axisLine</div>
                              <oj-form-layout aria-controls="barChart" maxColumns={2}>
                                          <oj-input-text labelHint="lineColor" onvalueChanged={handleXAxisLineColorValueChanged} value={xAxisLineColor}/>
                                          <oj-input-number labelHint="lineWidth" onvalueChanged={handleXAxisLineWidthValueChanged} value={xAxisLineWidth}/>
                                      </oj-form-layout>
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Y-Axis majorTick</div>
                              <oj-form-layout aria-controls="barChart" maxColumns={2}>
                                          <oj-input-text labelHint="lineColor" onvalueChanged={handleYMajorTickColorValueChanged} value={yMajorTickColor}/>
                                          <oj-input-number labelHint="lineWidth" onvalueChanged={handleYMajorTickWidthValueChanged} value={yMajorTickWidth}/>
                                          <demo-select-enum labelHint="lineStyle" onvalueChanged={handleYMajorTickStyleValueChanged} value={yMajorTickStyle} enumValues={["solid", "dashed", "dotted"]}/>
                                      </oj-form-layout>
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">tickLabel</div>
                              <oj-form-layout aria-controls="barChart" maxColumns={2}>
                                          <demo-select-enum labelHint="position" onvalueChanged={handleYTickLabelPositionValueChanged} value={yTickLabelPosition} enumValues={["outside", "inside"]}/>
                                      </oj-form-layout>
                          </div>
                </demo-tabs>
        </div>);
};
export default BarChartStyles;

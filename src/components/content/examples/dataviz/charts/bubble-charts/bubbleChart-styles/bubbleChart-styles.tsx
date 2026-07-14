import "css!./demo.css";
import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicCoordData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-input-json/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import '../../../../../../jet-composites/demo-select-enum/loader';
import '../../../../../../jet-composites/demo-tabs/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type CurrentTab = 'seriesStyles' | 'textStyles' | 'plotAreaStyles';
type ChartPlotArea = NonNullable<ComponentProps<'oj-chart'>['plotArea']>;
type ChartXAxis = NonNullable<ComponentProps<'oj-chart'>['xAxis']>;
type ChartYAxis = NonNullable<ComponentProps<'oj-chart'>['yAxis']>;
type ChartLegend = NonNullable<ComponentProps<'oj-chart'>['legend']>;
type TextInputValue = ComponentProps<'oj-input-text'>['value'];
type NumberInputValue = ComponentProps<'oj-input-number'>['value'];
type Pattern = 'auto' | 'smallChecker' | 'largeTriangle' | 'largeDiagonalRight' | 'largeDiamond' | 'smallCrosshatch' | 'largeDiagonalLeft' | 'largeCrosshatch' | 'smallDiagonalLeft' | 'smallDiagonalRight' | 'smallDiamond' | 'smallTriangle' | 'largeChecker';
type MarkerShape = 'auto' | 'circle' | 'square' | 'diamond' | 'plus' | 'triangleDown' | 'triangleUp' | 'human' | 'star';
type TickStyle = 'solid' | 'dashed' | 'dotted';
type ChartTextStyle = {
    fontStyle: string;
    color: string;
};
type BubbleChartItem = {
    id: number;
    group: string;
    series: string;
    x: number;
    y: number;
    z: number;
};
type ItemTemplateContext = {
    data: BubbleChartItem;
};
type SeriesTemplateContext = {
    id: string;
};

const toOptionalNumber = (value: NumberInputValue): number | undefined => value ?? undefined;
const data = JSON.parse(dataText as string) as BubbleChartItem[];
export const BubbleChartStyles = () => {
    const [currentTab, setCurrentTab] = useState<CurrentTab>('seriesStyles');
    const [color1, setColor1] = useState<TextInputValue>('#267DB3');
    const [borderColor1, setBorderColor1] = useState<TextInputValue>('#0F3248');
    const [pattern1, setPattern1] = useState<Pattern>('smallChecker');
    const [markerShape1, setMarkerShape1] = useState<MarkerShape>('auto');
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
    const [yTickLabelPosition, setYTickLabelPosition] = useState<'outside' | 'inside'>('outside');
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
            },
            majorTick: {
                lineColor: xMajorTickColor ?? undefined,
                lineWidth: toOptionalNumber(xMajorTickWidth),
                lineStyle: xMajorTickStyle
            }
        };
    }, [xAxisLineColor, xAxisLineWidth, xMajorTickColor, xMajorTickStyle, xMajorTickWidth, xStyle, xTitle]);
    const yAxis = useMemo<ChartYAxis>(() => {
        return {
            title: yTitle ?? undefined,
            titleStyle: yStyle,
            axisLine: {
                lineColor: yAxisLineColor ?? undefined,
                lineWidth: toOptionalNumber(yAxisLineWidth)
            },
            majorTick: {
                lineColor: yMajorTickColor ?? undefined,
                lineWidth: toOptionalNumber(yMajorTickWidth),
                lineStyle: yMajorTickStyle
            },
            tickLabel: {
                position: yTickLabelPosition
            }
        };
    }, [yAxisLineColor, yAxisLineWidth, yMajorTickColor, yMajorTickStyle, yMajorTickWidth, yStyle, yTickLabelPosition, yTitle]);
    const legend = useMemo<ChartLegend>(() => {
        return {
            position: 'bottom'
        };
    }, []);
    const handleCurrentTabValueChanged = (event: JetElementCustomEvent<CurrentTab>) => {
        setCurrentTab(event.detail.value);
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
    const handleMarkerShape1ValueChanged = (event: JetElementCustomEvent<MarkerShape>) => {
        setMarkerShape1(event.detail.value);
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
    const itemTemplateRenderer = (item: ItemTemplateContext) => {
        return <oj-chart-item x={item.data.x} y={item.data.y} z={item.data.z} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    const seriesTemplateRenderer = (series: SeriesTemplateContext) => {
        return <oj-chart-series color={series.id == "Series 1" ? color1 : undefined} borderColor={series.id == "Series 1" ? borderColor1 : undefined} markerShape={series.id == "Series 1" ? markerShape1 : undefined} pattern={series.id == "Series 1" ? pattern1 : undefined}/>;
    };
    return (<div id="chart-container" class="oj-flex oj-sm-padding-1x oj-sm-flex-items-1">
            <div class="oj-flex-item oj-sm-12 oj-md-6">
                    <oj-chart id="bubbleChart" type="bubble" data={dataProvider} animationOnDataChange="auto" plotArea={plotArea} xAxis={xAxis} yAxis={yAxis} legend={legend}>
                              <template slot="itemTemplate" render={itemTemplateRenderer}/>
                              <template slot="seriesTemplate" render={seriesTemplateRenderer}/>
                          </oj-chart>
                </div>
            <demo-tabs class="oj-flex-item oj-sm-12 oj-md-6 demo-bubblechart-styles-height" headers={[{"id":"seriesStyles","label":"Series Styles"},{"id":"textStyles","label":"Text Styles"},{"id":"plotAreaStyles","label":"Plot Area Styles"}]} onvalueChanged={handleCurrentTabValueChanged} value={currentTab}>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Series Attributes - Series 1</div>
                              <oj-form-layout aria-controls="areaChart" maxColumns={2}>
                                          <oj-input-text onvalueChanged={handleColor1ValueChanged} value={color1} labelHint="Color"/>
                                          <oj-input-text onvalueChanged={handleBorderColor1ValueChanged} value={borderColor1} labelHint="Border Color"/>
                                          <demo-select-enum onvalueChanged={handlePattern1ValueChanged} value={pattern1} labelHint="pattern" enumValues={["auto","smallChecker","largeTriangle","largeDiagonalRight","largeDiamond","smallCrosshatch","largeDiagonalLeft","largeCrosshatch","smallDiagonalLeft","smallDiagonalRight","smallDiamond","smallTriangle","largeChecker"]}/>
                                          <demo-select-enum onvalueChanged={handleMarkerShape1ValueChanged} value={markerShape1} labelHint="markerShape" enumValues={["auto","circle","square","diamond","plus","triangleDown","triangleUp","human","star"]}/>
                                      </oj-form-layout>
                          </div>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">X Axis</div>
                              <oj-form-layout aria-controls="areaChart" maxColumns={2}>
                                          <oj-input-text onvalueChanged={handleXTitleValueChanged} value={xTitle} labelHint="Title"/>
                                          <demo-input-json onvalueChanged={handleXStyleValueChanged} value={xStyle} labelHint="Title Style"/>
                                      </oj-form-layout>
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Y Axis</div>
                              <oj-form-layout aria-controls="areaChart" maxColumns={2}>
                                          <oj-input-text onvalueChanged={handleYTitleValueChanged} value={yTitle} labelHint="Title"/>
                                          <demo-input-json onvalueChanged={handleYStyleValueChanged} value={yStyle} labelHint="Title Style"/>
                                      </oj-form-layout>
                          </div>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Plot Area</div>
                              <oj-form-layout aria-controls="lineChart" maxColumns={2}>
                                          <oj-input-text onvalueChanged={handlePlotAreaColorValueChanged} value={plotAreaColor} labelHint="backgroundColor"/>
                                          <oj-input-text onvalueChanged={handlePlotAreaBorderColorValueChanged} value={plotAreaBorderColor} labelHint="borderColor"/>
                                          <oj-input-number onvalueChanged={handlePlotAreaBorderWidthValueChanged} value={plotAreaBorderWidth} labelHint="borderWidth"/>
                                      </oj-form-layout>
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">X-Axis (Axis Line)</div>
                              <oj-form-layout aria-controls="lineChart" maxColumns={2}>
                                          <oj-input-text onvalueChanged={handleXAxisLineColorValueChanged} value={xAxisLineColor} labelHint="lineColor"/>
                                          <oj-input-number onvalueChanged={handleXAxisLineWidthValueChanged} value={xAxisLineWidth} labelHint="lineWidth"/>
                                      </oj-form-layout>
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Y-Axis (Major Tick)</div>
                              <oj-form-layout aria-controls="lineChart" maxColumns={2}>
                                          <oj-input-text onvalueChanged={handleYMajorTickColorValueChanged} value={yMajorTickColor} labelHint="lineColor"/>
                                          <oj-input-number onvalueChanged={handleYMajorTickWidthValueChanged} value={yMajorTickWidth} labelHint="lineWidth"/>
                                          <demo-select-enum id="yMajorTickStyle" onvalueChanged={handleYMajorTickStyleValueChanged} value={yMajorTickStyle} labelHint="lineStyle" enumValues={["dashed","dotted","solid"]}/>
                                      </oj-form-layout>
                          </div>
                </demo-tabs>
        </div>);
};
export default BubbleChartStyles;

import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
type NumberValueChangedEvent = JetElementCustomEvent<ComponentProps<'oj-input-number'>['value']>;
import { useEffect, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as timeDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/commonCategoriesTimeSeriesData.json';
import * as pointDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicCoordData.json';
import * as boxPlotDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/boxPlotTwoSeriesData.json';
import * as stockDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/stockTwoYearsData.json';
import 'ojs/ojchart';
import 'ojs/ojbutton';
import 'ojs/ojinputnumber';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import "css!./demo.css";
type ChartType = NonNullable<ComponentProps<'oj-chart'>['type']>;
type ChartCoordinateSystem = NonNullable<ComponentProps<'oj-chart'>['coordinateSystem']>;
type ChartDataProvider = ComponentProps<'oj-chart'>['data'];
type DisabledValues = string[];
type ChartDatum = {
    id: number | string;
    value?: number;
    low?: number;
    high?: number;
    q1?: number;
    q2?: number;
    q3?: number;
    outliers?: number[];
    open?: number;
    close?: number;
    volume?: number;
    x?: number | string | Date;
    y?: number;
    z?: number;
    group?: string;
    series?: string;
};
const timeData = JSON.parse(timeDataText as string) as ChartDatum[];
const pointData = JSON.parse(pointDataText as string) as ChartDatum[];
const boxPlotData = JSON.parse(boxPlotDataText as string) as ChartDatum[];
const stockData = JSON.parse(stockDataText as string) as ChartDatum[];
export const ChartProgressiveLoading = () => {
    const nonPolarTypes: ChartType[] = ['boxPlot', 'stock', 'lineWithArea', 'pie', 'funnel', 'pyramid'];
    const [typeValue, setTypeValue] = useState<ChartType>('bar');
    const [typeValueDisabled, setTypeValueDisabled] = useState<DisabledValues>([]);
    const [coordSysValue, setCoordSysValue] = useState<ChartCoordinateSystem>('cartesian');
    const [coordSysValueDisabled, setCoordSysValueDisabled] = useState<DisabledValues>([]);
    const [delay, setDelay] = useState<number>(2000);
    const [dataProvider1, setDataProvider1] = useState<ChartDataProvider>(null);
    const [dataProvider2, setDataProvider2] = useState<ChartDataProvider>(null);
    const [dataProvider3, setDataProvider3] = useState<ChartDataProvider>(null);
    const handleDelayValueChanged = (event: NumberValueChangedEvent) => {
        setDelay(event.detail.value ?? 0);
    };
    const handleTypeValueValueChanged = (event: JetElementCustomEvent<ChartType>) => {
        setTypeValue(event.detail.value);
    };
    const handleCoordSysValueValueChanged = (event: JetElementCustomEvent<ChartCoordinateSystem>) => {
        setCoordSysValue(event.detail.value);
    };
    const getDataProvider = (): ArrayDataProvider<ChartDatum['id'], ChartDatum> => {
        let data: ChartDatum[] = [];
        switch (typeValue) {
            case 'boxPlot':
                data = boxPlotData;
                break;
            case 'stock':
                data = stockData.slice(438);
                break;
            case 'bubble':
            case 'scatter':
                data = pointData;
                break;
            default:
                data = timeData;
        }
        return new ArrayDataProvider(data, {
            keyAttributes: 'id'
        });
    };
    const applyDelay = () => {
        setDataProvider1(getDataProvider());
        setDataProvider2(getDataProvider());
        setDataProvider3(getDataProvider());
    };
    useEffect(() => {
        const nextTypeDisabled = coordSysValue === 'polar' ? nonPolarTypes : [];
        setTypeValueDisabled(nextTypeDisabled);
        if (coordSysValue === 'polar' && nonPolarTypes.includes(typeValue)) {
            setTypeValue('bar');
        }
        setCoordSysValueDisabled(typeValue === 'stock' ? ['polar'] : []);
    }, [coordSysValue, typeValue]);
    useEffect(() => {
        applyDelay();
    }, [typeValue, coordSysValue, delay]);
    const OjChartProps: Partial<ComponentProps<'oj-chart'>> = { legend: {
            position: "top"
        } };
    const itemTemplateRenderer = (item: any) => {
        return <oj-chart-item value={item.data.value} low={item.data.low} high={item.data.high} q1={item.data.q1} q2={item.data.q2} q3={item.data.q3} items={item.data.outliers} open={item.data.open} close={item.data.close} volume={item.data.volume} x={item.data.x} y={item.data.y} z={item.data.z} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    const OjChartProps2: Partial<ComponentProps<'oj-chart'>> = { legend: {
            position: "top"
        } };
    const itemTemplateRenderer2 = (item: any) => {
        return <oj-chart-item value={item.data.value} low={item.data.low} high={item.data.high} q1={item.data.q1} q2={item.data.q2} q3={item.data.q3} items={item.data.outliers} open={item.data.open} close={item.data.close} volume={item.data.volume} x={item.data.x} y={item.data.y} z={item.data.z} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    const OjChartProps3: Partial<ComponentProps<'oj-chart'>> = { legend: {
            position: "top"
        } };
    const itemTemplateRenderer3 = (item: any) => {
        return <oj-chart-item value={item.data.value} low={item.data.low} high={item.data.high} q1={item.data.q1} q2={item.data.q2} q3={item.data.q3} items={item.data.outliers} open={item.data.open} close={item.data.close} volume={item.data.volume} x={item.data.x} y={item.data.y} z={item.data.z} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    return (<div id="container" class="demo-container">
            <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
                    <oj-form-layout maxColumns={2} aria-controls="visualization">
                              <oj-input-number id="fetch-delay-input" min={0} step={0} onvalueChanged={handleDelayValueChanged} value={delay} labelHint="Approximate fetch delay (ms)"/>
                              <oj-button class="oj-button-lg" onojAction={applyDelay}>Apply</oj-button>
                              <demo-radioset-enum direction="row" labelHint="Type" disabledValues={typeValueDisabled} enumValues={["bar", "line", "area", "lineWithArea", "combo", "bubble", "scatter", "boxPlot", "stock", "pie", "funnel", "pyramid"]} onvalueChanged={handleTypeValueValueChanged} value={typeValue}/>
                              <demo-radioset-enum direction="row" labelHint="Coordinate System" disabledValues={coordSysValueDisabled} onvalueChanged={handleCoordSysValueValueChanged} value={coordSysValue} enumValues={["cartesian", "polar"]}/>
                          </oj-form-layout>
                </div>
            <div id="visualization" class="oj-flex">
                    <div class="demo-chart-container demo-chart-container-sm oj-sm-4 oj-flex-item oj-divider-end">
                              <oj-chart id="chart-sm" type={typeValue} coordinateSystem={coordSysValue} data={dataProvider1} aria-label={'Small ' + typeValue + ' chart'} class="demo-chart" {...OjChartProps}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer}/>
                                      </oj-chart>
                          </div>
                    <div class="demo-chart-container demo-chart-container-md oj-sm-8 oj-flex-item">
                              <oj-chart id="chart-md" type={typeValue} coordinateSystem={coordSysValue} data={dataProvider2} aria-label={'Medium ' + typeValue + ' chart'} class="demo-chart demo-chart-md" {...OjChartProps2}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer2}/>
                                      </oj-chart>
                          </div>
                </div>
            <div class="demo-chart-container demo-chart-container-lg oj-divider-top">
                    <oj-chart id="chart-lg" type={typeValue} coordinateSystem={coordSysValue} data={dataProvider3} aria-label={'Large ' + typeValue + ' chart'} class="demo-chart demo-chart-lg" {...OjChartProps3}>
                              <template slot="itemTemplate" render={itemTemplateRenderer3}/>
                          </oj-chart>
                </div>
        </div>);
};
export default ChartProgressiveLoading;

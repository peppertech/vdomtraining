import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import * as gdpDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/gdpData.json';
import { ojChart } from 'ojs/ojchart';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
type ZoomAndScrollValue = NonNullable<ComponentProps<'oj-chart'>['zoomAndScroll']>;
type OverviewValue = 'off' | 'on';
type InitialZoomingValue = NonNullable<ComponentProps<'oj-chart'>['initialZooming']>;
type XAxisValue = ComponentProps<'oj-chart'>['xAxis'];
type GdpDatum = {
    id: number;
    country: string;
    gdp: number;
};
const gdpData = JSON.parse(gdpDataText as string) as GdpDatum[];
export const ChartZoomScrollCategorical = () => {
    const [zoomAndScrollValue, setZoomAndScrollValue] = useState<ZoomAndScrollValue>('live');
    const [overviewValue, setOverviewValue] = useState<OverviewValue>('off');
    const [initialZoomingValue, setInitialZoomingValue] = useState<InitialZoomingValue>('first');
    const [xAxisObject, setXAxisObject] = useState<XAxisValue>({});
    const [viewPortChangeString, setViewPortChangeString] = useState<string>('');
    const dataProvider = useMemo(() => new ArrayDataProvider(gdpData, {
        keyAttributes: 'id'
    }), []);
    const viewPortChange = () => {
        return viewPortChangeString.trim();
    };
    const currencyConverter = useMemo(() => new IntlNumberConverter({
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }), []);
    const handleOverviewValueValueChanged = (event: JetElementCustomEvent<OverviewValue>) => {
        setOverviewValue(event.detail.value);
    };
    const handleZoomAndScrollValueValueChanged = (event: JetElementCustomEvent<ZoomAndScrollValue>) => {
        setZoomAndScrollValue(event.detail.value);
    };
    const handleInitialZoomingValueValueChanged = (event: JetElementCustomEvent<InitialZoomingValue>) => {
        setInitialZoomingValue(event.detail.value);
    };
    const viewportChange = (event: ojChart.ojViewportChange) => {
        const detail = event.detail;
        let html = '';
        if (detail['startGroup'])
            html += `startGroup: ${detail['startGroup']}`;
        if (detail['endGroup'])
            html += `\nendGroup: ${detail['endGroup']}\n\n`;
        if (detail['xMin'])
            html += `xMin: ${detail['xMin'].toFixed(2)}`;
        if (detail['xMax'])
            html += `\nxMax: ${detail['xMax'].toFixed(2)}\n\n`;
        if (detail['yMin'])
            html += `yMin: ${detail['yMin'].toFixed(2)}`;
        if (detail['yMax'])
            html += `\nyMax: ${detail['yMax'].toFixed(2)}`;
        setViewPortChangeString(html);
    };
    const OjChartProps: Partial<ComponentProps<'oj-chart'>> = { yAxis: {
            title: "GDP in US Dollars",
            tickLabel: {
                converter: currencyConverter
            }
        }, overview: {
            rendered: overviewValue,
            height: "10%",
            content: "{\"type\":\"area\"}"
        }, legend: {
            rendered: "off"
        }, valueFormats: {
            series: {
                tooltipDisplay: "off"
            },
            group: {
                tooltipLabel: "Country"
            },
            value: {
                tooltipLabel: "GDP"
            }
        } };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item value={item.data.gdp} groupId={[item.data.country]} seriesId="GDP"/>;
    };
    const styleConfig = { whiteSpace: 'pre-line' };
    return (<div id="chart-container">
            <oj-form-layout aria-controls="barChart" maxColumns={2}>
                    <demo-radioset-enum direction="row" labelHint="Overview" onvalueChanged={handleOverviewValueValueChanged} value={overviewValue} enumValues={["off", "on"]}/>
                    <demo-radioset-enum direction="row" labelHint="Zoom and Scroll" onvalueChanged={handleZoomAndScrollValueValueChanged} value={zoomAndScrollValue} enumValues={["live", "liveScrollOnly"]}/>
                    <demo-radioset-enum direction="row" onvalueChanged={handleInitialZoomingValueValueChanged} value={initialZoomingValue} labelHint="Initial Zooming" enumValues={["first", "last", "none"]}/>
                </oj-form-layout>
            <h5 class="oj-sm-padding-1x-start">Global GDP in 2012</h5>
            <oj-chart id="barChart" type="bar" data={dataProvider} zoomAndScroll={zoomAndScrollValue} initialZooming={initialZoomingValue} xAxis={xAxisObject} dataCursor="on" onojViewportChange={viewportChange} {...OjChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-chart>
            <div class="oj-sm-padding-1x">
                    <div class="oj-sm-margin-2x-vertical"><b>viewPortChange:</b></div>
                    <div style={styleConfig}>{viewPortChange()}</div>
                </div>
        </div>);
};
export default ChartZoomScrollCategorical;

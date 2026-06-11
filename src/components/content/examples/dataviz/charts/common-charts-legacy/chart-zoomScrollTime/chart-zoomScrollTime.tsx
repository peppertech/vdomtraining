import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as chartDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/investorData.json';
import { ojChart } from 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojchart';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
type ZoomAndScrollValue = NonNullable<ComponentProps<'oj-chart'>['zoomAndScroll']>;
type OverviewValue = 'off' | 'on';
type InvestorDatum = {
    id: number;
    series: string;
    groups: string;
    value: number;
};
const chartData = JSON.parse(chartDataText as string) as InvestorDatum[];
export const ChartZoomScrollTime = () => {
    const [zoomAndScrollValue, setZoomAndScrollValue] = useState<ZoomAndScrollValue>('live');
    const [overviewValue, setOverviewValue] = useState<OverviewValue>('on');
    const [viewPortChangeString, setViewPortChangeString] = useState<string>('');
    const data = chartData;
    const chartDataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'id'
    }), [data]);
    const viewPortChange = () => {
        return viewPortChangeString.trim();
    };
    const handleOverviewValueValueChanged = (event: JetElementCustomEvent<OverviewValue>) => {
        setOverviewValue(event.detail.value);
    };
    const handleZoomAndScrollValueValueChanged = (event: JetElementCustomEvent<ZoomAndScrollValue>) => {
        setZoomAndScrollValue(event.detail.value);
    };
    const viewportChange = (event: ojChart.ojViewportChange) => {
        const detail = event.detail;
        let html = '';
        if (detail['startGroup'])
            html += `startGroup: ${detail['startGroup']}`;
        if (detail['endGroup'])
            html += `\nendGroup: ${detail['endGroup']}\n\n`;
        if (detail['xMin']) {
            const date = new Date(detail['xMin']);
            html += `xMin: ${date.getDate()} ${date.toString().split(' ')[1]} ${date.getFullYear()}`;
        }
        if (detail['xMax']) {
            const date = new Date(detail['xMax']);
            html += `\nxMax: ${date.getDate()} ${date.toString().split(' ')[1]} ${date.getFullYear()}\n\n`;
        }
        if (detail['yMin'])
            html += `yMin: ${detail['yMin'].toFixed(2)}`;
        if (detail['yMax'])
            html += `\nyMax: ${detail['yMax'].toFixed(2)}`;
        setViewPortChangeString(html);
    };
    const OjChartProps: Partial<ComponentProps<'oj-chart'>> = { overview: {
            rendered: overviewValue
        }, xAxis: {
            viewportStartGroup: new Date(2016, 3, 10).toISOString(),
            viewportEndGroup: new Date(2016, 5, 26).toISOString()
        }, legend: {
            rendered: "off"
        }, valueFormats: {
            series: {
                tooltipLabel: "Name"
            },
            group: {
                tooltipLabel: "Date"
            }
        } };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item seriesId={item.data.series} groupId={[item.data.groups]} value={item.data.value}/>;
    };
    const styleConfig = { whiteSpace: 'pre-line' };
    return (<div id="chart-container">
            <oj-form-layout aria-controls="lineChart" maxColumns={2}>
                    <demo-radioset-enum direction="row" labelHint="Overview" onvalueChanged={handleOverviewValueValueChanged} value={overviewValue} enumValues={["off", "on"]}/>
                    <demo-radioset-enum labelHint="Zoom and Scroll" direction="row" onvalueChanged={handleZoomAndScrollValueValueChanged} value={zoomAndScrollValue} enumValues={["live", "liveScrollOnly"]}/>
                </oj-form-layout>
            <oj-chart id="lineChart" type="lineWithArea" data={chartDataProvider} timeAxisType="enabled" zoomAndScroll={zoomAndScrollValue} hideAndShowBehavior="withRescale" dataCursor="on" onojViewportChange={viewportChange} {...OjChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-chart>
            <div class="oj-sm-padding-1x">
                    <div class="oj-sm-margin-2x-vertical"><b>viewPortChange:</b></div>
                    <div style={styleConfig}>{viewPortChange()}</div>
                </div>
        </div>);
};
export default ChartZoomScrollTime;

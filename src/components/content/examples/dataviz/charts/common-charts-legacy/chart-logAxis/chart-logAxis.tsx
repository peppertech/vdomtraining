import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/populationGrowth.json';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
const data = JSON.parse(dataText as string);
type ChartAxisScale = NonNullable<NonNullable<ComponentProps<'oj-chart'>['yAxis']>['scale']>;
export const ChartLogAxis = () => {
    const [axisScale, setAxisScale] = useState<ChartAxisScale>('log');
    const dataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'id'
    }), []);
    const handleAxisScaleValueChanged = (event: JetElementCustomEvent<ChartAxisScale>) => {
        setAxisScale(event.detail.value ?? 'linear');
    };
    const styleDefaultsConfig: ComponentProps<'oj-chart'>['styleDefaults'] = { markerDisplayed: 'on', markerSize: 7, dataItemGaps: '0%' };
    const xAxisConfig: ComponentProps<'oj-chart'>['xAxis'] = { title: 'Year' };
    const OjChartProps: Partial<ComponentProps<'oj-chart'>> = { legend: {
            position: "top"
        }, yAxis: {
            title: "Population",
            scale: axisScale
        }, valueFormats: {
            series: {
                tooltipLabel: "State"
            },
            group: {
                tooltipLabel: "Year"
            },
            y: {
                tooltipLabel: "Population"
            }
        } };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    return (<div id="chart-container">
            <oj-form-layout aria-controls="Chart">
                    <demo-radioset-enum onvalueChanged={handleAxisScaleValueChanged} value={axisScale} direction="row" labelHint="Axis Scale" enumValues={["linear", "log"]}/>
                </oj-form-layout>
            <h6>California vs Massachusetts Population Growth</h6>
            <oj-chart id="Chart" type="line" data={dataProvider} styleDefaults={styleDefaultsConfig} xAxis={xAxisConfig} animationOnDataChange="auto" hideAndShowBehavior="withRescale" {...OjChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-chart>
        </div>);
};
export default ChartLogAxis;

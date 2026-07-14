import 'ojs/ojchart';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojlegend';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as complaintsDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/hotelComplaintsData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ComplaintDatum = {
    id: string;
    category: string;
    type: string;
    value: number;
};
type ItemTemplateContext = {
    data: ComplaintDatum;
};
type SeriesTemplateContext = {
    id: string;
};
type ChartProps = ComponentProps<'oj-chart'>;
type ChartLegend = NonNullable<ChartProps['legend']>;
type ChartYAxis = NonNullable<ChartProps['yAxis']>;
type ChartY2Axis = NonNullable<ChartProps['y2Axis']>;
type ChartValueFormats = NonNullable<ChartProps['valueFormats']>;

const complaintsData = JSON.parse(complaintsDataText as string) as ComplaintDatum[];

export const CombinationChartDualY = () => {
    const dataProvider = useMemo(() => new ArrayDataProvider(complaintsData, {
        keyAttributes: 'id'
    }), []);
    const y2Converter = useMemo(() => new IntlNumberConverter({
        style: 'percent'
    }), []);
    const legend = useMemo<ChartLegend>(() => {
        return {
            rendered: 'off'
        };
    }, []);
    const yAxis = useMemo<ChartYAxis>(() => {
        return {
            title: 'Occurrences',
            min: 0,
            max: 80
        };
    }, []);
    const y2Axis = useMemo<ChartY2Axis>(() => {
        return {
            title: 'Cumulative %',
            min: 0,
            max: 1,
            tickLabel: {
                converter: y2Converter
            },
            alignTickMarks: 'off',
            majorTick: {
                rendered: 'off'
            }
        };
    }, [y2Converter]);
    const valueFormats = useMemo<ChartValueFormats>(() => {
        return {
            series: {
                tooltipDisplay: 'off'
            },
            group: {
                tooltipLabel: 'Department'
            },
            y: {
                tooltipLabel: 'Occurrences'
            },
            y2: {
                converter: y2Converter,
                tooltipLabel: 'Cumulative'
            }
        };
    }, [y2Converter]);

    const itemTemplateRenderer = (item: ItemTemplateContext) => {
        return <oj-chart-item value={item.data.value} groupId={[item.data.category]} seriesId={item.data.type}/>;
    };

    const seriesTemplateRenderer = (series: SeriesTemplateContext) => {
        return <oj-chart-series assignedToY2={series.id === 'Cumulative' ? 'on' : undefined}/>;
    };

    return (<div id="chart-container">
            <oj-chart id="Chart" type="combo" data={dataProvider} animationOnDisplay="auto" legend={legend} yAxis={yAxis} y2Axis={y2Axis} valueFormats={valueFormats}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                    <template slot="seriesTemplate" render={seriesTemplateRenderer}/>
                </oj-chart>
        </div>);
};

export default CombinationChartDualY;

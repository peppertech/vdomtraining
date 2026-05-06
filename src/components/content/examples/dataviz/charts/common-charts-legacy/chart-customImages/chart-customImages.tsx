import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/fruitSupplyData.json';
import 'ojs/ojchart';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
const data = JSON.parse(dataText as string);
export const ChartCustomImages = () => {
    const dataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'id'
    }), []);
    const seriesPropertyMap = useMemo<Record<string, {
        color: string;
        source: string;
    }>>(() => ({
        Apples: {
            color: '#ED6647',
            source: '../images/dvt/apple-icon.png'
        },
        Bananas: {
            color: '#F7F37B',
            source: '../images/dvt/bananas-icon.png'
        },
        Grapes: {
            color: '#A75DBA',
            source: '../images/dvt/grapes-icon.png'
        },
        Lemons: {
            color: '#F7F37B',
            source: '../images/dvt/lemon-icon.png'
        },
        Oranges: {
            color: '#FFB54D',
            source: '../images/dvt/orange-icon.png'
        },
        Peaches: {
            color: '#FFB54D',
            source: '../images/dvt/peach-icon.png'
        },
        Pears: {
            color: '#A2BF39',
            source: '../images/dvt/pear-icon.png'
        },
        Strawberries: {
            color: '#ED6647',
            source: '../images/dvt/strawberry-icon.png'
        }
    }), []);
    const getSeriesProperty = (id: string, property: 'color' | 'source') => {
        return seriesPropertyMap[id][property];
    };
    const OjChartProps: Partial<ComponentProps<'oj-chart'>> = { valueFormats: {
            series: {
                tooltipLabel: "Fruit Type"
            },
            group: {
                tooltipDisplay: "off"
            },
            x: {
                tooltipLabel: "Domestic"
            },
            y: {
                tooltipLabel: "Imports"
            }
        }, xAxis: {
            title: "Domestic Production (million pounds)"
        }, yAxis: {
            title: "Imports (million pounds)"
        }, legend: {
            symbolHeight: 20
        }, styleDefaults: {
            markerSize: 30,
            markerShape: "square"
        } };
    const itemTemplateRenderer = (item: any) => {
        return (<oj-chart-item groupId={[item.data.year]} seriesId={item.data.fruit} x={item.data.domesticProduction} y={item.data.imports}/>);
    };
    const seriesTemplateRenderer = (series: any) => {
        return (<oj-chart-series color={getSeriesProperty(series.id, 'color')} source={getSeriesProperty(series.id, 'source')}/>);
    };
    return (<div id="chart-container">
            <h6>Fresh Fruit Supply Sources in the US (2014)</h6>
            <oj-chart id="Chart" type="scatter" data={dataProvider} hideAndShowBehavior="withRescale" {...OjChartProps}>
                <template slot="itemTemplate" render={itemTemplateRenderer}/>
                <template slot="seriesTemplate" render={seriesTemplateRenderer}/>
            </oj-chart>
        </div>);
};
export default ChartCustomImages;

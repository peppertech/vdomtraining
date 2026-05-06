import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import { ojButton } from 'ojs/ojbutton';
import { ojChart } from 'ojs/ojchart';
import 'ojs/ojbutton';
import 'ojs/ojtoolbar';
import 'ojs/ojchart';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type ChartDataProvider = ComponentProps<'oj-chart'>['data'];
type DrillingValue = NonNullable<ComponentProps<'oj-chart'>['drilling']>;
type QuarterDatum = {
    id: number;
    quarter: string;
    series: string;
    value: number;
    color?: string;
    group?: string;
};
const data = JSON.parse(dataText as string) as QuarterDatum[];
export const ChartDrillingSample = () => {
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const years = useMemo(() => ['2012', '2013', '2014', '2015'], []);
    const getYearlyItems = () => {
        const chartData = data.map((item: any) => ({ ...item }));
        const items: QuarterDatum[] = [];
        for (let i = 0; i < chartData.length; i += 4) {
            const year = years[i / 4];
            chartData[i].color = colorHandler.getValue(year);
            chartData[i].group = year;
            chartData[i].series = 'Total Revenue';
            chartData[i].value =
                chartData[i].value +
                    chartData[i + 1].value +
                    chartData[i + 2].value +
                    chartData[i + 3].value;
            items.push(chartData[i]);
        }
        return new ArrayDataProvider(items, { keyAttributes: 'id' });
    };
    const getQuarterlyItems = (year: number) => {
        const start = (year - 2012) * 4;
        const chartData = data.slice(start, start + 4).map((item: any) => ({ ...item }));
        for (let i = 0; i < chartData.length; i++) {
            chartData[i].color = colorHandler.getValue(year.toString());
            chartData[i].series = year.toString();
        }
        return new ArrayDataProvider(chartData, { keyAttributes: 'id' });
    };
    const yearlyDataProvider = useMemo(() => getYearlyItems(), [colorHandler, years]);
    const quarterlyDataProviders = useMemo<Record<string, ChartDataProvider>>(() => ({
        '2012': getQuarterlyItems(2012),
        '2013': getQuarterlyItems(2013),
        '2014': getQuarterlyItems(2014),
        '2015': getQuarterlyItems(2015)
    }), [colorHandler]);
    const [dataProvider, setDataProvider] = useState<ChartDataProvider>(yearlyDataProvider);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [drillingValue, setDrillingValue] = useState<DrillingValue>('groupsOnly');
    const [titleValue, setTitleValue] = useState<string>('Annual');
    const [tickLabelStyle, setTickLabelStyle] = useState<Record<string, string>>({
        textDecoration: 'underline',
        color: '#045fab'
    });
    const drillUpButtonClick = (event: ojButton.ojAction) => {
        setDataProvider(yearlyDataProvider);
        setDrillingValue('groupsOnly');
        setTitleValue('Annual');
        setTickLabelStyle({ textDecoration: 'underline', color: '#045fab' });
        setIsDisabled(true);
    };
    const chartDrill = (event: ojChart.ojGroupDrill<string, Record<string, string | number>, null>) => {
        const group = Array.isArray(event.detail.group) ? event.detail.group[0] : event.detail.group;
        setDataProvider(quarterlyDataProviders[group]);
        setDrillingValue('off');
        setTitleValue(group);
        setTickLabelStyle({});
        setIsDisabled(false);
    };
    const OjChartProps: Partial<ComponentProps<'oj-chart'>> = { xAxis: {
            tickLabel: {
                style: tickLabelStyle
            }
        }, legend: {
            rendered: "off"
        } };
    const itemTemplateRenderer = (item: any) => {
        return <oj-chart-item groupId={[item.data.group || item.data.quarter]} seriesId={item.data.series} color={item.data.color} value={item.data.value}/>;
    };
    return (<div id="chart-container">
            <div class="oj-typography-heading-xs">
                {titleValue}
                Revenue
            </div>
            <oj-toolbar aria-controls="barChart">
                <oj-button id="drillUpButton" onojAction={drillUpButtonClick} disabled={isDisabled}>Drill Up</oj-button>
            </oj-toolbar>
            <oj-chart id="barChart" type="bar" orientation="vertical" data={dataProvider} drilling={drillingValue} onojGroupDrill={chartDrill} {...OjChartProps}>
                <template slot="itemTemplate" render={itemTemplateRenderer}/>
            </oj-chart>
        </div>);
};
export default ChartDrillingSample;
